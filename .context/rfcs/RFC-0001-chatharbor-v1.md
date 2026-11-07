# RFC-0001 — ChatHarbor v1: independent archive and group recovery

- **Status:** Proposed
- **Decision owner:** Product & Engineering
- **Date:** 2026-11-07

## Problem

Official WhatsApp device backup is not an independently readable complete account-continuity archive. A ban can eliminate access, and group memberships are not restorable merely by keeping exported messages. Local-only archives can also be lost with the device.

## Scope

- iPhone share-extension ingestion of **user-initiated** WhatsApp chat exports.
- Immutable source archives and media present in exports, SHA-256 manifests, parser warnings and offline viewing.
- Manually curated groups, communities, admins, external contact methods, invitations, roles and recovery instructions.
- **MVP portability and recovery gate:** export an encrypted, independently readable Vault bundle to a user-controlled destination outside the original iPhone, with verified restore on a clean environment. A particular cloud provider is optional; independent copy and restoration are not.
- Optional automated cloud replication after validating iOS background limitations and storage provider behavior.

## Non-goals

- Continuous read access to WhatsApp private iOS data, completeness guarantees or undelete.
- Automatic joining of groups, cloning account identity, circumventing bans or credentials collection.
- Cloud ingestion of private messages by the public project website.

## Proposed module boundaries

`ShareExtension → Import Validation → Original Archive + Manifest → Parser/Viewer`
and separate `Group Registry → Recovery Readiness → User-controlled Recovery Runbook`.
A `Vault Export → External Storage → Clean Restore + Verification` path is necessary for the MVP.

## Decisions needed

1. SwiftUI app packaging and supported iOS versions.
2. Storage and encryption (Keychain, export passphrase recovery, independent decryption).
3. Export parser behavior for localization, truncated histories and duplicate snapshots.
4. Group registry data minimization, external contact availability, permissions and retention.
5. Legal/privacy assessment of third-party conversations.
6. Destination-neutral encrypted bundle format, key handling, disaster recovery and restore tooling.

## Acceptance / evidence gates

- [ ] Synthetic exports imported from iOS share sheet.
- [ ] Original bytes preserved, readable independently; SHA-256 verification passes.
- [ ] Parser flags incomplete/unsupported content and does not imply full history.
- [ ] User can document group recovery paths without leaking invitation URLs publicly.
- [ ] Vault bundle exported to an external user-controlled storage destination.
- [ ] **Restore succeeds without the source phone, source WhatsApp account or original app install**, using documented open format or independent restore tool; hashes and available attachments verified.
- [ ] Loss of device/local storage simulation and failure modes documented.
- [ ] Threat model and recovery exercise approved before claiming MVP ready.

**Proposed only. No acceptance or implementation readiness asserted.**
