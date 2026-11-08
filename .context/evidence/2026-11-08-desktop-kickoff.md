# Desktop-first kickoff evidence

Date: 2026-11-08. Owner authorized the proposed desktop kickoff in this conversation. Repository remains public/MIT. Baseline is main@878012ab282c93921b92a65b4c5504b68d3fd2b0; scoped branch feat/18-desktop-foundation is isolated in a new worktree. PR #17 and its Swift spike are preserved without merge or deletion.

## Actual scope

React/TypeScript UI in a Tauri 2 shell with a bounded Rust archive verifier. A browser preview reuses presentation and a Web Crypto verifier; the desktop also invokes native verification before committing a new archive to visible state. The synthetic v1 archive uses the same originals/manifest/registry shape described by the Swift spike, with tighter declared preview limits. No source from whatsapp-backup-tools, pymobiledevice3 or other GPL components was copied, translated or bundled. No Python/device adapter is executed. No paid account/service/runner, installer publication or store setup is enabled.

The app opens a synthetic fixture or user-selected bounded JSON v1; verifies hash/length/file set; previews raw UTF-8 text and supports search; shows recovery contacts/runbooks read-only and manifest warnings. Archive content is inert text, not HTML or clickable imported URLs. Failed imports preserve the preceding verified state. It does not parse real WhatsApp backups, extract ZIP/media, encrypt, persist, recover device groups, connect USB or promise complete history. Phone acquisition controls remain disabled with an explanation.

## GitHub work graph delta

Reused Outcome #2 → Bet #3 → Initiative #4 and all four workstreams. Updated Bet acquisition hypothesis, Initiative primary acceptance path and Epic #8 to Desktop & Device Engineering Foundation, preserving prior text as historical scope. Preserved iOS Task #12, native links and PR #17. New assigned work:

- #18 shell/viewer under native parent #8.
- #19 iPhone/Mac acquisition under native parent #5.
- #20 license/distribution gate under native parent #7.
- #21 Python adapter/porting fixtures under native parent #5, natively blocked by #20.

All four parent links and the blocked-by link were read back and asserted via GraphQL after mutation. Intended Work Type/property values are issue-body instructions only. Project #7 fields/views/membership remain blocked as recorded by #15; no fake canonical field population or compliance activation is claimed.

## Verification boundary

Local commands: npm ci/install with exact package versions + lock; npm run build; npm test; Chromium Playwright; cargo test --locked -p chatharbor-archive-core; cargo clippy --locked -p chatharbor-archive-core -- -D warnings; cargo fmt --all; python3 scripts/check-governance.py; git diff --check. Rust toolchain 1.99.1; Node 24.22.1. Native Linux GUI prerequisites are absent in the cloud executor, so local browser tests are not described as native runtime tests.

The new CI tests frontend/browser and builds native unsigned executables on macos-15/windows-2022/ubuntu-24.04. Final candidate SHA, run URLs and actual conclusions belong in the PR verification receipt; configured CI is not declared passing until results exist. Builds do not qualify USB, key storage, GUI launch on each OS, installer signing or physical devices. No required protections, claims or promotion mechanism was changed. Standard public runners are used; if account policy blocks execution, report the actual failure rather than enabling paid services.

## Next executable work and residual gates

#19 runs on the owner's Mac/iPhone, which this cloud executor cannot access. Qualify trusted pairing, encrypted backup, disconnect/interruption, retained data and transfer bytes. Host filtering is not device-side WhatsApp-only extraction. Never change encryption settings automatically or write into existing backups.

#20 records exact license/distribution decisions before GPL integration. #21 defines a local allowlisted process adapter with a reviewed secret channel and differential synthetic fixtures before Rust replaces Python. Existing #13/#14 still require encrypted external copies, independent restore and human security review. This commit does not accept all RFC/ADRs or certify a production MVP. Web/PWA deployment is not included; GitHub Pages remains documentation-only.
