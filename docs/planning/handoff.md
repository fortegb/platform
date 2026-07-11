# Handoff — fortegb/platform — 2026-07-10

**Updated:** 2026-07-10T23:46:00-03:00
**Status:** active

> Advisory only. Board + STATUS.md win. Catch-up always reads this if Status is not `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use (offer commit).

## Context
Passo 4 (Arquitetura) epic #146. Cursor session closed the CI/CD **lifecycle contract** (#166 / D-045): stage vs close, opt-in `.rbo/lifecycle.yml`, and companion skills in `rbonon/ai-skills` (v0.6.0+). Lifecycle.yml comments → en-US. Handoff-in-repo sealed as [ai-skills v0.6.3](https://github.com/rbonon/ai-skills/releases/tag/v0.6.3) (#8) — no TTL; consume on catch-up.

## Control doc paths
- Decisions: `docs/planning/decisions.md` (+ root `DECISIONS.md` mirror entries)
- Session compass: `STATUS.md`
- Context: `agents.md` / `AGENTS.md`
- Planning: `docs/planning/` (Ambientes, templates/environments.md, progress-focus.md)
- Handoff: `docs/planning/handoff.md`

## Current state
**Done**
- #158–#165 (integrações + config) earlier in session
- #166 closed on `main` — D-045, `.rbo/lifecycle.yml`, environments/Ambientes/spec
- ai-skills [#5](https://github.com/rbonon/ai-skills/issues/5) / [v0.6.0](https://github.com/rbonon/ai-skills/releases/tag/v0.6.0) — stage + close
- ai-skills [#8](https://github.com/rbonon/ai-skills/issues/8) / [v0.6.3](https://github.com/rbonon/ai-skills/releases/tag/v0.6.3) — Handoff file in repo
- Language rule: code/config comments **en-US**; UI/planning **pt-BR**

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
- Skills: `~/Documents/GitHub/rbonon/ai-skills` @ `v0.6.3`
- Handoff guide: `docs/rbo-session-handoff.md` (in ai-skills)
- Next issue: https://github.com/fortegb/platform/issues/167 — CI/CD: pipeline de deploy (branch→Vercel)
- Related: #168 migrations on merge · #169 promote/release staging→main

## Next session
**First action:** `rbo-catch-up` (L2) on `fortegb/platform`, then grill/propose **#167** (deploy pipeline branch→Vercel). While grilling, lock **when/how** remote `staging` is created (may be part of #167 or a sibling leaf — STATUS notes stage skill fails without it).

## Suggested skills
- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-grilling` (before locking #167)
- `rbo-create-change` → propose/apply for #167
- After validation: default `rbo-close-change` until `origin/staging` exists; then stage→close per D-045
