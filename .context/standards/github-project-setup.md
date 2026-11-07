# GitHub Project setup — governed activation runbook

**Status:** not applied. This document is an operator checklist, not evidence of an existing Project.

## Authority

- Repository: `nomed/chatharbor` (public personal-account repository)
- Work-model profile: `Project-owned` from the **pinned** Golden Path GitHub connector
- Upstream snapshot: `7d4d17ad2aff5bbb9eddc688ec9b4bd46c11e316`
- Adopter manifest: `.golden-path/github-work-model.json`
- Current `authorizedProjects`: `[]` — deliberately unconfigured
- No GitHub Project API, project-field mutation or native parent/sub-issue operation is currently exposed by the connected GitHub integration.

## One-time Project configuration

1. Create/select a GitHub Projects v2 project under `nomed` (the personal-account owner) and name it **ChatHarbor Delivery**.
2. Before changing fields, inspect the Project against the pinned `connectors/github/project-owned-work-model.v1.json` using the canonical Golden Path connector.
3. Apply only the reviewed, required Project-owned fields. **Work Type** is the canonical authority; GitHub native Issue Type and labels do not replace it.
4. Configure and validate the standard views: `Executive roadmap`, `Now / Next / Later`, `At risk`, `All`, `Delivery plan`, `Initiatives`.
5. Check that native GitHub parent/sub-issue relationships can be created and read back through a supported transport. Body references alone are not sufficient.
6. Inspect available Project permissions, scopes, repository access, required fields and any permission errors before mutation.
7. After approval, record the actual `nomed/PROJECT_NUMBER` in `authorizedProjects` through a reviewed PR, then run canonical schema validation and read-only connector preflight.
8. Only then create the work graph from `.context/product/work-graph-proposal.md`, using a sealed, authorized operation plan and post-state comparison.

## Planned field semantics

| Semantics | Authority |
| --- | --- |
| Work item type: Outcome, Bet, Initiative, Epic, Feature, Task, Bug, Technical Debt, Gate | Project-owned `Work Type` |
| Parent/child | Native GitHub sub-issue hierarchy |
| Issue open/closed | Native GitHub Issue |
| Ownership | Assignee plus Project ownership properties |
| Horizon and lifecycle/readiness | Separate Project/body-backed fields per connector |
| Product, area, priority, impact, effort, health | Project-owned fields (where applicable) |
| Evidence and acceptance | Issue body and linked verifiable receipts |
| Delivery commitment | Milestone only for a real commitment |

The Project model and field options must be taken from the pinned upstream JSON, **not invented from this summary**.

## Permission and recovery boundary

Project provisioning and hierarchy mutation require a verified, compatible connector or an authenticated GitHub CLI/API transport with the correct permissions. The current ChatGPT GitHub connection exposes repository Issues but does not provide the Project v2 mutations needed for canonical adoption. Do **not** create flat Issues and merely claim parenthood in their bodies.

## Verification before declaring active

- [ ] Authorized Project ID written and validated.
- [ ] Work Type and all required fields checked from authoritative Project data.
- [ ] Six standard views configured and inspected.
- [ ] Native parent links round-tripped successfully.
- [ ] Product and Engineering ownership classification documented for all work.
- [ ] Canonical plan digest/authorization and post-state comparison recorded.
- [ ] Official Golden Path adoption/status report run from the pinned runtime.
- [ ] Actual enforcement distinguished from mere configuration.

Until these checks pass, status remains **planned / not activated**.
