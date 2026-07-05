## ADDED Requirements

### Requirement: Método spine and stages

The project SHALL define its work as a single 9-step método, grouped into 3 stages, documented in `docs/planning/metodo.md` as the governing structure (not merely descriptive):

- **Definição** — 1 Contexto · 2 Funcionalidades · 3 Componentes · 4 Arquitetura · 5 Jornadas/telas · 6 Design system · 7 Quebra em versões
- **Execução** — 8 Build
- **Evolução** — 9 Manutenção

Steps 1–6 SHALL be closed via grilling (resolving open questions and producing a canonical artifact). All steps SHALL run under the change-management lifecycle (`rbo-*` skills + OpenSpec).

#### Scenario: Method documented as canonical

- **WHEN** a contributor needs to know the order of work and where a task belongs
- **THEN** `docs/planning/metodo.md` defines the 9 steps and 3 stages, each with purpose, entry/exit criteria, and canonical artifact
- **AND** planning `README.md`, `agents.md` §9, and `STATUS.md` point to it

#### Scenario: Stages derive from step, not stored separately

- **WHEN** an item's stage (Definição/Execução/Evolução) is needed
- **THEN** it is derived from the step number (1–7 ⇒ Definição, 8 ⇒ Execução, 9 ⇒ Evolução)
- **AND** no separate stage field exists on the board

### Requirement: Gates G1, G2, G3

The método SHALL define three gates that order the work:

- **G1 — Definição sequence:** step N does not open until step N−1 is closed; declared parallels are explicit exceptions (e.g., Contexto 1–2 parallel to Arquitetura #146; Brand assets parallel to Design).
- **G2 — build gate:** no Execução (step 8) item enters *In Progress* before all of Definição (steps 1–7) is closed; the currently active portion of the gate is steps 4–6.
- **G3 — version gate:** version N+1 does not start until version N passes its readiness gate.

Enforcement SHALL be by documentation, the `rbo-create-change` pre-branch check, and a STATUS-derived "próximo passo"; a mechanical hard-gate (GitHub Action) is deferred.

#### Scenario: Build blocked while Definição open

- **WHEN** an Execução item is about to be started while any of steps 4–6 is not Done
- **THEN** the método marks it blocked by G2
- **AND** `rbo-create-change` surfaces the gate before creating the branch

#### Scenario: Gate enforcement is state-visible, not click-blocking

- **WHEN** the board cannot mechanically prevent a Status transition
- **THEN** the gate still controls visible state (Etapa field + v0 milestone progress) so a violation is unmissable
- **AND** the optional hard-gate Action is only added if gate-jumping recurs

### Requirement: Board model representing the método

The board SHALL represent the método with these entities:

- **Etapa** — a single-select field with 9 options (`1 Contexto` … `9 Evolução`), superseding the `Phase` (0–4) field. Every issue carries exactly one Etapa.
- **Milestone** — native GitHub milestones: **v0 Definição** (groups all Etapa 1–7 issues; 100% completion is the visible G2 green light) → **v1** → **v2** → **v3** (v1–v3 subdivide Etapa 8).
- **Type** — native GitHub issue types (Feature/Bug/Task/Epic), replacing reliance on the `Epic:` title prefix.

The versions v1/v2/v3 SHALL be assigned to epics during step 7 (Quebra em versões); an Execução epic with no Milestone is the tracked queue, and step 7's Definition-of-Done is that every Execução epic has a Milestone.

#### Scenario: Etapa replaces Phase

- **WHEN** the board model is defined
- **THEN** `Etapa` (9 options) is the spine field and `Phase` (0–4) is superseded
- **AND** the actual field/milestone/type creation and item retag are performed by a separate board-migration change

#### Scenario: v0 milestone signals build-readiness

- **WHEN** all Etapa 1–7 issues in the v0 Definição milestone are closed
- **THEN** the milestone reaches 100% and G2 is considered open
- **AND** work on Execução (v1) becomes legitimate

#### Scenario: Deferred version placements cannot be forgotten

- **WHEN** an epic's version is deferred to step 7 (e.g., SEO/analytics, LGPD hardening, mobile)
- **THEN** it remains an Execução epic with no Milestone
- **AND** step 7 cannot close while any Execução epic lacks a Milestone

### Requirement: Decisions and canon updates

This change SHALL record decisions **D-023** (método as controlling spine + gates + no-sprints/no-hard-gate rationale) and **D-024** (board model) in `docs/planning/decisions.md`, and SHALL mark `jornadas-plataforma.md` and `screen-map.md` as drafts requiring re-validation after step 4 (Arquitetura, #146).

#### Scenario: Decisions recorded

- **WHEN** the método and board model are established
- **THEN** D-023 and D-024 exist in `decisions.md` following the ADR-lite format
- **AND** jornadas/screen-map carry a draft banner pointing to step-4 re-validation
