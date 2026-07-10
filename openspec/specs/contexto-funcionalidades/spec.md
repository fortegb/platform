# contexto-funcionalidades Specification

## Purpose
Contract for closing roteiro passos 1 (Contexto) and 2 (Funcionalidades): grilling DoD, canonical artifacts, journey ownership by passo 5, and planning hygiene.

## Requirements

### Requirement: Passos 1–2 close via grilling and D-028

The project SHALL treat passos 1 (Contexto) and 2 (Funcionalidades) as closed when grilling has accepted the canonical artifacts and a decision entry (D-028) records that acceptance. Canonical artifacts SHALL be:

- Passo 1: `docs/planning/company-structure.md`, `docs/planning/platform-vision.md`
- Passo 2: `docs/planning/deliverables.md` (capability / product map) and the modules list in `docs/planning/modules.md`

Deep journey and screen re-validation SHALL NOT be required to close passo 2; that work SHALL remain owned by passo 5 (`jornadas-plataforma.md`, `screen-map.md`, epic #176).

#### Scenario: Grilling closes passos 1–2 without journey rewrite

- **WHEN** grilling accepts company structure, platform vision, and the capability map, and D-028 is recorded
- **THEN** passos 1–2 are considered validated for the método
- **AND** `jornadas-plataforma.md` / `screen-map.md` may remain draft pending passo 5

#### Scenario: No invented offer items

- **WHEN** closing passo 2
- **THEN** the project MUST NOT invent new modules or deliverables solely to populate the consolidation epic
- **AND** any later addition SHALL reopen via a new decision

### Requirement: Planning hygiene matches known board state

Planning docs that state “current” project status SHALL NOT contradict known facts after this change: GitHub org and board exist; Architecture product/stack epic (#1 → #38) is Done; open questions are resolved or deferred; operational next definition work is roteiro passo 4 / epic #146 (and declared parallels).

#### Scenario: Stale pending language removed

- **WHEN** a planning doc claims org/board is still pending or Architecture checklist is still open while those items are Done
- **THEN** the doc is updated to match reality
- **AND** Phase-era archival wording may remain where it documents history, not current next-step guidance
