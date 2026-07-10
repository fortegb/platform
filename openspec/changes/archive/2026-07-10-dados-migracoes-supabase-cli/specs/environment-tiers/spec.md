## ADDED Requirements

### Requirement: Supabase CLI migrations as schema source of truth

Schema changes SHALL be authored as Supabase CLI migration files under `supabase/migrations/`. That directory (once initialized) SHALL be the schema source of truth for local, staging, and prod. `docs/database-schema.sql` MAY remain as a legacy reference until its contents are represented in migrations; it MUST NOT be treated as a second live source of truth.

#### Scenario: New table is added

- **WHEN** the schema needs a new table or policy
- **THEN** it is added via a new file in `supabase/migrations/`
- **AND** not by editing only `docs/database-schema.sql` as the primary path

### Requirement: Apply migrations via CLI, not Vercel deploy

Developers SHALL apply migrations locally with the Supabase CLI against the local Docker stack. Staging and prod SHALL be updated with the CLI against the respective linked cloud projects (e.g. `supabase db push`). Application deploys on Vercel MUST NOT automatically apply database migrations.

#### Scenario: Preview deploy does not migrate

- **WHEN** a Vercel Preview or Production deploy runs
- **THEN** the build/start process does not apply pending Supabase migrations
- **AND** schema updates remain an explicit CLI (or later CI) step

### Requirement: Staging before production for schema

Pending migrations SHALL be applied to the staging Supabase project and smoke-checked before being applied to production, aligning with the normal promote path.

#### Scenario: Prod waits for staging

- **WHEN** a migration is ready for cloud environments
- **THEN** it is applied to staging first
- **AND** production only after staging validation

### Requirement: Forward-only migrations and seed separation

Migrations already applied to staging or prod MUST NOT be edited in place; corrections SHALL be new forward migrations. Seed/test data SHALL NOT be required inside every schema migration; seed strategy remains a separate concern (#154). Row Level Security policies that belong with tables SHALL live in migrations alongside schema.

#### Scenario: Fix after apply

- **WHEN** a migration already applied to staging needs a correction
- **THEN** a new migration file is added
- **AND** the old file is left unchanged
