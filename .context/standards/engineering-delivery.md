# Engineering delivery profile — kickoff

Date: 2026-11-07. Owner: @nomed. Work: #12/#16. Applies the existing Golden Path; this is its local iOS engineering profile, not a replacement work model.

## Branches, agents and authority

Use an issue-scoped `feat/<issue>-<scope>` or `fix/<issue>-<scope>` branch and one isolated worktree per active task/agent. Record issue, branch, base SHA, scope and exact validation commit in the PR. No force pushes, implicit branch cleanup, direct implementation pushes to main or shared worktree editing. A single agent performs this kickoff. Future parallel work requires explicit delegation, disjoint scope and worktrees; claims and branch registry are disabled until their native protocol is qualified.

Current delivery is scoped PRs targeting main. `development` does not exist and integration/promotion is disabled in both manifests. Do not silently introduce a substitute promotion scheme. Any activation of the canonical development → main protocol needs a reviewed decision, upstream checks and explicit protection authorization. Existing bootstrap branch is retained.

Maintainer @nomed holds review/merge authority. The author reports checks and limitations; it cannot certify its own security gate or human acceptance. This kickoff opens a draft PR and does not merge. CI is configured on the PR but not required/enforced by branch protections. The branch API reports main `protected:false`; ruleset list is empty; detailed protection read is denied 403. Do not infer administrative transport capability from normalized repository `admin:true` metadata.

## RFC/ADR lifecycle and security gates

Use the statuses and precedence already declared in `.context/manifest.yaml`. RFC-0001 and ADR-0001..0005 remain Proposed; human acceptance must reference the reviewed decision and evidence. Accepted records are immutable; use a superseding record for material change. Issues and PRs link decisions but do not accept them.

No real exports, invite URLs, phone numbers or keys in GitHub, CI artifacts or Pages. Keep Pages documentation-only. Only synthetic fixtures run in CI. No signing secrets needed for unsigned simulator builds. Release signing is a separate authorized setup. Security gate #14 requires independent review of key custody, iOS file protection, App Group isolation, data retention, malformed input, ZIP extraction limits, recovery and privacy. Experimental upstream mechanisms and sensitive protections remain disabled.

## Validation and Definition of Done

A task is done only when its acceptance criteria have evidence on the reviewed commit, relevant negative tests pass, user-facing limits are explicit, decision links and native parent/dependencies are verified, and a maintainer reviews the PR. No blanket closure of parent initiatives when a scaffold lands. Required security/device gates stay open until exercised.

CI selects Xcode 26.0 on macos-15, records actual Xcode/Swift versions, tests Swift package integrity/encryption, decrypts a Swift-produced synthetic Vault using independent Python, then generates and builds unsigned iOS app/extension. iOS 17 is a provisional minimum awaiting device compatibility evidence. XcodeGen comes from Homebrew; its observed version is logged, but not yet dependency-locked. This is a tracked reproducibility limitation, not an assertion of deterministic production builds.

Synthetic coverage now targets raw-byte preservation, known SHA-256 vector, unsafe names, oversize input, manifest tampering, unknown versions, nonce freshness, wrong recovery key and AEAD tampering. #9 extends locale/truncation/ZIP fixtures; #10 owns end-to-end sharing, media inventory and duplicate behavior. A macOS CI pass is not an iPhone test. #14 requires a real-device share import, external destination retrieval and restore without source phone/account.
