# Product sequencing

Desktop-first direction approved for the prototype on 2026-11-08. This document describes dependencies, not live delivery status; GitHub issues and PRs are the work record.

## Foundation

Rust/Tauri + React desktop shell with a synthetic verifiable archive, source-text viewer/search and read-only recovery registry. Target builds: macOS, Windows and Linux. Browser preview shares the UI; it is not a deployed PWA or USB acquisition solution. See [desktop guide](../desktop/README.md) and RFC-0002.

## Acquisition feasibility

Qualify iPhone/Mac backup acquisition without manual Finder operation, with explicit trust, encryption and interruption tests. Distinguish host-side retention filters from actual bytes transferred. Qualify Android backup/media acquisition via ADB separately. Manual per-chat export remains a fallback. Swift PR #17 remains a preserved experiment, not the primary delivery path.

## Parsing and archive

Decide licenses before incorporating GPL components. Introduce a reviewed Python adapter if approved; port behaviors to Rust only with differential fixtures for platform/database versions, media, incremental snapshots and missing data. Preserve originals and manifests; add persistent catalog, message reconstruction and media viewing without implying complete history.

## Group continuity and independent recovery

Add registry editing, independently reachable administrator contacts, private invitation handling, staleness review and manual recovery instructions. Implement externally stored encrypted copies and prove recovery without the original phone/account. Cloud providers and continuous synchronization are optional; an independent recoverable copy is not.

## Gates

No store, paid account or hosted service required for the local prototype. Unsigned distribution, OS/device compatibility, security, licensing, encrypted recovery and physical-device evidence require explicit qualification. No automatic group membership recovery or unsupported live WhatsApp extraction. Project #7 field/view activation remains separate from application implementation.
