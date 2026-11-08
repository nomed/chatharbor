# ChatHarbor architecture — desktop-first prototype

Status: Proposed design; scoped execution approved by owner on 2026-11-08. RFC-0002/ADR-0006 record current direction.

The primary delivery is a free local macOS/Windows/Linux app: React/TypeScript UI in Tauri, Rust archive core, replaceable acquisition/parser adapters. The browser preview shares presentation; standalone web cannot acquire iPhone backups. The Swift Share Extension design below is retained as historical context and a possible future companion, not the primary MVP.

Current implemented slice: verified synthetic JSON archive, raw UTF-8 original viewer/search, read-only registry and SHA-256 inspection. No USB acquisition, Python bridge, encryption, persistent catalog or release installer is implemented. See [desktop guide](../desktop/README.md).

Planned path: authorized device backup → immutable snapshot → verified originals/catalog → external encrypted copy → independent restore. Native backup compatibility and WhatsApp-only retention/transfer semantics require physical-device evidence. Group recovery remains manual contact planning, not membership restoration.

The existing Golden Path applies unchanged; live work remains in GitHub, not this document. No sensitive protection/registry/promotion activation. No real personal data or GPL implementation is copied into the public repo.

---

## Historical iOS-first design

# ChatHarbor architecture — draft

**Status:** Proposed · **Audience:** implementers and reviewers

## Goals
1. Preserve user-initiated chat exports and available attachments in an open, verifiable format.
2. Maintain a manually curated registry of groups, communities, administrators, roles, invitations, and independent contact paths.
3. Provide a recovery runbook for a user who can no longer access their prior account.
4. Minimize data custody and avoid storing private content in public infrastructure.

## Non-goals / constraints
- Automatic continuous reading of WhatsApp's private iOS database.
- Guaranteed recovery of deleted, ephemeral, or unexported messages.
- Programmatic restoration of WhatsApp group memberships, roles, or chat history to a new number.
- Evasion of account restrictions or use of unofficial client automation.

## Modules

| Module | Responsibility |
| --- | --- |
| iOS Share Extension | Import a file explicitly shared by the user, validate type, save original |
| Importer | Parse WhatsApp text/ZIP exports; track format versions and parse warnings |
| Archive | Immutable original, media references, normalized messages, SHA-256 manifest |
| Group Registry | User-entered group name, community, role, administrators, contact channels and invite status |
| Recovery Planner | Coverage checks, verification reminders, step-by-step rejoin plan |
| Storage Adapter | Local encrypted storage and optional versioned remote backup |

## Security boundaries
The website and GitHub repository **never receive user chat data**. Production archives remain on the user's device or in chosen private storage. Treat invitation links as secrets, encrypt sensitive exports, document deletion and recovery procedures, and validate integrity before claiming a backup has succeeded.

## Baseline records
- `Group`: local ID, display name, community, role, criticality, last verified date.
- `RecoveryContact`: local ID, group ID, administrator status, reachable-outside-WhatsApp, preferred contact method.
- `Invite`: group ID, optional URL, captured timestamp, approval required, last validation (no automatic join attempts).
- `Snapshot`: archive ID, source chat/group reference, acquired timestamp, original filename, digest, attachment inventory, parse warnings.
- `RecoveryPlan`: group ID, primary/secondary contact references, manual rejoin instructions and test state.

## Acceptance criteria for first vertical slice
- Import a WhatsApp ZIP from the iOS share sheet and retain its original bytes.
- Calculate a SHA-256 digest, store the import timestamp and identify parser warnings.
- Associate the export with an existing or new registry entry.
- Open the saved file and its attachments independently of WhatsApp.
- Export the registry and archive manifest in documented, non-proprietary formats.
- No background WhatsApp scraping, no automatic rejoin, and no misleading completeness indicator.
