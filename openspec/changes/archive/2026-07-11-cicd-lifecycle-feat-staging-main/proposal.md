## Why

D-026 specified staging-before-prod and an opt-in lifecycle config, but assumed **close** would land on `staging` while `rbo-close-change` still merges to `main`. Grilling for #166 locked a clearer split: **stage** lands on integration without finishing the change; **close** archives and ships to `main` (issue Done). Without that contract + ForteGB opt-in file + skill updates, agents will keep closing straight to prod or archive too early.

## What Changes

1. **D-045** — supersede the close semantics of D-026: `rbo-stage-change` → `staging` (no archive, issue open); `rbo-close-change` → archive + `staging`→`main` + `Closes`/Done when lifecycle config present; default (no config) unchanged (`feat/*`→`main`).
2. **Add** `.rbo/lifecycle.yml` with `integrationBranch: staging` (opt-in signal for skills).
3. **Revise** environments template / Ambientes / architecture / STATUS / DECISIONS pointers so docs match the two-skill flow (fail if `origin/staging` missing; `pages:sync` only on close; board Status stays In Progress after stage — no new Status option in this cut).
4. **OpenSpec** — update `environment-tiers` requirements for stage vs close and the opt-in config meaning.
5. **ai-skills (companion, same DoD):** new `rbo-stage-change`; minimal lifecycle-gated edit to latest `rbo-close-change` (fail-closed if config present but not staged). Implemented in the `ai-skills` repo after this platform contract is approved — not mixed into unrelated close features.

**Out of scope:** create remote `staging` branch (#167); promote ceremony / hotfix runbook (#169); board Status option `Staging`; `rbo-product-release` changes.

## Capabilities

### New Capabilities

<!-- none — extends environment-tiers -->

### Modified Capabilities

- `environment-tiers`: replace “close merges to integration branch” with stage-then-close; redefine opt-in `integrationBranch` as land target + close merge *source*; keep default close→`main` when config absent.

## Impact

- **Docs / config:** D-045, `.rbo/lifecycle.yml`, `templates/environments.md`, Ambientes page, `architecture.md`, `STATUS.md`, root `DECISIONS.md`, `CHANGELOG.md`, progress-focus / AGENTS as needed.
- **OpenSpec:** delta on `environment-tiers`.
- **ai-skills:** `rbo-stage-change` (new) + guarded `rbo-close-change` (baseline: current `main` @ `c592594` / pages:sync step — re-read before edit).
- **Repos without lifecycle file:** no behavior change.
