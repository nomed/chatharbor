# ChatHarbor desktop foundation

Rust/Tauri + React/TypeScript. Work #18 under the existing Product/Engineering hierarchy. **A synthetic archive viewer, not yet a phone backup or encrypted Vault app.** macOS/Windows/Linux are native build targets; physical-device compatibility is not inferred from build success.

## Run

Install Node 24.22.1 and Rust 1.99.1. Tauri uses the OS WebView; Linux also needs GTK/WebKit prerequisites (see CI and the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/)). No paid Apple/Google developer account, external server or store is required for this development preview. Unsigned distribution has OS warnings; code signing/notarization is not provisioned.

```sh
cd desktop
npm ci
npm run dev                  # browser preview, local loopback only
npm run tauri -- dev         # desktop window, requires native prerequisites
```

Click **Esplora archivio dimostrativo**. Search original text, open the read-only registry and inspect SHA-256. Or select `public/fixtures/synthetic-archive.json` with **Apri archivio JSON**. Local files remain in memory and are discarded at close; failed imports retain the last verified archive. No persistence, telemetry, cloud synchronization, external content loading, real-device acquisition or Python runtime exists in this slice.

## Validation / native build

```sh
npm run build
npm test
npx playwright install chromium
npm run test:e2e
cargo test --locked -p chatharbor-archive-core
cargo fmt --all -- --check
cargo clippy --locked -p chatharbor-archive-core -- -D warnings
npm run tauri -- build --no-bundle
```

CI builds the unsigned native executable on macos-15, windows-2022 and ubuntu-24.04. This does not launch a GUI or test USB/Keychain/device behavior on each platform. No installer or automatic release is published. Tool versions and dependency graphs are locked in rust-toolchain.toml, Cargo.lock, package.json and package-lock.json. Build sizes must be measured before making download-size claims; no Python/device tools are bundled yet.

## Format / preview limits

Uses the portable archive JSON v1 shape introduced by Swift spike PR #17: `formatVersion`, flat `files` base64 originals, `manifest` records `{path,byteCount,sha256}`, `warnings`, and `registry` with `formatVersion/groups`. The fixture is independently authored synthetic data, with no copied third-party code or messages. Native and frontend verification reject unsafe names, missing/unexpected files, duplicate manifest entries, malformed fields, invalid base64, wrong digests/lengths and unknown versions. Preview limits: **8 MiB encoded JSON, 5 MiB total originals, 256 files, 1000 groups**. These are deliberately tighter than the Swift spike and must be reconciled before production compatibility claims.

Displays `.txt` originals verbatim as UTF-8; it does not reconstruct WhatsApp messages, extract ZIPs, show media, parse backups or open encrypted Vaults. Content is rendered as text, never HTML or automatic clickable contact/invitation links. Group verification is advisory with a 90-day staleness threshold; it cannot establish that an administrator is actually reachable. SHA-256 checks preserved bytes, not source authenticity or complete history. Registry editing and archive export are deferred.

The browser build reuses the UI and Web Crypto verification. On desktop, Rust validates again through the sole custom IPC command. It is a static preview, not an offline/installable PWA; deployment is not enabled. Do not upload real archives to the public repository or website.

## Next work

#19: actual iPhone/Mac acquisition spike without Finder, preserving existing backups and security settings. #20: license/distribution gate before using GPL components. #21: adapter implementation and Python-to-Rust differential fixtures. #13/#14: encrypted external copies and independent recovery. See RFC-0002/ADR-0006 and docs/adapter-protocol.md. No native Type/label replaces the blocked canonical Project Work Type field (#15).
