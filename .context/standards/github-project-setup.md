# GitHub Project setup — governed activation runbook

**Status:** Project #7 selected and recorded in the proposed adopter manifest; actual Project field/view inspection and provisioning remain unverified.

## Authority

- Repository: `nomed/chatharbor` (public personal-account repository)
- Work-model profile: `Project-owned` from the **pinned** Golden Path GitHub connector
- Upstream snapshot: `7d4d17ad2aff5bbb9eddc688ec9b4bd46c11e316`
- Adopter manifest: `.golden-path/github-work-model.json`
- Selected Project: [nomed/7](https://github.com/users/nomed/projects/7/views/1), provided by the repository owner.
- Proposed `authorizedProjects`: `["nomed/7"]` — recorded in PR #1; not yet merged into `main`.
- No GitHub Project API, project-field mutation or native parent/sub-issue operation is currently exposed by the connected GitHub integration.

## One-time Project configuration

1. **Selected:** existing GitHub Projects v2 project [nomed/7](https://github.com/users/nomed/projects/7/views/1). Verify its current name and settings in GitHub; do not assume they match the proposed **ChatHarbor Delivery** name.
2. Before changing fields, inspect the Project against the pinned `connectors/github/project-owned-work-model.v1.json` using the canonical Golden Path connector.
3. Apply only the reviewed, required Project-owned fields. **Work Type** is the canonical authority; GitHub native Issue Type and labels do not replace it.
4. Configure and validate the standard views: `Executive roadmap`, `Now / Next / Later`, `At risk`, `All`, `Delivery plan`, `Initiatives`.
5. Check that native GitHub parent/sub-issue relationships can be created and read back through a supported transport. Body references alone are not sufficient.
6. Inspect available Project permissions, scopes, repository access, required fields and any permission errors before mutation.
7. **Recorded in draft PR:** `nomed/7` is in `authorizedProjects`. After Project inspection, validate the manifest and run the canonical read-only connector preflight before activating the work graph.
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

- [x] Project ID selected by owner and written to proposed branch manifest: `nomed/7`
- [ ] Project existence, access and current configuration verified by a Project-capable transport
- [ ] Work Type and all required fields checked from authoritative Project data.
- [ ] Six standard views configured and inspected.
- [ ] Native parent links round-tripped successfully.
- [ ] Product and Engineering ownership classification documented for all work.
- [ ] Canonical plan digest/authorization and post-state comparison recorded.
- [ ] Official Golden Path adoption/status report run from the pinned runtime.
- [ ] Actual enforcement distinguished from mere configuration.

Until these checks pass, status remains **planned / not activated**.
