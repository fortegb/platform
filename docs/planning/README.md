# Planning — ForteGB

> Canon de design e sequenciamento. **Fase 0 (produto/stack) concluída** — próximo: Epic **Arquitetura da solução & ambientes** ([#146](https://github.com/fortegb/platform/issues/146), definição de infra/ambientes/integrações), que precede o build.

---

## Start here

| Ordem | Ação | Doc |
|-------|--------|-----|
| 1 | `rbo-catch-up` + ler **STATUS.md** | [`../../STATUS.md`](../../STATUS.md) |
| 2 | GitHub org migration Fase A | [`github-org-migration.md`](./github-org-migration.md) |
| 3 | Bootstrap board + OpenSpec | [`workflow.md`](./workflow.md) |
| 4 | **`rbo-create-change`** no Epic #146 (Arquitetura da solução & ambientes) | [`decisions.md`](./decisions.md) |

**Decisões de produto/stack fechadas** (D-015..D-022). O que resta é `deferred` (tours/media/mobile) e a **definição de infra/ambientes** (#146). O histórico de grilling está em [`open-questions.md`](./open-questions.md).

**Documentação da plataforma:** HTML estático em [`../`](../index.html) no GitHub Pages ([fortegb.github.io/platform](https://fortegb.github.io/platform/)) — planejamento para sócios; **não** é o produto Nuxt nem portais logados (corretor/staff). **Todo o conteúdo sócios = pt-BR.**

---

## Índice

| Documento | Conteúdo |
|-----------|----------|
| [company-structure.md](./company-structure.md) | **Pessoas, papéis operacionais, governo, corretores** (interno) |
| [progress-focus.md](./progress-focus.md) | **Foco atual (Ricardo)** — editável; alimenta relatório de progresso |
| [../index.html](../index.html) | **Documentação da plataforma** — índice GitHub Pages: mocks, progresso, planning HTML |
| [jornadas-plataforma.md](./jornadas-plataforma.md) | **Jornadas e funcionalidades** — estado-alvo por usuário |
| [jornadas-plataforma.html](./jornadas-plataforma.html) | Jornadas — versão gráfica |
| [screen-map.md](./screen-map.md) | **Mapa de telas MVP** — rotas por papel (canon) |
| [screen-map.html](./screen-map.html) | Mapa de telas — versão gráfica (gerado) |
| [mapa-fases.html](./mapa-fases.html) | **Mapa por fases** — visão macro Fases 0–4 + módulos |
| [modules.md](./modules.md) | **Módulos de produto** — canon editável |
| [modules.html](./modules.html) | **Módulos da plataforma** — detalhe por área (gerado de `modules.md`) |
| [progresso-socios.html](./progresso-socios.html) | **Relatório de progresso** — epics/issues do board (gerado) |
| [apresentacao-socios.md](./apresentacao-socios.md) | **Apresentação sócios** — snapshot; refresh sob pedido |
| [apresentacao-socios.html](./apresentacao-socios.html) | **Apresentação gráfica** — browser / PDF |
| [apresentacao-corretores.html](./apresentacao-corretores.html) | **Apresentação corretores** — seções dedicadas (TBD deck próprio) |
| [corretor-contract-template.md](./corretor-contract-template.md) | Rascunho contrato corretor (v0.1) |
| [corretor-contract.html](./corretor-contract.html) | Contrato v0.1 — HTML (gerado) |
| [deliverables.md](./deliverables.md) | **Mapa produto ↔ epics** (checklist negócio) |
| [platform-vision.md](./platform-vision.md) | Visão + stack **confirmada** (D-015..D-022) |
| [architecture.md](./architecture.md) | Arquitetura & MVP — **preenchido** (D-015..D-022) |
| [phases.md](./phases.md) | Epics + sub-tarefas Fases 0–4 |
| [open-questions.md](./open-questions.md) | Backlog grilling (Q-001–Q-019) — **resolved/deferred** |
| [decisions.md](./decisions.md) | Decisões fechadas (D-001–**D-022**) |
| [workflow.md](./workflow.md) | Board, OpenSpec, session open/close |
| [github-org-migration.md](./github-org-migration.md) | Runbook org + dotfiles |
| [setup-mac-mini.md](../setup-mac-mini.md) | Checklist Mac Mini pós-migração |

---

## Regras

- **Board** = execução · **`docs/planning/`** = pensamento · **OpenSpec** = 1:1 sub-issue folha
- **`ROADMAP.md`** = gerado; não editar à mão
- **`STATUS.md`** = bússola de sessão
