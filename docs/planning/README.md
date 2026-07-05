# Planning — ForteGB

> Canon de design e sequenciamento. **A espinha é o [Método](./metodo.md)** — 9 passos em 3 estágios (Definição → Execução → Evolução), controlador do trabalho e do build. **Passo atual: 4 Arquitetura** — Epic **Arquitetura da solução & ambientes** ([#146](https://github.com/fortegb/platform/issues/146)), que precede/gate o build (G2).

---

## Start here

| Ordem | Ação | Doc |
|-------|--------|-----|
| 1 | Ler o **Método** (a espinha) | [`metodo.md`](./metodo.md) |
| 2 | `rbo-catch-up` + ler **STATUS.md** | [`../../STATUS.md`](../../STATUS.md) |
| 3 | **`rbo-create-change`** no passo atual (4 Arquitetura, Epic #146) | [`decisions.md`](./decisions.md) |

**Decisões de produto/stack fechadas** (D-015..D-022). O que resta é `deferred` (tours/media/mobile) e a **definição de infra/ambientes** (#146). O histórico de grilling está em [`open-questions.md`](./open-questions.md).

**Documentação da plataforma:** HTML estático em [`../`](../index.html) no GitHub Pages ([fortegb.github.io/platform](https://fortegb.github.io/platform/)) — planejamento para sócios; **não** é o produto Nuxt nem portais logados (corretor/staff). **Todo o conteúdo sócios = pt-BR.**

---

## Índice

| Documento | Conteúdo |
|-----------|----------|
| [metodo.md](./metodo.md) | **Método — a espinha** (9 passos, gates G1/G2/G3, modelo de board Etapa/Milestones) |
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
| [decisions.md](./decisions.md) | Decisões fechadas (D-001–**D-024**) |
| [workflow.md](./workflow.md) | Board, OpenSpec, session open/close |
| [github-org-migration.md](./github-org-migration.md) | Runbook org + dotfiles |
| [setup-mac-mini.md](../setup-mac-mini.md) | Checklist Mac Mini pós-migração |

---

## Regras

- **[`metodo.md`](./metodo.md)** = a espinha (ordem + gates); o board a representa via campo **`Etapa`** (9) + **`Milestone`** (v0–v3) + tipo nativo
- **Board** = execução · **`docs/planning/`** = pensamento · **OpenSpec** = 1:1 sub-issue folha
- **`ROADMAP.md`** = gerado; não editar à mão
- **`STATUS.md`** = bússola de sessão
