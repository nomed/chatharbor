# ADR-0001 — Local-first archive boundary

- **Status:** Proposed
- **Date:** 2026-11-07

## Context
The intended use involves sensitive personal conversations, media, group invitations and contacts. Users may lose access to a messaging account.

## Decision proposed
Use explicit user-initiated iOS import and keep private data on the device by default. The public website and project repository never ingest chat content. Optional cloud replicas require explicit configuration and encryption.

## Consequences
The iPhone-only model cannot capture private WhatsApp data automatically in the background. Usability, encryption recovery, local backups and storage capacity must be separately validated. **No security guarantee is claimed prior to review.**
