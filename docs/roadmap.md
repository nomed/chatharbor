# Roadmap

**Design-stage roadmap — features below are not yet shipped.**

## Phase 0 — Feasibility and privacy
- [ ] Test representative iPhone WhatsApp exports with and without media, across locales and long chats.
- [ ] Record truncation, attachment and format limitations.
- [ ] Define threat model, recovery expectations and privacy policy.
- [ ] Validate iOS share-extension ingestion on supported iOS versions.

## Phase 1 — Independent archive
- [ ] Build SwiftUI app shell and iOS share extension.
- [ ] Keep immutable source exports; generate checksums and manifests.
- [ ] Parse chat timeline and media with warnings on uncertain completeness.
- [ ] Search and view archived content offline.

## Phase 2 — Group continuity
- [ ] Group and community registry, external administrator contacts and role records.
- [ ] User-entered invitation links with protected storage.
- [ ] Recovery readiness diagnostics and periodic verification reminders.
- [ ] Guided new-number rejoin workflow, with administrator approval where needed.

## Phase 3 — Backup reliability
- [ ] Optional encrypted, versioned cloud replicas.
- [ ] Export / restore the independent ChatHarbor vault.
- [ ] Integrity audits and restore drills.
- [ ] Optional desktop-assisted backup adapter, explicitly separated from iPhone-only flow.

## Gate
No promise of complete automated WhatsApp backup or automatic group recovery without a documented, supported integration.
