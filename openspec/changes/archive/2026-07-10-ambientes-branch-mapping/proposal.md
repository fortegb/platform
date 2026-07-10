## Why

A1 locked the three logical environments but not how **git branches** map onto them. Without that map, close-out still merges to `main` while the environments contract says staging-before-prod — agents and humans will disagree. Issue #148 (A2) writes the branch ↔ environment contract (and an opt-in lifecycle config **spec** for later skill work) so Vercel topology (#149), domains (#150), and CI (#166) share one vocabulary.

## What Changes

Document (definition only — no pipeline/skill code in this change):

1. **Long-lived branches:** `main` → `prod` · `staging` → `staging` · `feat/*` (and `fix/*`) → Preview using **staging-class** backends (still logical staging, not a fourth name).
2. **Promotion path:** normal = `feat/*` → merge to `staging` → later promote `staging` → `main`. Hotfix to `main` remains exceptional (procedure later).
3. **Close vs promote:** normal change close **should** land on `staging`; promote to prod is a **separate** step (not automatic in Vercel).
4. **Lifecycle config contract (opt-in):** specify a small repo config (e.g. `integrationBranch: staging`) so a **future** `rbo-close-change` update (#166) can override merge target; **default remains `main`** when config absent — skill stays agnostic across products. **No skill code in this change.**
5. Update environments template + Ambientes Platform docs page; D-entry; STATUS notes temporary gap (skill still → `main` until #166).

**Out of scope:** implementing skill read, Vercel project setup, domains, full promote runbook, creating remote `staging` branch.

## Capabilities

### New Capabilities
<!-- none — extends environment-tiers -->

### Modified Capabilities
- `environment-tiers`: add branch ↔ environment mapping, Preview→staging-class backends, close→integration branch vs promote-to-prod separation, and the opt-in lifecycle config contract (spec only).

## Impact

- **Docs:** `decisions.md` (next D-entry), `templates/environments.md`, `ambientes.html`, `architecture.md`, `STATUS.md`, root `DECISIONS.md`, `CHANGELOG.md`.
- **OpenSpec:** delta on `environment-tiers`.
- **#166 DoD input:** config file shape + default behavior documented.
- **No** `ai-skills` code change; **no** cloud/git remote provisioning.
