# ADR-0004 — iOS toolchain qualification boundary

- **Status:** Proposed
- **Date:** 2026-11-07

## Context
The upstream Golden Path provides Java/Go examples; it does not establish tested support for this project's SwiftUI/share-extension delivery environment.

## Proposed decision
Adopt a locally owned iOS engineering profile in `.context/standards/ios-engineering.md`, with exact Xcode/Swift/minimum iOS versions selected only after a reproducible compatibility spike. Require synthetic fixtures, deterministic unit tests, device-level import tests and signing-secret hygiene.

## Consequences
MVP implementation is not ready until toolchain and test targets are selected and CI evidence is available. A documented baseline is not enforced or qualified until a pipeline and receipts prove it.
