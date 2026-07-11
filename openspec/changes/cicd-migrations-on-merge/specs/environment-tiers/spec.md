## ADDED Requirements

### Requirement: Migration apply is manual, not CI-automated
Migration apply SHALL remain a manual CLI step; no GitHub Actions or other
CI automation SHALL trigger migration apply on merge. Automating this MAY
be revisited later if manual apply becomes a recurring, demonstrated
problem — this requirement does not preclude that.

#### Scenario: Code merges to staging or main
- **WHEN** a change merges into `staging` or `main`
- **THEN** no CI job automatically applies a database migration
- **AND** applying it (if one exists) remains a deliberate human action

### Requirement: Migration trigger points tied to stage and close
When a change includes a new migration, it SHALL be applied against
`staging` as part of landing the change via `rbo-stage-change`, and against
`prod` as part of merging to `main` via `rbo-close-change`, after staging's
smoke check has passed (per D-031's staging-then-prod order).

#### Scenario: Change with a migration is staged
- **WHEN** a change containing a new migration file is landed on `staging`
- **THEN** the migration is applied against the staging Supabase project as
  part of that staging step

#### Scenario: Change with a migration is closed to main
- **WHEN** a change containing a new migration file is merged to `main`
- **THEN** the migration is applied against the prod Supabase project as
  part of that close step, only after staging's smoke check passed

### Requirement: Migration traceability via commit message
The migration's filename SHALL be referenced in the stage or close step's
commit message whenever a migration is applied as part of that step. No
additional tooling SHALL be required for this traceability.

#### Scenario: Migration applied during close
- **WHEN** a migration is applied while closing a change to `main`
- **THEN** the merge commit message references the migration's filename

### Requirement: No automated pending-migration detection
The system SHALL NOT require an automated check for pending/unapplied
migrations. A missed migration is expected to surface as a visible
application error (code depending on schema that doesn't exist yet) rather
than being caught by tooling.

#### Scenario: A migration is forgotten
- **WHEN** a change with a new migration is deployed without the migration
  having been applied
- **THEN** the resulting schema mismatch is expected to cause a visible,
  loud application error rather than fail silently
