# ChatHarbor product brief

**Status:** Proposed

## Outcome hypothesis

People at risk of losing access to a messaging account can retain independently readable user-exported conversation records and an actionable, documented route to reconnect with important groups.

## Boundaries

An independent archive does not guarantee all messages, full media history, or restored group memberships. WhatsApp account bans cannot be bypassed. Group rejoin depends on available invitations, platform policy and administrators. iOS prevents continuous complete third-party access to WhatsApp's private data.

## Candidate Outcome metrics (not commitments)

- Percentage of user-identified critical groups with at least one independently reachable administrator.
- Percentage of imported snapshots whose original file and hash can be successfully verified.
- Percentage of recovery drills that open archived content without a working WhatsApp session.
- Time to reconstruct a critical group contact plan from the Vault.

## Discovery questions

- Which chat export formats/regions/media variants are supported on contemporary iOS?
- What are actual user expectations for what is and is not recoverable?
- What storage/cipher options can be implemented entirely on iPhone?
- What personal-data protections and consent model are required for third-party conversations?

## Desktop-first direction — 2026-11-08

Owner devices: iPhone and Mac. Product constraint: zero software/store/cloud spend. Primary acquisition hypothesis is local device backup, not manual per-chat export; qualify it before promising completeness. Target desktop platforms are macOS/Windows/Linux, with shared React UI and a Rust host plus replaceable parsing/acquisition. Native Swift PR #17 remains an isolated spike. Browser access is a later companion for existing archives. See RFC-0002 for scope and explicit gates. Outcome and independent encrypted recovery requirements remain unchanged.
