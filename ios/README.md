# iOS foundation preview

Tracked by #12 under #8 → #4 → #3 → #2. This is an unsigned qualification scaffold, not a released MVP.

## Build

Xcode 26.0, Swift 6, iOS 17 provisional baseline. On macOS:

```sh
swift test
brew install xcodegen
cd ios
xcodegen generate
xcodebuild -project ChatHarbor.xcodeproj -scheme ChatHarbor -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
```

For physical-device work, a maintainer must configure its own bundle IDs, developer team and registered App Group in both targets. These identifiers are placeholders, not a provisioned capability. Do not add credentials to the repo. App Group: `group.org.chatharbor.shared`.

## Structure and behavior

- `Sources/ChatHarborCore`: source-preserving portable JSON archive, SHA-256, registry model, CryptoKit Vault encryption/decryption.
- `Tests/ChatHarborCoreTests`: synthetic positive/negative tests and cross-language fixture generation.
- `ios/ChatHarbor`: SwiftUI preview; Files import, manifest display, recovery-key generation/acknowledgment and encrypted Files export.
- `ios/ShareExtension`: one-file TXT/ZIP staging into protected App Group inbox, atomic publication, 32 MiB per-file/128 MiB inbox budget. Open the app and explicitly read the inbox after sharing. Source file names are replaced by random identifiers; original bytes remain unchanged.
- `tools/restore_vault.py`: independent decryption and verification, writes originals, manifest, registry and warnings into a new private directory.

The preview imports one opaque source export at a time. It preserves the original ZIP instead of extracting attachments. It does not parse transcripts, detect source truncation or merge histories. In-memory archives are replaced on the next import; inbox deletion/retention and background processing are not implemented. Inbox count/size checks are a best-effort preview quota, not a multi-process reservation protocol. Registry schema exists; editing UI is #11. Persistent archive storage and Keychain custody require security review before real data. Do not use this preview for irreplaceable conversations.

## Portable recovery exercise

On a Mac, create the synthetic fixture:

```sh
CHATHARBOR_DRILL_OUTPUT=/tmp/chatharbor-drill swift test
```

Transfer only `synthetic.vault` and its separately retained synthetic recovery key to another environment, with no app or source phone. Never transfer real keys through GitHub.

```sh
python3 -m venv /tmp/chatharbor-restore
/tmp/chatharbor-restore/bin/pip install -r tools/requirements-restore.txt
/tmp/chatharbor-restore/bin/python tools/restore_vault.py /path/to/synthetic.vault --key-file /separate/path/synthetic.recovery-key --output /new/private/restored
```

Compare original file hashes/counts and registry contact/runbook. The CLI refuses existing output directories and unknown formats, authenticates before writing and verifies the manifest. It never extracts ZIP content or joins groups. CI runs the Swift → Python portability portion; external-provider retrieval and device-loss simulation remain manual gates in the existing recovery drill.
