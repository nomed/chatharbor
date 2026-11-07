<p align="center"><img src="./docs/assets/chatharbor.svg" alt="ChatHarbor — Nomed circular mark in Harbor Cyan" width="100"></p>
<h1 align="center">ChatHarbor</h1>
<p align="center"><strong>Your conversations. Your continuity.</strong></p>
<p align="center">An open-source, privacy-first project for preserving communication history and preparing to rebuild connections after account loss.</p>
<p align="center"><a href="https://nomed.github.io/chatharbor/">Project website</a> · <a href="./docs/architecture.md">Architecture</a> · <a href="./docs/roadmap.md">Roadmap</a> · <a href="https://github.com/nomed/chatharbor/issues">Issues</a></p>

> **Project status: design / pre-MVP.** ChatHarbor is not yet a functioning iOS backup application. It cannot automatically capture all WhatsApp messages or restore group membership after a ban.

## What we are building

- **Conversation archive:** ingest user-initiated WhatsApp chat exports, preserve originals, and make supported content searchable and readable independently.
- **Group recovery registry:** record groups, communities, administrators, invitation methods and reconnection instructions.
- **Recovery readiness:** show missing dependencies and guide a lawful, user-controlled account transition.
- **Portable data:** maintain open metadata and cryptographic checksums with encrypted, independently accessible copies.

## Reality checks

WhatsApp's official iCloud backup is useful for conventional restoration, but does not guarantee recovery after account suspension. iOS does not expose a supported API to extract all WhatsApp conversations or group memberships continuously. Exported chats cannot be imported into a new account as original WhatsApp chats. Rejoining groups requires valid invitations and/or administrators' approval. ChatHarbor will not bypass platform restrictions or use unofficial automation to evade enforcement.

## MVP approach

**iPhone-first, local-first**. Users export chats using WhatsApp's supported sharing flow. An iOS share extension imports them; a separate recovery registry stores user-provided group and contact information. Originals and manifests remain portable. Cloud replication is optional and explicitly configured.

See [architecture](./docs/architecture.md), [roadmap](./docs/roadmap.md), and [security](./SECURITY.md).

## Brand

ChatHarbor uses the official Nomed circular mark with its product accent **Harbor Cyan `#0891B2`**. The Nomed corporate accent remains **`#FF3B30`**. The website is served from `/docs` on GitHub Pages.

## Contributing

Project is in early design. Please use [issues](https://github.com/nomed/chatharbor/issues) for requirements, threat models, compatibility tests and implementation proposals. Never attach real chat exports or private invitation links to public issues.

## License

MIT — see [LICENSE](./LICENSE). The Nomed name and brand artwork are not granted as product trademarks by this software license.

---
Built under [Nomed](https://nomed.github.io/). Not affiliated with WhatsApp or Meta.

## Executable kickoff

The native backlog starts at [Outcome #2](https://github.com/nomed/chatharbor/issues/2), through [Bet #3](https://github.com/nomed/chatharbor/issues/3) and [Initiative #4](https://github.com/nomed/chatharbor/issues/4). Project #7 access is blocked; canonical Project classification is not activated. See [iOS foundation preview](ios/README.md), [delivery controls](.context/standards/engineering-delivery.md) and [kickoff evidence](.context/evidence/2026-11-07-kickoff.md). The app scaffold is not a qualified MVP; proposed decisions and human security/device gates remain open.
