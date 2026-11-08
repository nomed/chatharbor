# Historical kickoff materialization proposal

The sequence below records the original 2026-11-07 plan. The native graph has since been created and extended; live work belongs in GitHub. Desktop-first direction from 2026-11-08 is RFC-0002; native tasks #18–#21 reuse the existing parents. The original iOS-first items are preserved as historical scope, not instructions to duplicate issues or continue Swift as the primary delivery path. Project-owned field activation remains blocked by #15.

---

# Proposed issue materialization sequence

**Planning only.** Do not submit this file as live governance state.

The scope introduces user-facing capability. By Golden Path Work Governance v3, start with a Product root instead of a stand-alone Engineering Epic.

| Order | Canonical item type | Proposed issue title | Parent |
| --- | --- | --- | --- |
| 1 | Outcome | Preserve independently readable conversations and critical connection recovery paths | None |
| 2 | Bet | User-initiated exports and external administrator contacts enable practical recovery | Outcome |
| 3 | Initiative | Deliver ChatHarbor v0.1 | Bet |
| 4 | Epic | Build portable conversation archive | Initiative |
| 5 | Epic | Build group and community continuity registry | Initiative |
| 6 | Epic | Establish recovery and data protection evidence | Initiative |
| 7 | Epic | Establish iOS engineering and Golden Path foundations | Initiative |
| 8 | Task | Qualify WhatsApp export fixtures, locales, truncation and media | Archive Epic |
| 9 | Feature | Import user-shared chat files into an immutable archive | Archive Epic |
| 10 | Feature | Verify external encrypted Vault export and clean restore | Recovery Epic |
| 11 | Feature | Record groups, admins, independent contacts and invitation options | Group continuity Epic |
| 12 | Task | Select Xcode/Swift/iOS matrix and build deterministic CI | Engineering Epic |
| 13 | Gate | Review threat model, data-handling policy and restore drill | Recovery Epic |

## Conditions for materialization

- Each work item needs a canonical type, owner classification, scope, measurable acceptance, dependency and evidence.
- Product items require the actual native hierarchy; reference numbers should be resolved after creation and verified.
- Do not treat the conceptual table as a substitute for Project-owned Work Type values.
- Each create must use an authorized, idempotent connector operation with preconditions and post-state comparison.
- No production implementation readiness until RFC/ADR decisions and user-facing tradeoffs are accepted.
