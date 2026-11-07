# RFC-0001 — ChatHarbor v1: independent archive and group recovery

- **Status:** Proposed
- **Decision owner:** Product & Engineering
- **Date:** 2026-11-07

## Problem

Official WhatsApp device backup is not an independently readable complete account-continuity archive. A ban can eliminate access, and group memberships are not restorable merely by keeping exported messages.

## Scope

- iPhone share-extension ingestion of **user-initiated** WhatsApp chat exports.
- Immutable source archives and media present in exports, SHA-256 manifests, parser warnings and offline viewing.
- Manually curated groups, communities, admins, external contact methods, invitations, roles and recovery instructions.
- Offline / independently accessible archive and recovery planning, with opt-in encrypted cloud replicas after validation.

## Non-goals

- Continuous read access to WhatsApp private iOS data, completeness guarantees or undelete.
- Automatic joining of groups, cloning account identity, circumventing bans or credentials collection.
- Cloud ingestion of private messages by the public project website.

## Proposed module boundaries

`ShareExtension → Import Validation → Original Archive + Manifest → Parser/Viewer`
and separate `Group Registry → Recovery Readiness → User-controlled Recovery Runbook`.

## Decisions needed

1. SwiftUI application packaging and supported iOS versions.
2. Storage and encryption (Keychain/Secure Enclave where appropriate, archive key recovery).
3. Export parser behavior for localization, truncated histories and duplicate snapshots.
4. Group registry data minimization and retention.
5. Legal/privacy assessment for handling conversations involving other people.

## Acceptance / evidence gates

- [ ] Realistic synthetic exports imported from iOS share sheet.
- [ ] Originals readable independently; SHA-256 verification passes.
- [ ] Parser explicitly signals incomplete/unsupported evidence.
- [ ] User can document and export group recovery paths without exposing invite URLs publicly.
- [ ] Security model and restore drill reviewed before claiming a useful MVP.

**Not accepted or implementation-ready until reviewed and evidenced.**
