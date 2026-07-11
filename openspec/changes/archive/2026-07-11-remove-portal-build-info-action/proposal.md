## Why

`.github/workflows/portal-build-info.yml` is a redundant, independently-firing
backup for `docs/assets/build-info.json` refresh. The local git hook already
handles this correctly on every docs commit, in the same push — it never
races with itself. The Action's async, separate push repeatedly raced with
normal session activity on 2026-07-11, causing several trivial but
disruptive merge conflicts in that one file.

## What Changes

- Delete `.github/workflows/portal-build-info.yml`.
- No change to the local git hook or `npm install` prepare step — both stay,
  and remain the sole mechanism keeping `build-info.json` fresh.
- Update `AGENTS.md`'s "Platform docs" section: three-layer description →
  two-layer.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
<!-- none — pure CI/tooling housekeeping, no product capability changes -->

## Impact

- `.github/workflows/portal-build-info.yml` — deleted.
- `AGENTS.md` — "Platform docs" section updated.
- Accepted trade-off: a push from an un-bootstrapped clone (where
  `npm install`'s `prepare` hook install never ran) would no longer have a
  backup catching a stale `build-info.json`. Narrow gap, judged acceptable
  versus the repeated friction of keeping the Action.
