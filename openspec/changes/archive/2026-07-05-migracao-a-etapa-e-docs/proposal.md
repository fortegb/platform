## Why

D-024 defined the board model (Etapa field + Milestones + native types) but did not apply it — the board still uses the legacy `Phase` (0–4) field and the Platform docs still render "Fases 0–4", contradicting the new canon (`metodo.md`). This change executes that migration so the método spine becomes the live, queryable structure and the Platform docs stop misleading the sócios. It is the "migração A" referenced by D-024.

## What Changes

**Board (implements D-024):**
- **New single-select field `Etapa`** with 9 options (`1 Contexto` … `9 Evolução`). Created fresh (not by mutating `Phase`, which is destructive and option-editing is awkward via API).
- **Retag all ~171 items** by a per-epic map (leaves inherit their epic's Etapa): `#1`,`#146`→4 · `#67`,`#2`→6 · Execução epics (`#48` `#56` `#72` `#86` `#92` `#81` `#105` `#134` `#126` `#98` `#109` `#113` `#118` `#122` `#130` `#42`)→8 · historical Done (`#4` `#8` `#20` `#143`)→1 (bulk). The map is not a Phase formula (e.g. `#146` is Phase 1 but Etapa 4).
- **Delete `Phase`** field last, after every item carries an Etapa. **BREAKING** for anything referencing Phase (only the report generator, updated here).
- **New Milestone `v0 — Definição`** assigned to all Etapa 1–7 items; its 100% is the G2 signal. (Milestones v1/v2/v3 deferred to migração B.)
- **Backfill native issue types**: epics → Epic; leaves → Feature/Task/Bug.
- **2 new epics**: contexto+funcionalidades (Etapa 1–2) and jornadas re-validação (Etapa 5), both under `v0`.
- `#42` gets a `**Depends on:** #146` line (environments are built after architecture defines them).

**Platform docs (overhaul):**
- Rewrite `scripts/generate-progress-report.mjs` + new `scripts/etapa-labels.mjs` to group by **Etapa + Milestone** instead of Phase.
- **Retire `mapa-fases.html` → new `mapa-metodo.html`**: horizontal per-passo track (reusing the `.phase-track` visual), `v0` progress bar, and v1/v2/v3 cards (0% until migração B).
- Regenerate `progresso-socios.html`; de-Phase `index.html` and `arquitetura-decisoes.html`.

## Capabilities

### New Capabilities
<!-- none — this change implements the existing project-method spec (board model); no new requirements -->

### Modified Capabilities
- `project-method`: the "Board model representing the método" requirement's deferred action (field/milestone/type creation + retag "performed by a separate board-migration change") is executed here; scenario updated from *defined* to *applied*.

## Impact

- **Board:** field topology (Etapa replaces Phase), ~171 item retags, native types on ~171 issues, 1 milestone, 2 new epics. Reversible-ish (fields recreatable) but touches every item.
- **Scripts/docs:** `generate-progress-report.mjs`, new `etapa-labels.mjs`, `mapa-metodo.html` (new), `mapa-fases.html` (removed), `progresso-socios.html` (regen), `index.html`, `arquitetura-decisoes.html`. Planning README/STATUS pointers to `mapa-fases.html` updated to `mapa-metodo.html`.
- **No product code.** No app behavior change.
