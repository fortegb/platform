# journey-corretor-pipeline Specification

## Purpose
TBD - created by archiving change jornada-pipeline-dashboard-corretor. Update Purpose after archive.
## Requirements
### Requirement: registro.status is a deal-focused enum
The system SHALL represent `registro.status` using the values
`registrado`, `negociando`, `fechado_ganho`, and `fechado_perdido`, and
SHALL NOT use `registro.status` to track visit-specific state, which is
owned exclusively by the `visit` entity.

#### Scenario: New registration starts as registrado
- **WHEN** a corretor registers a new client (per #190's registration
  journey)
- **THEN** the resulting `registro.status` is `registrado`

#### Scenario: Visit state is not duplicated on registro
- **WHEN** a linked visit is scheduled, completed, cancelled, or
  rescheduled
- **THEN** `registro.status` is not changed as a side effect of that
  visit-state transition

### Requirement: Pipeline dashboard derives visit progress via join
The system SHALL display visit-related progress for a `registro` (e.g.
whether a visit is scheduled or completed) by reading the associated
`visit` record(s) directly, not from a value stored on `registro`.

#### Scenario: Dashboard shows visit context alongside deal status
- **WHEN** a corretor views their pipeline
- **THEN** any visit-related information shown for a client is read from
  that client's `visit` record(s), not from `registro.status`

### Requirement: Contact touchpoints are logged as historico entries
The system SHALL record a corretor's contact touchpoint with a registered
client as a `historico` entry, not as a `registro.status` transition.

#### Scenario: Logging a follow-up contact
- **WHEN** a corretor logs having contacted a registered client
- **THEN** a `historico` entry is created
- **AND** `registro.status` is unaffected by that entry

### Requirement: Corretor sees only their own pipeline
The system SHALL scope the dashboard and pipeline list to `registro`
records where `corretor_id` matches the authenticated corretor, enforced
at both the application query and the database RLS layer.

#### Scenario: Corretor cannot see another corretor's registros
- **WHEN** a corretor views their dashboard
- **THEN** only `registro` records attributed to them are shown

#### Scenario: Auth uses the role/status model, not the legacy realtors check
- **WHEN** the dashboard or pipeline endpoint authenticates a request
- **THEN** it checks `role = corretor` and `status = approved`, not
  membership in the pre-architecture `realtors` table

