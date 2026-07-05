## 1. metodo.md — the spine

- [x] 1.1 Create `docs/planning/metodo.md`: header + the 9 steps in 3 stages (Definição 1–7 · Execução 8 · Evolução 9), each with purpose, entrada/saída, artefato canônico
- [x] 1.2 Document gates G1 (sequência Definição), G2 (build só após passos 1–7; ativo 4–6), G3 (versão N+1 após readiness de N), incl. soft-enforcement note (doc + rbo-create-change + STATUS; sem hard-gate Action)
- [x] 1.3 Document the board model: Etapa single-select (9 opções, ex-Phase) + Milestones v0 Definição→v1→v2→v3 + native issue types (Feature/Bug/Task/Epic); stages derived from passo; version placement ratified em passo 7 (no-Milestone = fila)
- [x] 1.4 Document how grilling + change management drive each step, and that este change não executa a migração (aponta migração A/B + overhaul do relatório como changes seguintes)

## 2. Decisions

- [x] 2.1 Add **D-023** (método como espinha controladora + gates G1/G2/G3 + no-sprints/no-hard-gate rationale) to `docs/planning/decisions.md`
- [x] 2.2 Add **D-024** (modelo de board: Etapa field + Milestones v0–v3 + native types option A; supersede Phase 0–4) to `decisions.md`

## 3. Wiring

- [x] 3.1 Add `metodo.md` pointer to `docs/planning/README.md` (índice/ordem de arranque, como spine)
- [x] 3.2 Add método pointer + native-issue-types convention (Feature/Bug/Task/Epic) to `agents.md` §9, superseding the Type=Feature/Bug/Chore note
- [x] 3.3 Update `STATUS.md` to reference the método spine as the session compass (próximo passo derivado da Etapa)

## 4. Draft-mark stale artifacts

- [x] 4.1 Add draft banner to `docs/planning/jornadas-plataforma.md` — re-validar após passo 4 (Arquitetura, #146)
- [x] 4.2 Add draft banner to `docs/planning/screen-map.md` — re-validar após passo 4 (#146)

## 5. Validate

- [x] 5.1 Run `openspec validate metodo-projeto-espinha` and fix any issues
- [x] 5.2 Confirm pt-BR strict across new/edited docs (no pt-PT); confirm no product code touched
