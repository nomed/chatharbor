# GitHub Project setup — governed activation runbook

**Status:** Project #7 selected and recorded in the proposed adopter manifest; actual Project field/view inspection and provisioning remain unverified.

## Authority

- Repository: `nomed/chatharbor` (public personal-account repository)
- Work-model profile: `Project-owned` from the **pinned** Golden Path GitHub connector
- Upstream snapshot: `7d4d17ad2aff5bbb9eddc688ec9b4bd46c11e316`
- Adopter manifest: `.golden-path/github-work-model.json`
- Selected Project: [nomed/7](https://github.com/users/nomed/projects/7/views/1), provided by the repository owner.
- Proposed `authorizedProjects`: `["nomed/7"]` — merged into `main` by PR #1.
- The connected repository tool surface lacks Project administration; the authenticated CLI can reach GitHub outside the sandbox, but Project #7 currently returns `Resource not accessible by integration (user.projectV2)`. See the dated review in `.context/evidence/2026-11-07-project-review.md`.

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

Project provisioning and hierarchy mutation require a verified, compatible connector or an authenticated GitHub CLI/API transport with the correct permissions. The CLI identity is verified as `nomed`; Project access is blocked for the current integration. The native Issue API schema supports hierarchy and dependency fields, but write/read-back qualification is still pending. Do **not** create flat Issues and merely claim parenthood in their bodies.

## Verification before declaring active

- [x] Project ID selected by owner and written to main manifest: `nomed/7`
- [ ] Project existence, access and current configuration verified by a Project-capable transport
- [ ] Work Type and all required fields checked from authoritative Project data.
- [ ] Six standard views configured and inspected.
- [ ] Native parent links round-tripped successfully.
- [ ] Product and Engineering ownership classification documented for all work.
- [ ] Canonical plan digest/authorization and post-state comparison recorded.
- [x] Official scoped Golden Path adoption/status report run from the pinned runtime; this does not certify Project conformance.
- [ ] Actual enforcement distinguished from mere configuration.

Until these checks pass, status remains **planned / not activated**.

## Kickoff update — 2026-11-07

The owner authorized repository work while Project access remains blocked. Fifteen real issues (#2–#16) now form a native GitHub hierarchy; 14 parent links and 6 dependency links were written and read back. Intended types/properties in bodies are migration instructions, not canonical Project values. No labels or native Type values were used as a replacement. Project membership, fields, values, views and settings remain uninspected/unmodified. #15 tracks completion. The new native graph receipt supersedes earlier statements that no issues exist; prior dated evidence remains historical.

Schema review confirms ownership is native Assignees plus **Owning team**, not an invented custom Ownership field. Required conditional properties include Confidence and Bet Stage for Bet and Initiative Stage/Effort for Initiative. Horizon applies to Bet, not every delivery task. Use `project-owned-work-model.v1.json` as selected by the adopter manifest; the other upstream project template still contains native Type-oriented views and must not override the selected Project-owned model.
