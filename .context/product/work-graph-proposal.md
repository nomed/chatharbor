# ChatHarbor work graph — proposed, not applied

The canonical Golden Path work model is Product `Outcome → Bet → Initiative → [Epic] → Engineering work`. Native GitHub parent relations and an authorized Project-owned `Work Type` field must be configured before declaring conformance. This file is a planning proposal only; live work state belongs in GitHub.

## Proposed graph

- **Outcome:** Users retain independently accessible communication evidence and documented recovery routes for critical groups after losing account access.
  - **Bet:** Explicit iPhone exports plus independently reachable administrators make recovery preparation feasible without unsupported WhatsApp access.
    - **Initiative:** Deliver ChatHarbor v0.1 independent archive and group recovery registry.
      - **Epic — Archive ingestion**
        - Feature: iOS share-extension file import
        - Task: Export format fixture research and truncation tests
        - Feature: Immutable source, checksum manifest, offline viewer
      - **Epic — Group continuity**
        - Feature: Group/community registry
        - Feature: External administrator contacts and invitation verification
        - Feature: Guided new-number recovery checklist
      - **Epic — Secure portability**
        - Task: Threat model and privacy boundaries
        - Feature: Portable vault export and integrity validation
        - Gate: Restore drill on synthetic data
      - **Epic — Engineering foundation**
        - Task: Swift/iOS baseline, CI and signing strategy
        - Task: Golden Path GitHub connector and Project-owned work model setup
        - Gate: Golden Path adoption report and policy readiness review

## Planning assumptions

- **Ownership:** Product and Engineering for new end-user capabilities; Engineering for the bounded tooling/CI tasks once product boundaries are accepted.
- **Readiness:** DEFINITION; not implementation-ready until RFC/ADR decisions and acceptance criteria reviewed.
- **Project:** None currently authorized in adopter manifest. Establish Project ownership first and validate native parent relations.
- **Harness:** Claims, registration and integration/promotion remain disabled until separately selected, protected and verified.
- **Initial milestone candidate:** v0.1 feasibility (not committed).
- **Evidence:** Synthetic data only for public issues and CI fixtures.

## Preflight required before applying

1. Pin an immutable upstream Golden Path source and validate adopter manifests against it.
2. Run GitHub connector read-only preflight and capture findings.
3. Select authorized GitHub Project, verify Work Type and required fields.
4. Build and seal a canonical operation plan with preconditions and digest; obtain authorization for exact delta.
5. Create work items and native hierarchy through the connector, then inspect and compare post-state.
