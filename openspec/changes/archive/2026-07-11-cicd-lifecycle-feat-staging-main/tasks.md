## 1. Platform canon & config

- [x] 1.1 Add D-045 to `docs/planning/decisions.md` + append entry in `DECISIONS.md` (supersede D-026 close semantics; keep branch map)
- [x] 1.2 Add `.rbo/lifecycle.yml` with `integrationBranch: staging`
- [x] 1.3 Update `templates/environments.md` + Ambientes page for stage vs close, fail-if-missing-staging, pages:sync on close only
- [x] 1.4 Update `architecture.md`, `STATUS.md`, progress-focus, AGENTS as needed; CHANGELOG entry
- [x] 1.5 Sync delta into `openspec/specs/environment-tiers/spec.md` (or rely on archive sync — prefer apply-time sync if used elsewhere)

## 2. ai-skills companion (latest close baseline)

- [x] 2.1 Re-read current `rbo-close-change` on `ai-skills` `main` before editing; preserve unrelated steps (CHANGELOG required, pages:sync, ROADMAP)
- [x] 2.2 Add `rbo-stage-change` skill: `feat/*` → `integrationBranch`, no archive, issue open, fail if remote integration missing, no pages:sync
- [x] 2.3 Patch `rbo-close-change`: if lifecycle.yml present → archive then `integrationBranch`→default branch, fail-closed if not staged; if absent → unchanged
- [x] 2.4 Update `docs/rbo-change-lifecycle.md` (+ catalog/README pointers) for the two-step opted-in flow

## 3. Close-out prep

- [x] 3.1 Human validation
- [x] 3.2 Archive → merge with `Closes #166` (default close feat→main — `origin/staging` not required for this docs leaf; stage path needs #167)
