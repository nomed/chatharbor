# ADR-0001 — Local-first capture, independent recovery

- **Status:** Proposed
- **Date:** 2026-11-07

## Context

Private conversations, media, group invitations and administrator contacts require controlled access. A local-only iPhone Vault does not survive device destruction or loss.

## Proposed decision

Use user-initiated imports on iOS and local storage by default. Require an exportable, encrypted, portable bundle that can be stored outside the original phone and restored independently. Cloud vendors and automatic replication remain optional. The public website and repository never ingest personal chat data.

## Consequences

- User-driven export and recovery verification must be included in the MVP, not postponed.
- The export format, cryptography and key-recovery plan require specific review and reproducible tests.
- iOS cannot offer continuous extraction of WhatsApp's private database using supported APIs.
- A successful upload alone is not proof of recovery. **No security guarantee is claimed before qualification.**
