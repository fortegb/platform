# Handoff — fortegb/platform — 2026-07-10

## Context
Passo 4 (Arquitetura) epic #146. Cursor session closed the CI/CD **lifecycle contract** (#166 / D-045): stage vs close, opt-in `.rbo/lifecycle.yml`, and companion skills in `rbonon/ai-skills` (v0.6.0). Also fixed lifecycle.yml comments to en-US (code/config ≠ pt-BR).

## Control doc paths
- Decisions: `docs/planning/decisions.md` (+ root `DECISIONS.md` mirror entries)
- Session compass: `STATUS.md`
- Context: `agents.md` / `AGENTS.md`
- Planning: `docs/planning/` (Ambientes, templates/environments.md, progress-focus.md)
- This file: `docs/planning/handoff.md` (overwrite each handoff)

## Current state
**Done**
- #158–#165 (integrações + config) earlier in session
- #166 closed on `main` — D-045, `.rbo/lifecycle.yml`, environments/Ambientes/spec
- ai-skills [#5](https://github.com/rbonon/ai-skills/issues/5) closed; release [v0.6.0](https://github.com/rbonon/ai-skills/releases/tag/v0.6.0) — `rbo-stage-change` + `rbo-close-change` 0.3
- Language rule clarified: code/config comments **en-US**; UI/planning **pt-BR**

**In progress**
- Passo 4 remaining leaves #167–#172

**Blocked / watch**
- `origin/staging` **does not exist** → `rbo-stage-change` correctly **fails** until created
- Full `npm run pages:sync` may fail on `nuxt generate` 500; progress report scripts still work
- New skill symlink: run `setup_ai` / `dotfiles_update` if `~/.claude/skills/rbo-stage-change` missing

## Artifacts
- Issue closed: https://github.com/fortegb/platform/issues/166
- Config: `.rbo/lifecycle.yml` (`integrationBranch: staging`)
- Decision: D-045 in `docs/planning/decisions.md`
- Skills: `~/Documents/GitHub/rbonon/ai-skills` @ `v0.6.0`
- Lifecycle docs: `docs/rbo-change-lifecycle.md` (in ai-skills)
- Next issue: https://github.com/fortegb/platform/issues/167 — CI/CD: pipeline de deploy (branch→Vercel)
- Related: #168 migrations on merge · #169 promote/release staging→main

## Next session
**First action:** `rbo-catch-up` (L2) on `fortegb/platform`, then grill/propose **#167** (deploy pipeline branch→Vercel). While grilling, lock **when/how** remote `staging` is created (may be part of #167 or a sibling leaf — STATUS notes stage skill fails without it).

## Suggested skills
- `rbo-catch-up` (session open)
- `rbo-grilling` (before locking #167)
- `rbo-create-change` → propose/apply for #167
- After validation: default `rbo-close-change` until `origin/staging` exists; then stage→close per D-045
