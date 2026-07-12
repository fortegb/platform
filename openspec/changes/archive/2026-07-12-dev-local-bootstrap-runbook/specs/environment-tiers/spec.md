## ADDED Requirements

### Requirement: Local bootstrap runbook is ordered and self-contained
The local dev bootstrap runbook SHALL document, in order, every step from
cloning the repository to a working `npm run dev`: toolchain setup
(D-049), Supabase local (D-032), and environment variables (D-044). A new
developer SHALL NOT need to consult any other document to complete local
setup.

#### Scenario: New developer follows the runbook
- **WHEN** a new developer follows the bootstrap runbook start to finish
- **THEN** they reach a working local dev environment without needing
  additional undocumented steps

### Requirement: Bootstrap runbook excludes staging and prod
The local bootstrap runbook SHALL cover local setup only. Staging and prod
provisioning SHALL NOT be included — that work belongs to #42/#43/#46
(Execução), not this Definição leaf.

#### Scenario: Runbook read for staging setup
- **WHEN** someone looks to this runbook for staging or prod bootstrap
  steps
- **THEN** they find none — those steps live elsewhere, at Execução

### Requirement: Runbook is documentation only, not executed by this leaf
This leaf SHALL produce the runbook document only. It SHALL NOT run any
bootstrap command (e.g. `supabase init`, dependency installation) as part
of closing this change.

#### Scenario: Change is closed
- **WHEN** this change is archived and merged
- **THEN** no scaffold command has been executed as a result
- **AND** the repository's actual bootstrap state is unchanged
