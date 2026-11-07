# Project-owned adoption review — 2026-11-07

Status: **BLOCKED / NOT CONFORMANTLY ACTIVATED**. PR #1 remains draft; no merge or auto-merge.

## Provenance and reproducible checks

- Upstream: `nomed/golden-path`, detached at `7d4d17ad2aff5bbb9eddc688ec9b4bd46c11e316`.
- Reviewed target: `nomed/chatharbor`, PR branch `explore/chatharbor-golden-path-bootstrap`, commit `3c03190389c535273a39caa9e1b20b766587285c`.
- Runtime: Python 3.12.14, jsonschema 4.26.0, PyYAML 6.0.3 in upstream-owned `.venv-tools`; `python3 tools/gp.py setup` completed.
- Identity: `nomed`, current credential. Official preflight attempted stored credentials read-only; stored identity unavailable, no identity switch or credential changes.
- Official report command (from pinned upstream checkout):
  `python3 tools/gp.py run tools/adoption_report.py status --repository nomed/chatharbor --repository-root /workspace/chatharbor --requested-ref explore/chatharbor-golden-path-bootstrap --output-root /tmp --language it`.
- Report bundle: `/tmp/golden-path-status-_gbig1x0`; inspection `7218c8da-321a-4cfa-8a4a-3eccf18a05e3`. Artifact acceptance succeeded; `delivery_verified=false`. The [unchanged report](2026-11-07-official-adoption-report.md) preserves the scoped inventory; successful report generation does not establish conformance.
- An earlier report attempt stopped at collection because the context manifest lacked repository identity. Its evidence remains in `/tmp/golden-path-status-w6amhit2`. The new commit fixes repository identity, connector binding and immutable contract provenance.

## Verification results

| Check | Result and limit |
| --- | --- |
| Full repository-manifest JSON Schema Draft 2020-12 | Passed the official connector `load_contracts` validation, including work-model and connector schemas, during the inspect command below. This supersedes only the bounded JSON structural check, not remote conformance. |
| Context manifest | Parsed and bound to the target by official report collection. No standalone upstream context-manifest schema was found; this is not a claim of complete YAML schema validation. |
| Bounded local declaration check | `python3 scripts/check-governance.py` passed. |
| PR CI | [Run 42412188232](https://github.com/nomed/chatharbor/actions/runs/42412188232) succeeded on `3c03190`; declaration check only. |
| Project #7 inspection | `gh project view 7 --owner nomed --format json` failed with `Resource not accessible by integration (user.projectV2)`. Fields, views and membership are unknown, not absent. |
| Full connector inspection | Command below returned exit 1 with gaps for `project:nomed/7`, `repositoryHarness`, and `issues`. Do not validate or derive repairs from incomplete observations. |
| Native hierarchy/dependency API | GraphQL Issue schema exposes `parent`, `subIssues`, `blockedBy`, `blocking`; no mutation or round-trip qualification performed. Schema support is not evidence of configured relationships. |
| Effective consumer | GitHub default branch is `main`; the PR manifest is staged. Official preflight could not consume a repository manifest there. The PR branch is not proof of remotely effective governance. |
| PR state | Draft, unmerged, no auto-merge; no approval asserted. |

Official connector command:
`python3 tools/gp.py run connectors/github/tools/github_work_model.py inspect --repository nomed/chatharbor --manifest /workspace/chatharbor/.golden-path/github-work-model.json --output /workspace/scratch/chatharbor-connector-inspection.json`.

## Final review findings and next boundary

1. **P1 — Project access blocks requested configuration and conformance.** Provide a Project-capable credential for the same intended identity through environment settings, with Project read/write and repository Issues access. Do not infer account ownership or user role from the integration error. No scope refresh or login was attempted.
2. **P1 — No governed hierarchy is materialized.** Work Type, the six standard views, required field values, native parent/child links, dependencies and acceptance criteria must be applied and round-tripped together after complete Project inspection and operation preflight. Do not create flat surrogate issues or treat proposal Markdown as live authority.
3. **P1 — Main is not consuming the PR configuration.** Validate and review the PR before merge. Runtime report success and green bounded CI do not satisfy the Project gate.
4. **P2 — Product/engineering qualification remains proposed.** RFC/ADRs remain Proposed; Xcode, device recovery and privacy/security implementation evidence remain outstanding. Graph planning does not authorize implementation readiness.
5. **P2 — Repository harness inspection unavailable.** Branch protections/enforcement were not qualified. `delete_branch_on_merge=false` was observed; any adoption change needs reviewed scope. Claims, registration and integration/promotion remain disabled.

Retain the existing authorized `nomed/7` selection and pinned Project-owned model. Resume from authoritative inspection when access is ready; then review exact additive field/view changes, validate native hierarchy and dependencies, attach acceptance/evidence to every item, and run a fresh scoped conformance review. This review does not recommend merge or declare Golden Path active.
