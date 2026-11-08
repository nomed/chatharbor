# ChatHarbor agent entrypoint

**Status:** desktop-first prototype (owner direction 2026-11-08); prior iOS work is a preserved spike. Do not claim full continuous WhatsApp capture or automatic group rejoining.

## Public, self-contained operating contract

Read `.context/manifest.yaml`, `.context/standards/golden-path.md` and only relevant project sources for the task. Public contributors need **no access** to private `nomed/golden-path` or `retex-iconic/golden-path`. The upstream snapshot is pinned for provenance in the local standard; upstream private text and runtime checks are not prerequisites for ordinary contributions.

1. Current human instruction takes precedence; accepted decisions/RFCs outrank proposed work.
2. Source, tests and validated behavior are the implementation authority; GitHub Issues/PRs are live work state.
3. Additive work must have explicit scope, acceptance criteria, evidence and review. User-facing changes require Product → Engineering traceability once the configured connector supports native parent and Work Type.
4. Follow project privacy boundaries: **never** commit chat exports, invitation URLs, private phone numbers, secrets, or user data to GitHub or its website.
5. Use authorized local backup/export acquisition with explicit device trust. Qualify desktop iPhone/Android transports separately; never claim live private-container access or bypass platform restrictions.
6. Preserve unmodified original archive files; flag unverified or truncated extraction.
7. Independently tested Vault export/restore is an MVP requirement.
8. Do not claim claims/branch registration, CI enforcement, a selected Project, development/main integration or formal Golden Path compliance until verified and explicitly activated.

## Task-specific reading

- [Desktop direction](.context/rfcs/RFC-0002-desktop-first.md)
- [Desktop implementation](desktop/README.md)
- [Architecture](docs/architecture.md)
- [Product intent](.context/product/product-brief.md)
- [Proposed product RFC](.context/rfcs/RFC-0001-chatharbor-v1.md)
- [Local Golden Path adoption plan](.context/standards/golden-path.md)
- [Proposed iOS baseline](.context/standards/ios-engineering.md)
