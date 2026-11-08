# RFC-0002 — Free cross-platform desktop archive

- Status: Proposed
- Date: 2026-11-08
- Decision owner: @nomed
- Traceability: Outcome #2 → Bet #3 → Initiative #4; implementation #18, acquisition #19, license gate #20, adapter/porting #21
- Execution authority: owner approved this scoped desktop kickoff in the current conversation. Production/security/license acceptance remains separate.

## Current direction

Deliver a local desktop application for macOS, Windows and Linux, using Rust/Tauri with a React/TypeScript UI. Start with owner devices iPhone + Mac; qualify other OS/device combinations separately. No app stores, paid developer accounts, hosted processing or paid dependencies are required for the prototype. Signing/notarization, distribution reputation, disk capacity and maintenance remain actual limitations, not cost-free promises. Public standard GitHub Actions runners are used; no paid runner or external service is provisioned.

Preserve the iOS Swift qualification branch/PR #17 without merging it into this path. Manual exports remain fallback; desktop backup acquisition becomes the primary hypothesis. Existing proposed RFC/ADRs are historical design inputs, not silently accepted or rewritten. This RFC records the change from RFC-0001's iPhone-first approach, not new approval of its security choices.

## First reviewable slice

- A Tauri desktop shell and reusable browser UI.
- A deliberately small synthetic archive using the existing v1 originals/base64, manifest, warnings and recovery-registry shape from PR #17; no production-format fork.
- Strict bounded archive verification before replacing visible state; raw UTF-8 source preview and search, registry read-only, integrity inspection.
- The browser frontend verifies with Web Crypto; the Tauri host also verifies with Rust. Shared synthetic input and negative tests qualify only this subset; full cross-language equivalence is a later gate.
- No real backup ingestion, parser, persistent catalog, encryption/decryption, attachment rendering or USB operation in this slice. Disabled acquisition controls explain the current state. No server uploads, telemetry, automatic links or scripts from archive content.

## Acquisition and porting sequence

1. Qualify Mac/iPhone pairing and MobileBackup2 backup acquisition using reviewed/pinned pymobiledevice3 or libimobiledevice. No GUI automation of Finder required. Device must be unlocked/authorized; no access to private live containers is assumed.
2. Compare full and host-filtered backup snapshots. A client filter may receive/discard unrelated bytes; a small stored output does not prove a WhatsApp-only transfer or faster backup.
3. Inventory WhatsApp App Group databases and available media and qualify compatibility with whatsapp-backup-tools. Do not change WhatsApp backup encryption or device settings automatically.
4. Gate #20 decides exact component licenses, notices, dependency versions and whether GPL-compatible distribution is adopted. ChatHarbor remains MIT at this stage; no GPL code is copied, translated, executed or bundled in this PR.
5. Implement #21's adapter contract; package Python privately inside the desktop distribution if approved. Users should not need a separate Python installation. Rust orchestrates a Python process; Rust is not itself a Python interpreter.
6. Port behavior to Rust only against synthetic differential fixtures covering iOS backups, Android crypt14/15, database versions, missing media, incremental merges and metadata. Do not equate successful compilation with parity.
7. Add local encrypted catalog/Vault and run clean independent restore, preserving #13/#14. Registry cannot restore group membership automatically.

## Desktop and web boundary

The React UI builds for Tauri and a static browser preview. Standalone web can open explicitly selected JSON archives on the device. It cannot acquire iPhone backups via USB; any browser-to-device workflow requires a separately installed authenticated local component. No localhost bridge is enabled in this PR. An installable offline PWA, service worker and security review of updates are deferred; a Vite browser build is not called a PWA.

## Acceptance gates

Native build on each OS, positive/negative integrity tests, browser tests for failed imports preserving the old archive, safe rendering without external requests, and explicit preview limits. Actual device acquisition, Python bundling, license decision, encryption, persistence, installer signing and real restore require separate evidence. No full Golden Path activation claim: Project #7 classification/view access remains blocked in #15.
