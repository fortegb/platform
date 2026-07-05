## 1. Etapa field

- [x] 1.1 Create single-select field `Etapa` with 9 options (`1 Contexto` … `9 Evolução`) via `gh project field-create`; capture field id + option ids
- [x] 1.2 Build the epic→Etapa map (script/data): #1,#146→4 · #67,#2→6 · Execução (#48 #56 #72 #86 #92 #81 #105 #134 #126 #98 #109 #113 #118 #122 #130 #42)→8 · historical Done (#4 #8 #20 #143)→1

## 2. Retag items

- [x] 2.1 Set `Etapa` on all 24 epics per the map
- [x] 2.2 For each epic, query its sub-issues and set each leaf's `Etapa` = epic's Etapa (leaves inherit)
- [x] 2.3 Verify: every board item (~171) has an `Etapa` value (count check, zero blanks)

## 3. Milestone v0

- [x] 3.1 Create native Milestone **`v0 — Definição`** (`gh api ... /milestones`)
- [x] 3.2 Assign `v0` to every Etapa 1–7 issue (Definição); leave Etapa 8/9 milestone-less

## 4. Native issue types

- [x] 4.1 Set type **Epic** on all 24 epics (`gh issue edit --type Epic`)
- [x] 4.2 Set leaf types: Feature (default), Bug, or Task (chore/infra/docs) per leaf; batch by epic

## 5. New Definição epics

- [x] 5.1 Create epic "Contexto & Funcionalidades: consolidação e validação" (Etapa 1–2, v0, type Epic, Todo)
- [x] 5.2 Create epic "Jornadas, telas e fluxos: re-validação pós-arquitetura" (Etapa 5, v0, type Epic, Todo)
- [x] 5.3 Add `**Depends on:** #146` to #42 (Platform environments)

## 6. Remove Phase

- [x] 6.1 Re-verify all items carry `Etapa` and the report generator no longer reads Phase (§7 done first if needed)
- [x] 6.2 Delete the `Phase` field via `gh project field-delete`

## 7. Platform docs overhaul

- [x] 7.1 New `scripts/etapa-labels.mjs` (passo heading/pill + Definição/Execução/Evolução grouping)
- [x] 7.2 Rewrite `scripts/generate-progress-report.mjs` to read `Etapa` + `Milestone` and group by stage/passo (drop `phase-labels.mjs` import)
- [x] 7.3 Create `docs/planning/mapa-metodo.html` — horizontal `.phase-track` per-passo (1–7) + `v0` progress bar + v1/v2/v3 cards (0%); remove `mapa-fases.html`
- [x] 7.4 Regenerate `progresso-socios.html`; update `index.html` (card → mapa-metodo, drop "V1 a V4"/Phase) and `arquitetura-decisoes.html` (de-Phase)
- [x] 7.5 Update pointers `mapa-fases.html → mapa-metodo.html` in planning `README.md` + `STATUS.md`

## 8. Validate

- [x] 8.1 `openspec validate migracao-a-etapa-e-docs`; board sanity (Etapa counts, v0 progress, types)
- [x] 8.2 pt-BR strict on new/edited docs; no product code touched; Platform docs render (preview/build)
