## Why

D-025 named "hotfix" as a sanctioned, explicit exception to the normal
staging-before-prod path but deferred the actual procedure to this leaf.
D-026 separated "close" from "promote" but didn't define what happens when
two changes are staged on `staging` at once. Both gaps close here.

## What Changes

- **Promotion granularity: one change at a time.** Closing a staged change
  promotes everything currently on `staging` to `main` (a property of how
  `rbo-close-change`'s merge works) — this is now an explicit decision, not
  an accidental side effect. Practically: avoid closing a staged change
  until everything else staged alongside it is also ready.
- **Hotfix mechanism:** branch `hotfix/<name>` from `main`; `rbo-close-change`
  (v0.5, shipped in `ai-skills`) recognizes the prefix and bypasses the
  staging requirement, merging straight to `main` — the same path
  non-CI/CD repos already use. Still goes through normal issue + OpenSpec
  tracking; only the staging step is skipped.
- **Mandatory staging sync:** immediately after a hotfix lands on `main`,
  merge `main`→`staging` — not optional, not left to memory. Prevents a
  later normal promotion from conflicting with or silently diverging from
  the hotfix.
- **Recording:** normal issue/OpenSpec/commit trail is sufficient per use.
  `decisions.md` records the procedure (this leaf, D-048), not every future
  invocation of it.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: adds promotion-granularity and hotfix-procedure
  requirements, extending its existing D-045/D-046/D-047 branch/deploy
  lifecycle content.

## Impact

- Docs only — `docs/planning/decisions.md` (new D-entry) + pointer in
  `environments.md`.
- Skill support already shipped separately in `ai-skills` v0.7.0
  (`rbo-create-change` 0.3, `rbo-close-change` 0.5) — this leaf records the
  platform-side decision that motivated it, no skill work here.
