## ADDED Requirements

### Requirement: Local Supabase runbook documentation

The platform SHALL document a local Supabase runbook that covers: installing a Docker-compatible container engine and the Supabase CLI; starting, stopping, and checking status of the local stack; locating Studio and copying local API keys into developer `.env`; applying migrations locally via `supabase db reset` (or equivalent); and diagnosing common failures (engine not running, ports in use). The preferred engine on macOS SHALL be OrbStack, with Docker Desktop documented as an acceptable alternative.

#### Scenario: Developer can find the local lifecycle

- **WHEN** a developer consults the environments / local Supabase documentation
- **THEN** they can follow install → start → Studio/keys → reset → stop without inventing steps
- **AND** cloud `db push` / project link is not required to complete the local runbook

#### Scenario: Engine preference is explicit

- **WHEN** the runbook describes the container engine
- **THEN** OrbStack is recommended for macOS
- **AND** Docker Desktop (or another Docker-compatible engine) is accepted

### Requirement: Local runbook is documentation-only until bootstrap

Closing the local Supabase runbook definition SHALL NOT require creating the `supabase/` directory or running `supabase init` in the repository. The runbook MAY describe `supabase init` as a later step owned by the local bootstrap / schema setup work (#171 / #43). Until that folder exists, the runbook SHALL state the prerequisite clearly.

#### Scenario: Definition change does not scaffold the repo

- **WHEN** the local Supabase runbook decision is applied as documentation
- **THEN** no `supabase/config.toml` or migrations scaffold is required in that change
- **AND** the documented init step points at bootstrap/schema setup leaves, not at inventing a third path

### Requirement: Scope boundaries with sibling local-dev leaves

The local Supabase runbook SHALL remain focused on Supabase CLI + local Docker stack. Broader toolchain inventory (#170) and full local bootstrap (#171) MAY be referenced but MUST NOT be duplicated as the primary content of this runbook. Seed/test data after reset remains a separate concern (#154).

#### Scenario: Runbook does not replace toolchain leaf

- **WHEN** documenting local Supabase
- **THEN** Node/ngrok/general toolchain details are deferred or linked to the toolchain leaf
- **AND** the Supabase-specific lifecycle remains the core of this runbook
