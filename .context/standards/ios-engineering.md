# ChatHarbor Swift/iOS engineering profile — proposed

**Status:** Proposed, not certified by the upstream Golden Path.
**Owner:** ChatHarbor Engineering maintainers.

## Target baseline (to confirm in first executable spike)
- Swift 6 language mode, SwiftUI and Xcode 26.x as a **candidate toolchain**, not an already-qualified requirement.
- Minimum iOS version: **TBD from a device/SDK compatibility spike**, not invented here.
- Dependency strategy: Swift Package Manager, pinned versions, least privilege and dependency-license review.
- App identifiers, provisioning, signing certificates and release credentials must not enter the repository.
- Test data: synthetic WhatsApp-like text/ZIP fixtures only. No private conversations or actual group links.
- CI must run format/lint/static checks, deterministic parser tests and a build on a pinned supported macOS/Xcode environment after tooling is chosen.
- UI and share extension integration must be tested on simulator and at least one real device prior to MVP qualification.
- Export/import regression suites must include long messages, Unicode, localized timestamps, ZIP path traversal, large attachments, corrupt archives, truncated histories and duplicate imports.
- Security review must cover key storage, encrypted export passphrases, exported file deletion/retention and accidental privacy leakage through logs or crash analytics.

## Evidence and promotion

An Xcode project, test runner, CI workflow and passing receipts do **not yet exist**. First development work selects the exact Swift/Xcode/iOS matrix by testing supported devices. Do not assert Golden Path language-path conformance from the upstream Java/Go baseline.

## Deployment boundary

The public GitHub Pages site is documentation-only. It does not ingest messages, contacts, group invitations or Vault archives. App signing/distribution will be addressed by a separate RFC or accepted ADR.

## Executable qualification update — 2026-11-07

PR #17 introduces the Swift package, test runner, XcodeGen app/Share Extension definition and macOS CI. The qualification candidate selects Xcode 26.0, Swift 6 language mode and provisional iOS 17. See [iOS preview](../../ios/README.md) and [delivery controls](engineering-delivery.md). Earlier “does not yet exist” statements describe the baseline before this PR. Only exact-head CI receipts establish build/test coverage; real-device compatibility, signing and security gates remain open.
