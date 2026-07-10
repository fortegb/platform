## ADDED Requirements

### Requirement: Supabase project map per environment

The platform SHALL use exactly two cloud Supabase projects plus a local Docker-based instance:

| Target | Supabase |
|--------|----------|
| `local` | Local stack (Docker / OrbStack via Supabase CLI) — not a third cloud project |
| `staging` + all Vercel Previews | Cloud project `fortegb-staging` (shared) |
| `prod` | Cloud project `fortegb-prod` |

This map SHALL fit the Free plan’s two-active-project limit. Automatic pause after inactivity on Free SHALL be documented as an accepted caveat for staging.

#### Scenario: Previews share staging project

- **WHEN** a Vercel Preview (`staging` or `feat/*` / `fix/*`) runs
- **THEN** it uses the staging Supabase project credentials
- **AND** Production uses only the prod project

#### Scenario: Local does not consume a cloud slot

- **WHEN** a developer runs the app locally
- **THEN** data/auth/storage use the local Supabase stack
- **AND** no third free cloud project is required for day-to-day local work

### Requirement: No production PII in non-prod Supabase

Staging and local Supabase SHALL NOT receive copies of production customer PII by default. Non-prod data SHALL be seed or synthetic. Restoring a production dump into staging/local is out of the default contract.

#### Scenario: Staging seed only

- **WHEN** staging or local is populated
- **THEN** contents are seed/fake data
- **AND** production PII is not copied as the default path

### Requirement: Shared schema-as-code across targets

Local, staging, and prod Supabase SHALL apply the same schema-as-code (migrations). Structure is shared; data and secrets differ. Choice of migration tooling MAY be deferred to a later leaf.

#### Scenario: Same migrations three ways

- **WHEN** schema changes are defined
- **THEN** the same migration set is intended for local, staging, and prod
- **AND** only credentials/data differ per target

### Requirement: Auth redirect allowlists per Supabase project

Each Supabase project SHALL have redirect/allowlist URLs matching its hosts:

- **prod:** `https://fortegb.com`, `https://www.fortegb.com`
- **staging:** `https://staging.fortegb.com` and Vercel Preview URL patterns (`https://*.vercel.app` or vendor-supported equivalent)
- **local:** `http://localhost:3000` (or the Nuxt local origin in use)

#### Scenario: Prod auth cannot redirect to staging host

- **WHEN** configuring the prod Supabase Auth allowlist
- **THEN** it includes the production hostnames
- **AND** does not rely on staging or localhost as production entry points

### Requirement: Vercel secret scopes map to Supabase projects

Vercel Production env scope SHALL point at the prod Supabase project. Vercel Preview env scope SHALL point at the staging Supabase project. Local SHALL use `.env` / Supabase CLI. Exact variable names MAY be deferred to the config inventory leaf.

#### Scenario: Preview never gets prod keys by scope

- **WHEN** Preview deployments load env vars
- **THEN** they receive staging-class Supabase credentials from Preview scope
- **AND** Production scope alone carries prod credentials
