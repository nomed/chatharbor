# ChatHarbor agent entrypoint

**Status:** design-stage project. Do not claim full continuous WhatsApp capture or automatic group rejoining.

## Public, self-contained operating contract

Read `.context/manifest.yaml`, `.context/standards/golden-path.md` and only relevant project sources for the task. Public contributors need **no access** to private `nomed/golden-path` or `retex-iconic/golden-path`. The upstream snapshot is pinned for provenance in the local standard; upstream private text and runtime checks are not prerequisites for ordinary contributions.

1. Current human instruction takes precedence; accepted decisions/RFCs outrank proposed work.
2. Source, tests and validated behavior are the implementation authority; GitHub Issues/PRs are live work state.
3. Additive work must have explicit scope, acceptance criteria, evidence and review. User-facing changes require Product → Engineering traceability once the configured connector supports native parent and Work Type.
4. Follow project privacy boundaries: **never** commit chat exports, invitation URLs, private phone numbers, secrets, or user data to GitHub or its website.
5. Prefer documented iOS user-initiated sharing, never unsupported WhatsApp automation or ban circumvention.
6. Preserve unmodified original archive files; flag unverified or truncated extraction.
7. Independently tested Vault export/restore is an MVP requirement.
8. Do not claim claims/branch registration, CI enforcement, a selected Project, development/main integration or formal Golden Path compliance until verified and explicitly activated.

## Task-specific reading

- [Architecture](docs/architecture.md)
- [Product intent](.context/product/product-brief.md)
- [Proposed product RFC](.context/rfcs/RFC-0001-chatharbor-v1.md)
- [Local Golden Path adoption plan](.context/standards/golden-path.md)
- [Proposed iOS baseline](.context/standards/ios-engineering.md)
