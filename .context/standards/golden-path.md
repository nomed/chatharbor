# Golden Path adoption profile — ChatHarbor

**Status:** Proposed · **Date:** 2026-11-07

## Immutable provenance

- Canonical owner per upstream scope decision: `retex-iconic/golden-path`.
- Mirror consulted: `nomed/golden-path`.
- Reviewed snapshot: `7d4d17ad2aff5bbb9eddc688ec9b4bd46c11e316` (same Git commit observed in both repositories).
- Both source repositories are **private** as of this review. Access to them is *not* a prerequisite for a public ChatHarbor contribution.
- This document and `AGENTS.md` carry the **self-contained local operating rules**. This repository does not redistribute upstream source code or pretend to embed a complete Golden Path release.
- Upstream tools, exact schemas, Project provisioning, and formal status reports are **not available to anonymous contributors**. Maintainers must provide an accessible licensed distribution or execute those checks in a protected environment and publish sanitized receipts before claiming formal conformance.

## Public contribution contract

1. Repository source code, application tests and source control establish implemented behavior.
2. Accepted ADRs and RFCs establish durable technical choices. Proposed records do not bind.
3. GitHub Issues/PRs establish live work and review state, not accepted architecture.
4. User-facing capability changes require Product decision ownership and traceability: Outcome → Bet → Initiative → Engineering work. Engineering-only maintenance can have a dedicated technical root.
5. Use scoped, reviewable PRs. Never merge an unreviewed PR or rewrite an accepted decision in place. Do not self-claim a passing gate.
6. Never upload actual chat exports, contact data, group invite links, keys or secrets to public repository artifacts.
7. Clearly distinguish implemented, proposed, tested and unsupported capabilities.
8. Preserve user-generated archives and perform recovery testing before asserting loss resilience.

## Proposed adoption

| Capability | Declared | Observed / enforced |
| --- | --- | --- |
| Repository context (`AGENTS.md`, manifest, ADR/RFC) | Proposed | Official scoped report collected on PR commit `3c03190`; declarations only |
| Issue governance / GitHub Project Work Type | Proposed | Selected `nomed/7` in draft manifest; fields and native hierarchy unverified |
| Product-to-Engineering traceability | Proposed | Work graph only; no native issue hierarchy |
| Context routing | Deferred | Not operational |
| Atomic claims and protected orphan registry | Deferred | Disabled |
| Work-branch registration / worktree isolation enforcement | Deferred | Disabled |
| `development → main` promotion | Deferred | Disabled |
| Swift/iOS engineering baseline | Proposed | Documented locally; CI not yet qualified |

## Validation and activation plan

1. Verify upstream pin and permission to distribute any selected subset; do not copy private policy text without authorization.
2. Validate adopter manifests against matching upstream schemas in a trusted maintainer environment. Record exact command, dependency versions, source SHA, findings and limits.
3. Choose and authorize a GitHub Project. Inspect Project-owned `Work Type`, hierarchy and field mapping before creating a canonical work graph.
4. Run the official read-only Golden Path adoption/status report from the same pinned runtime, using the checked branch and repository.
5. Establish Xcode / Swift tests and GitHub branch protection gates before enabling integration/promotion or agent execution claims.
6. Document any intentional deviations, with owner and reevaluation condition.

## Evidence gaps

- An official isolated runtime and scoped adoption/status report now exist; the full GitHub manifest schema was validated by the pinned connector. See `.context/evidence/2026-11-07-project-review.md` for commands and limits. This does not prove Project or Harness conformance.
- Project `nomed/7` selected by owner and recorded on draft branch; no Project API inspection, native Work Type/parent hierarchy or work-item mapping verified.
- No protected coordination registry; no branch protections or PR gate qualification.
- A public contributor cannot inspect the private upstream contracts; ChatHarbor's local rules remain usable independent of those private materials.

**Never describe configuration presence as an enabled and enforced Golden Path.**

## Operational kickoff update — 2026-11-07

PR #1 is merged. The native work graph now exists (#2–#16): 14 parent links, 6 dependencies and 15 nomed assignees were read back. Earlier table entries describe the pre-kickoff snapshot. Intended issue-body types do not replace blocked Project Work Type classification. The current detailed matrix is in [kickoff evidence](../evidence/2026-11-07-kickoff.md); [engineering delivery](engineering-delivery.md) applies this Golden Path to the iOS qualification branch. Claims, registration and integration/promotion remain disabled. A draft iOS foundation PR is not full conformance or an accepted production baseline.
