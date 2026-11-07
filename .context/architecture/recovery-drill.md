# Independent recovery drill — proposed test contract

## Threat model
The original iPhone is unavailable, the original WhatsApp account is unusable, and ChatHarbor cannot be installed or opened on the original phone. Assume the user retains an external encrypted Vault bundle plus independent recovery instructions/keys.

## Preconditions
- Synthetic group registry with at least one contact reachable independently of WhatsApp.
- Synthetic conversation exports with text and available media.
- Known expected hashes, file counts, archive format and export manifest schema.
- External destination controlled by the user (e.g. another cloud storage account or encrypted removable storage).
- Key recovery method not dependent exclusively on the lost phone.

## Procedure
1. Capture user-initiated synthetic chat export; validate file and link to registry entry.
2. Preserve original bytes and emit a versioned manifest with SHA-256 digests.
3. Export an encrypted Vault bundle outside the source iPhone.
4. Verify the bundle exists on the destination and that its length/checksum match.
5. Use a clean device/environment without the source app/account/phone to retrieve and decrypt it.
6. Verify hashes of originals and exported media, compare counts, inspect representative messages, and export a readable transcript.
7. Open the independent administrator contact and recovery steps for a critical group. Do **not** attempt automated group joining.
8. Record the result, tool versions, failures, missing/omitted content, test date, and evidence references.

## MVP pass/fail
**Pass:** the clean environment can decrypt and read archived content and the group registry, verify stored originals/hashes, and follow a manual group-rejoin plan. An unverified upload or a backup readable only by the original WhatsApp account is a **fail**.

This contract is not an executed test. The first runnable implementation must attach reproducible, privacy-safe evidence.
