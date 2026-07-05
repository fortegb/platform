## MODIFIED Requirements

### Requirement: Board model representing the método

The board SHALL represent the método with these entities:

- **Etapa** — a single-select field with 9 options (`1 Contexto` … `9 Evolução`), superseding the `Phase` (0–4) field. Every issue carries exactly one Etapa.
- **Milestone** — native GitHub milestones: **v0 Definição** (groups all Etapa 1–7 issues; 100% completion is the visible G2 green light) → **v1** → **v2** → **v3** (v1–v3 subdivide Etapa 8).
- **Type** — native GitHub issue types (Feature/Bug/Task/Epic), replacing reliance on the `Epic:` title prefix.

The versions v1/v2/v3 SHALL be assigned to epics during step 7 (Versionamento); an Execução epic with no Milestone is the tracked queue, and step 7's Definition-of-Done is that every Execução epic has a Milestone.

The model SHALL be applied in two migrations: **migração A** creates the `Etapa` field (and deletes `Phase`), tags every item by a per-epic map (leaves inherit their epic's Etapa), creates the `v0 Definição` milestone and assigns all Etapa 1–7 items, backfills native types, and adds the two new Definição epics; **migração B** creates Milestones v1/v2/v3 and assigns Execução epics at step 7.

#### Scenario: Etapa applied, Phase removed

- **WHEN** migração A runs
- **THEN** the `Etapa` field (9 options) exists with every item tagged and the `Phase` field is deleted
- **AND** the report generator reads Etapa/Milestone, not Phase

#### Scenario: Retag map is per-epic, not a Phase formula

- **WHEN** an item is retagged from Phase to Etapa
- **THEN** its Etapa comes from its epic's método step (leaves inherit the epic), not from a mechanical Phase→Etapa mapping
- **AND** an epic whose Phase and Etapa disagree (e.g. #146 = Phase 1 but Etapa 4) takes the Etapa value

#### Scenario: v0 milestone signals build-readiness

- **WHEN** all Etapa 1–7 issues in the v0 Definição milestone are closed
- **THEN** the milestone reaches 100% and G2 is considered open
- **AND** work on Execução (v1) becomes legitimate

#### Scenario: Deferred version placements cannot be forgotten

- **WHEN** an epic's version is deferred to step 7 (e.g., SEO/analytics, LGPD hardening, mobile)
- **THEN** it remains an Execução epic with no Milestone
- **AND** step 7 cannot close while any Execução epic lacks a Milestone
