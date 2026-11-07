# ADR-0005 — Portable Vault v1 qualification spike

- Status: Proposed
- Date: 2026-11-07
- Decision owner: @nomed
- Governing work: #12, #13, #14

Implement a reversible qualification spike; this does not accept RFC-0001 or ADR-0001..0004.

Use bounded JSON with original source bytes encoded as base64, a versioned manifest of flat safe filenames, byte lengths and SHA-256, warnings and a versioned group registry. The 32 MiB raw limit is an explicit preview constraint. ZIP is stored unchanged and never extracted in this spike. Parsing, attachment inventory and completeness detection require #9/#10.

Wrap the JSON in AES-256-GCM using CryptoKit, fresh random 96-bit nonce and 128-bit tag. Additional authenticated data is the UTF-8 literal `ChatHarbor.vault.v1`. Envelope JSON is `{formatVersion:1,cipher:"AES-256-GCM",sealed:<base64(nonce || ciphertext || tag)>}`. Reject unknown versions/ciphers. The envelope label itself is checked; AAD binds the version-specific protocol. SHA-256 establishes accidental corruption detection, not sender authenticity.

The key is 32 random bytes represented as exactly 64 hexadecimal characters. It is **not a password**; no password-derived encryption is offered. The preview keeps it in process memory, shows it only for explicit recovery setup and requires the user to acknowledge an independent copy before export. No clipboard automation, telemetry, server escrow or key persistence. Memory erasure is not guaranteed by Swift Data/String. Reviewed Keychain storage, foreground privacy cover, protected persistent archive storage, key import/reuse UX and retention are prerequisites to production.

Independent decryption uses Python cryptography/AESGCM and no ChatHarbor installation. Input and output are bounded; output must be a new private directory. Successful CI decryption proves format interoperability on synthetic data, not external-provider durability or real-device recovery. Key loss is unrecoverable. Users must keep the key apart from the external Vault and outside the original phone.

Review before acceptance: key custody, UI exposure/screenshots, device lock behavior, backup exclusion failure handling, App Group entitlement ownership, revoked invitations, output cleanup after restore failures and third-party conversation retention. Gate #14 remains open.
