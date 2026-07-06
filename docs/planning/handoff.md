# Handoff — fortegb/platform — 2026-07-06

## Context
Session established the project's governing spine and migrated the board + Platform docs onto it. Two changes shipped end-to-end (issue → OpenSpec → apply → archive → merge → close):
- **#173 Roteiro do projeto** — the 9-step / 3-stage spine (Definição 1–7 · Execução 8 · Evolução 9) with gates G1/G2/G3, as the controlling structure (not a doc). Concept renamed **Método → Roteiro**; passo 7 **Quebra → Versionamento**; passo 8 = **Execução**.
- **#174 Migração A** — applied the board model (D-024) and overhauled the Platform docs.

## Control doc paths
- Decisions: `docs/planning/decisions.md` (D-023 spine+gates, D-024 board model)
- Spine canon: `docs/planning/roteiro.md`
- Session compass: `STATUS.md` (refreshed this session)
- Context/rules: `agents.md` §9 (refreshed)
- Planning: `docs/planning/` · ROADMAP.md = generated mirror (do not hand-edit)

## Current state
**Done:**
- Board on the Roteiro model: field **`Etapa`** (9 passos, ex-`Phase` which was deleted), ~173 items retagged; Milestone **`v0 — Definição`** on all Etapa 1–7 items (~48%); native issue types (Epic/Feature/Task).
- 2 new Definição epics: #175 (Contexto & Funcionalidades, Etapa 1–2), #176 (Jornadas re-validação, Etapa 5). #42 → `Depends on #146`.
- Platform docs rebuilt and **live on GitHub Pages**: `mapa-fases.html` → `mapa-roteiro.html` (per-passo track, 3 estágio bands, G1/G2/G3 defined+shown, live v0 bar); report grouped by Etapa (`etapa-labels.mjs`, rewritten `generate-progress-report.mjs`).
- Repo clean, on `main`, all pushed (`38dbf7c`); no active OpenSpec changes; merged feat branches deleted.

**In progress:** Passo 4 — Arquitetura (Epic #146, 26 leaves #147–172). Passos 1–2 validation (#175) can run in parallel.

**Deferred:** Migração B (Milestones v1/v2/v3 + version assignment) → done at passo 7 (Versionamento). Build (passo 8: #48/#56) gated by G2 until Definição (passos 4–6) closes.

## Artifacts (reference only)
- Board: https://github.com/orgs/fortegb/projects/1
- Live docs: https://fortegb.github.io/platform/ · planning/mapa-roteiro.html
- Archived changes: `openspec/changes/archive/2026-07-05-metodo-projeto-espinha/`, `.../2026-07-05-migracao-a-etapa-e-docs/`
- Spec: `openspec/specs/project-method/spec.md`
- Next leaf issue: https://github.com/fortegb/platform/issues/147 (A1 — Ambientes: tiers local/staging/prod)

## Next session
Start **passo 4 / #146 leaf A1** — "Ambientes: definir tiers local/staging/prod" (#147) via `rbo-create-change`. (Optionally kick off #175 contexto validation in parallel.)

## Machine setup on new computer
- `git pull` (or fresh clone) is enough to continue the architecture work — no build/node_modules needed for the grilling.
- `npm install` only if fresh clone (deps not committed) or to install git hooks / run the Nuxt app. `package.json` unchanged this session.

## Suggested skills
- `rbo-catch-up` (session open — reads STATUS.md)
- `rbo-create-change` (start #147)
- `rbo-grilling` (passo 4 area A grilling)
