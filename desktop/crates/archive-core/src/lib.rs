use base64::{engine::general_purpose::STANDARD, Engine};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::{BTreeMap, BTreeSet};

pub const MAX_INPUT: usize = 8 * 1024 * 1024;
pub const MAX_ORIGINALS: usize = 5 * 1024 * 1024;
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Archive {
    format_version: u32,
    files: BTreeMap<String, String>,
    manifest: Vec<FileRecord>,
    warnings: Vec<String>,
    registry: Registry,
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct FileRecord {
    path: String,
    byte_count: u64,
    sha256: String,
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Registry {
    format_version: u32,
    groups: Vec<Group>,
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Group {
    id: String,
    name: String,
    role: String,
    community: Option<String>,
    contacts: Vec<Contact>,
    invitation_url: Option<String>,
    invitation_expires_at: Option<String>,
    last_verified_at: Option<String>,
    manual_recovery_steps: Vec<String>,
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Contact {
    display_name: String,
    independent_channel: String,
}
#[derive(Serialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Summary {
    pub file_count: usize,
    pub total_bytes: usize,
    pub group_count: usize,
}
fn bounded(s: &str) -> bool {
    s.chars().count() <= 16000
}
fn valid_uuid(s: &str) -> bool {
    s.len() == 36
        && s.bytes().enumerate().all(|(i, b)| {
            if [8, 13, 18, 23].contains(&i) {
                b == b'-'
            } else {
                b.is_ascii_hexdigit()
            }
        })
}
pub fn safe_name(s: &str) -> bool {
    !s.is_empty()
        && s.len() <= 180
        && s != "."
        && s != ".."
        && !s
            .chars()
            .any(|c| c == '/' || c == '\\' || c <= '\u{1f}' || c == '\u{7f}')
}
pub fn verify_archive(json: &str) -> Result<Summary, &'static str> {
    if json.len() > MAX_INPUT {
        return Err("Archivio troppo grande: limite preview 8 MiB.");
    }
    let archive: Archive =
        serde_json::from_str(json).map_err(|_| "Formato archivio non valido.")?;
    if archive.format_version != 1 || archive.registry.format_version != 1 {
        return Err("Versione archivio non supportata.");
    }
    if archive.files.is_empty()
        || archive.files.len() > 256
        || archive.manifest.len() != archive.files.len()
        || archive.warnings.len() > 100
        || !archive.warnings.iter().all(|s| bounded(s))
    {
        return Err("Manifest incompleto.");
    }
    let mut names = BTreeSet::new();
    let mut total = 0usize;
    for entry in &archive.manifest {
        if !safe_name(&entry.path) || !names.insert(&entry.path) {
            return Err("Nome file non sicuro o duplicato.");
        }
        let encoded = archive
            .files
            .get(&entry.path)
            .ok_or("Manifest incompleto.")?;
        let bytes = STANDARD
            .decode(encoded)
            .map_err(|_| "Contenuto base64 non valido.")?;
        total = total
            .checked_add(bytes.len())
            .ok_or("Dimensioni non valide.")?;
        if total > MAX_ORIGINALS {
            return Err("Originali troppo grandi: limite preview 5 MiB.");
        }
        let digest = format!("{:x}", Sha256::digest(&bytes));
        if bytes.len() as u64 != entry.byte_count || digest != entry.sha256 {
            return Err("Verifica integrità fallita.");
        }
    }
    let mut ids = BTreeSet::new();
    if archive.registry.groups.len() > 1000 {
        return Err("Registro troppo grande.");
    }
    for group in &archive.registry.groups {
        if !valid_uuid(&group.id)
            || !ids.insert(group.id.to_ascii_lowercase())
            || group.name.is_empty()
            || !bounded(&group.name)
            || !bounded(&group.role)
            || group.contacts.len() > 100
            || group.manual_recovery_steps.len() > 100
            || !group.manual_recovery_steps.iter().all(|s| bounded(s))
            || [
                &group.community,
                &group.invitation_url,
                &group.invitation_expires_at,
                &group.last_verified_at,
            ]
            .iter()
            .any(|s| s.as_ref().is_some_and(|s| !bounded(s)))
            || group
                .contacts
                .iter()
                .any(|c| !bounded(&c.display_name) || !bounded(&c.independent_channel))
        {
            return Err("Registro non valido.");
        }
    }
    Ok(Summary {
        file_count: names.len(),
        total_bytes: total,
        group_count: archive.registry.groups.len(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    const FIXTURE: &str = include_str!("../../../public/fixtures/synthetic-archive.json");
    fn mutated(edit: impl FnOnce(&mut serde_json::Value)) -> String {
        let mut value = serde_json::from_str(FIXTURE).unwrap();
        edit(&mut value);
        value.to_string()
    }
    #[test]
    fn verifies_shared_synthetic_fixture() {
        let s = verify_archive(FIXTURE).unwrap();
        assert_eq!(s.file_count, 3);
        assert_eq!(s.group_count, 1);
    }
    #[test]
    fn rejects_corrupted_manifest_and_bytes() {
        for text in [
            mutated(|v| v["manifest"][0]["sha256"] = "0".repeat(64).into()),
            mutated(|v| v["manifest"][0]["byteCount"] = 0.into()),
            mutated(|v| v["files"]["unexpected.txt"] = "YQ==".into()),
            mutated(|v| v["manifest"][1] = v["manifest"][0].clone()),
        ] {
            assert!(verify_archive(&text).is_err());
        }
    }
    #[test]
    fn rejects_unsupported_inputs() {
        assert!(verify_archive("not json").is_err());
        assert!(verify_archive(&mutated(|v| v["formatVersion"] = 2.into())).is_err());
        assert!(verify_archive(&" ".repeat(MAX_INPUT + 1)).is_err());
        assert!(
            verify_archive(&mutated(|v| v["registry"]["groups"][0]["id"] = "bad".into())).is_err()
        );
    }
    #[test]
    fn rejects_unsafe_names() {
        for s in ["../escape", "a/b", "a\\b", "", ".", "..", "a\0b"] {
            assert!(!safe_name(s));
        }
    }
}
