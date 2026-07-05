## Why

The project started at execution (generated scaffold, mocks, build epics) and has been backfilling its definition ever since — the root of repeated rework and wrong assumptions ("started on a bad foot"). There is no explicit, controlling spine that both orders the work (context → features → components → architecture → journeys → design → breakdown → build → maintain) and gates *when* it is legitimate to build. Today's "Phase 0–4" board field is a crude, ambiguous stand-in that conflates lifecycle stage with deliverable bundle. This change establishes the **Método** as the governing spine, tracked structurally on the board rather than in prose or human memory.

## What Changes

- **New canonical doc `docs/planning/metodo.md`** — the 9-step método in 3 stages (Definição 1–7 · Execução 8 · Evolução 9): per step purpose, entry/exit, canonical artifact, and how grilling + change management apply.
- **Gates defined**: **G1** (Definição sequence — passo N opens after N−1 closes; declared parallels excepted), **G2** (no Execução work starts until all of Definição / passos 1–7 is closed; active gate = 4–6), **G3** (version N+1 starts after version N passes its readiness gate). Enforcement is doc + `rbo-create-change` check + STATUS-derived "próximo passo"; GitHub cannot hard-block a Status transition, so gates control *state visibility*, not clicks (optional Action deferred).
- **Board model recorded** (implemented by a later migration, not here): **BREAKING** the `Phase` field (0–4) is superseded by an `Etapa` single-select field with **9 options** (1 Contexto … 9 Evolução); the 3 stages are groupings derived from the passo, not a separate field. Native **Milestones** (v0 Definição → v1 → v2 → v3): v0 groups all Etapa 1–7 issues and its 100% completion is the visible G2 green light. Native **issue types** adopted (Feature/Bug/Task/Epic — option A), replacing reliance on the `Epic:` title prefix.
- **Decisions recorded**: **D-023** (método as controlling spine + gates + no-sprints/no-hard-gate rationale) and **D-024** (board model: Etapa field + Milestones + native types, supersedes Phase 0–4).
- **Wiring**: pointers to `metodo.md` from planning `README.md`, `agents.md` §9, and `STATUS.md`.
- **Draft-mark** `jornadas-plataforma.md` and `screen-map.md` as requiring re-validation after passo 4 (Arquitetura, #146) — they were authored mock-first, before architecture closed.

### Out of scope (separate, tracked changes)

- **Board migration** — actually creating the Etapa field/Milestones/types, retagging ~171 items, and adding the 2 new epics (contexto+funcionalidades, jornadas re-validation).
- **Progress-report overhaul** — `mapa-metodo.html` (horizontal per-passo track + v0/v1/v2/v3 cards) and regenerated `progresso-socios.html`.

## Capabilities

### New Capabilities
- `project-method`: the método spine as governance — the 9 steps/3 stages, the G1/G2/G3 gates, the board model (Etapa field + Milestones + native types) that represents it, and how grilling + change management drive each step.

### Modified Capabilities
<!-- none — no existing spec's requirements change; platform-architecture and crm-source-of-truth are unaffected -->

## Impact

- **Docs (canon):** new `docs/planning/metodo.md`; edits to `decisions.md` (D-023, D-024), planning `README.md`, `STATUS.md`, `jornadas-plataforma.md`, `screen-map.md` (draft banners).
- **Repo rules:** `agents.md` §9 (método pointer + native-issue-types convention, superseding the Type=Feature/Bug/Chore note).
- **Board (defines now, migrates later):** `Phase` → `Etapa` field; native Milestones v0–v3; native issue types. No item retag in this change.
- **No product code touched.** No behavior change to the app.
