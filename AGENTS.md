# ChatHarbor agent entrypoint

This repository is a **design-stage** iPhone-first privacy project. Never imply full automatic WhatsApp extraction or automatic rejoining of groups.

## Authority and context

Read `.context/manifest.yaml` first, then only task-relevant accepted decisions, RFCs, architecture, and the governing GitHub issue/PR. GitHub work items own live planning and execution state; the repository owns accepted engineering decisions. Follow the upstream Nomed Golden Path selected and pinned in `.context/standards/golden-path.md`.

## Working rules

- Keep chat exports, private contacts, invitation URLs, recovery keys and personal data out of Git, issues, logs and GitHub Pages.
- Use official user-initiated import mechanisms; do not automate unofficial WhatsApp access or bypass platform restrictions.
- Do not treat a proposed RFC or ADR as accepted.
- Do not activate claims, branch registry, `development` integration, Project-owned fields, or enforcement by writing configuration alone.
- For material user-facing behavior changes, preserve Product `Outcome → Bet → Initiative` traceability in the authoritative work system when the GitHub connector is configured.
- No direct integration/promotion claim, CI qualification, security assertion or implementation readiness without recorded evidence.

## Starting points

- [Project architecture](docs/architecture.md)
- [Product context](.context/product/product-brief.md)
- [Proposed RFC](.context/rfcs/RFC-0001-chatharbor-v1.md)
- [Adoption plan](.context/standards/golden-path.md)
