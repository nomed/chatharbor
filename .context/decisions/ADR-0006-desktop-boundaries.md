# ADR-0006 — Desktop shell and replaceable acquisition boundary

- Status: Proposed
- Date: 2026-11-08
- Owner: @nomed
- Governing RFC: RFC-0002; issues #18–#21

Use Tauri 2 + Rust and React/TypeScript for the scoped desktop prototype approved by the owner. Preserve prior Swift work as a separate spike. macOS, Windows and Linux are build targets; hardware acquisition compatibility is independently qualified.

Rust owns native archive validation and will own catalog/portability. React owns presentation and shares a bounded archive verifier with browser preview. Tauri exposes only archive verification in this slice: no filesystem/shell/USB/HTTP/updater plugin. Standard browser file selection is user-initiated; originals live only in process memory. CSP limits production shell resources to the app/IPC. Native inputs are size-limited and errors avoid exposing input content.

Acquisition and WhatsApp parsing are separate adapters. Do not implement proprietary protocols from scratch solely to eliminate Python. Initially assess libimobiledevice/pymobiledevice3 and the existing Python tool, then replace components using behavioral parity tests. No interpreter or external acquisition tool is bundled until #20 settles licensing/distribution and #19 validates the actual iPhone/Mac path. No change to the MIT license is made here.

Versioned adapter design is documented in desktop/docs/adapter-protocol.md. This is an interface proposal, not an implemented subprocess bridge. It must not be exposed to arbitrary browser pages. Independent encrypted recovery remains an MVP gate; this prototype is not storage protection or a backup solution.
