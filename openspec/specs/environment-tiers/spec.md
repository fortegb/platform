# environment-tiers Specification

## Purpose
TBD - created by archiving change ambientes-tiers-local-staging-prod. Update Purpose after archive.
## Requirements
### Requirement: Three logical environment tiers
The platform SHALL recognize exactly three logical environments named `local`, `staging`, and `prod`. Preview or ephemeral deploy mechanisms SHALL NOT introduce a fourth logical environment name; they MUST map onto one of the three tiers via a separate mapping decision.

#### Scenario: Named tiers only
- **WHEN** documentation, config templates, or runtime identity refer to an environment
- **THEN** the name used is one of `local`, `staging`, or `prod`

#### Scenario: Preview is not a fourth tier
- **WHEN** a Preview or ephemeral deployment is described
- **THEN** it is treated as a delivery mechanism that maps to an existing logical tier, not as a new tier name

### Requirement: Tier purpose and operating rules
Each logical tier SHALL have a defined purpose, data posture, and integration posture as follows: `local` is for disposable developer work with mock/stub integrations and no real customer PII; `staging` is for private shared pre-production validation (developers and optional partner UAT, not a public beta) with non-production data and safe-target integrations only; `prod` is the live customer-facing system with real PII under LGPD and prod-live integrations.

#### Scenario: Local never uses live door or real customer messaging
- **WHEN** the application runs with logical tier `local`
- **THEN** integrations MUST use mocks or local stubs and MUST NOT operate a production smart lock or send paid messaging to real customer numbers

#### Scenario: Staging uses safe targets only
- **WHEN** the application runs with logical tier `staging`
- **THEN** integrations MUST target sandbox/test/safe resources and MUST NOT use production-live customer-facing endpoints for locks or customer messaging

#### Scenario: Staging is not a public beta
- **WHEN** staging is made available for validation
- **THEN** it remains private to developers and optional partner UAT and is not offered as a public environment for corretores or customers

#### Scenario: Prod holds real customer data
- **WHEN** the application runs with logical tier `prod`
- **THEN** operational data may include real PII subject to LGPD controls and integrations MAY use production-live vendor endpoints

### Requirement: Local isolation by default
With `APP_ENV=local`, the default stack SHALL be self-contained (local app process plus local/mock backends). Pointing local at staging backends SHALL be an explicit override only. Local SHALL NOT target prod backends.

#### Scenario: Default local does not write to shared staging
- **WHEN** a developer starts the app in the default local configuration
- **THEN** the app does not use staging or prod databases or live vendor endpoints

### Requirement: Promotion boundary and hotfix preview
Changes SHALL NOT be promoted directly from `local` to `prod` as the normal path. Eligibility for `prod` REQUIRES prior validation against `staging` (or an equivalent staging-class backend target). Architecture and environment docs SHALL preview that emergency hotfix overrides may exist as exceptional, explicit, and logged exceptions, with the full procedure defined in a later promotion/release decision.

#### Scenario: No local-to-prod shortcut as normal path
- **WHEN** a change is proposed for promotion to `prod` under the normal path
- **THEN** it MUST have been validated on `staging` (or staging-class backends), not only on `local`

#### Scenario: Hotfix escape hatch is visible
- **WHEN** a reader consults the environment architecture documentation
- **THEN** they can see that emergency overrides to prod are allowed only as exceptional, explicit, logged actions whose detailed procedure is defined later

### Requirement: Runtime tier identity via APP_ENV
The application and config templates SHALL identify the logical tier using the environment variable `APP_ENV` with allowed values `local`, `staging`, and `prod`. `NODE_ENV` alone SHALL NOT be treated as sufficient to distinguish `staging` from `prod`.

#### Scenario: Staging build is still production Node mode
- **WHEN** a staging deployment is built with `NODE_ENV=production`
- **THEN** `APP_ENV` remains `staging` and governs data/integration posture

#### Scenario: Template documents APP_ENV
- **WHEN** the environments config template is consulted
- **THEN** it documents `APP_ENV` and the three allowed values with the tier rules summary

### Requirement: Sócios-facing environments documentation
The Platform docs site SHALL include a dedicated page in Brazilian Portuguese that explains the three environments, their rules, promotion, and the hotfix preview in plain language, linked from the Platform docs index.

#### Scenario: Environments page discoverable
- **WHEN** a partner opens the Platform docs index
- **THEN** they can navigate to a dedicated environments page describing local, staging, and prod

### Requirement: Branch to environment mapping
The platform SHALL map git lines to logical environments as follows: developer laptop with no deployment branch maps to `local`; long-lived branch `staging` maps to `staging`; branch `main` maps to `prod`; short-lived `feat/*` and `fix/*` branches map to logical `staging` via Preview deployments that use staging-class backends. Preview SHALL NOT introduce a fourth logical environment name.

#### Scenario: Feature Preview is staging-class
- **WHEN** a `feat/*` or `fix/*` branch is deployed as a Preview
- **THEN** it uses staging-class backends and is treated as logical environment `staging`

#### Scenario: main is production
- **WHEN** code is on `main` and deployed as the production deployment
- **THEN** the logical environment is `prod`

#### Scenario: long-lived staging branch
- **WHEN** code is on the long-lived `staging` branch
- **THEN** the logical environment is `staging`

### Requirement: Normal promotion path via staging
The normal delivery path SHALL be: work on `feat/*` or `fix/*`, merge into `staging` for validation, then promote from `staging` to `main` for production. Direct `local` or feature-branch promotion to `prod` SHALL NOT be the normal path.

#### Scenario: Feature lands on staging first
- **WHEN** a normal change is completed
- **THEN** it is merged to `staging` before it is eligible for production on `main`

### Requirement: Close versus promote separation
Completing a normal change (close-out) SHALL target the repository's **integration branch** (ForteGB: `staging`). Promoting integration → production (`staging` → `main`) SHALL be a separate release step. Hosting providers SHALL NOT be assumed to auto-promote staging to production.

#### Scenario: Promote is intentional
- **WHEN** staging has been validated and production should receive it
- **THEN** an explicit promote action (e.g. merge or PR `staging` → `main`) is required; it does not happen solely because a Preview exists

### Requirement: Opt-in lifecycle merge-target config
Change close-out tooling SHALL default to merging into the repository default branch (`main`). A repository MAY opt in via a small explicit config file that sets an `integrationBranch` (e.g. `staging`). When that config is absent, behavior SHALL remain merge-to-default-branch. Tooling SHALL NOT infer merge targets by parsing free-form documentation.

#### Scenario: Repo without config keeps current behavior
- **WHEN** the lifecycle config file is absent
- **THEN** close-out merges the feature branch into `main` (or the git default branch)

#### Scenario: Repo with integrationBranch set
- **WHEN** the lifecycle config sets `integrationBranch` to `staging`
- **THEN** close-out merges the feature branch into `staging` instead of `main`

#### Scenario: Config is explicit not documentary
- **WHEN** only markdown environment docs describe staging-before-prod
- **THEN** close-out tooling does not change merge target until the explicit config file is present

### Requirement: Single Vercel project topology
The Nuxt application SHALL be hosted as a single Vercel project. The Production deployment SHALL track the `main` branch only (logical `prod`). Deployments of `staging`, `feat/*`, and `fix/*` SHALL be Preview deployments (logical `staging`) and SHALL coexist with Production without requiring Production to be disabled.

#### Scenario: Production is main only
- **WHEN** a Production deployment is published
- **THEN** it corresponds to the `main` branch and logical environment `prod`

#### Scenario: Staging branch is Preview
- **WHEN** the long-lived `staging` branch is deployed
- **THEN** it is a Preview deployment (not Production) and uses staging-class configuration

#### Scenario: Feature Preview coexists with Production
- **WHEN** a `feat/*` Preview is live and Production is live
- **THEN** both remain reachable on their respective URLs; using Preview does not turn off Production

### Requirement: Preview host-level access protection
Preview deployments (including `staging` and feature Previews) SHALL be protected at the host layer with a shared-password (or equivalent) gate so visitors without the password cannot reach the application. Testers and partners SHALL NOT be required to hold a Vercel account. After a successful unlock in a browser, the entire Preview deployment SHALL remain accessible without re-prompting until the host session expires or is cleared. Application authentication (e.g. Supabase) SHALL remain a separate layer and SHALL NOT be replaced by the host gate.

#### Scenario: Sócio unlocks once
- **WHEN** a partner opens a staging Preview URL and enters the shared password
- **THEN** they can use the whole Preview deployment in that browser without entering the password on every page

#### Scenario: App login still applies where required
- **WHEN** a partner visits an app route that requires product login after passing the host gate
- **THEN** the application auth challenge still applies independently of the Vercel password cookie

#### Scenario: Production stays publicly reachable at the host layer
- **WHEN** a visitor opens the Production deployment
- **THEN** they are not required to pass the Preview shared-password gate (product auth may still apply on protected routes)

### Requirement: Vercel environment variable scopes
Vercel Production-scoped environment variables SHALL configure logical `prod` (`APP_ENV=prod` and production backends). Vercel Preview-scoped environment variables SHALL configure logical `staging` (`APP_ENV=staging` and staging-class backends) and SHALL apply to all Preview deployments including `staging` and `feat/*` / `fix/*`.

#### Scenario: Feature and staging share Preview env
- **WHEN** a `feat/*` Preview and the `staging` Preview are both deployed
- **THEN** both receive Preview-scoped configuration (staging-class), not Production secrets


### Requirement: Hostname map per environment

The environment contract SHALL define hostnames as follows (definition; provisioning is separate):

| Logical / delivery | Hostnames |
|--------------------|-----------|
| `local` | `localhost` (dev server; no custom DNS) |
| `staging` (branch `staging`) | `staging.fortegb.com` (custom domain on Preview; password per D-027) |
| Preview (`feat/*`, `fix/*`) | Ephemeral `*.vercel.app` only — no per-PR custom domain |
| `prod` (branch `main`) | `fortegb.com` and `www.fortegb.com` on the same Production deployment |

Platform docs SHALL remain on GitHub Pages and MUST NOT be required to share these app hostnames.

#### Scenario: Sócio opens staging bookmark

- **WHEN** a partner opens `https://staging.fortegb.com`
- **THEN** that hostname is the documented stable staging URL for the long-lived `staging` branch
- **AND** feature branch Previews are documented as separate `*.vercel.app` URLs

#### Scenario: Customer opens production

- **WHEN** a customer uses `fortegb.com` or `www.fortegb.com`
- **THEN** both names are documented as Production app hosts for the same deployment

### Requirement: Brazilian TLD redirects to canonical .com

The domains `fortegb.com.br` and `www.fortegb.com.br` SHALL be documented as **HTTP redirects (301)** to `https://fortegb.com`, implemented at registrar or CDN redirect — **not** as additional Vercel app hosts. There SHALL be no `staging.fortegb.com.br` in the contract.

#### Scenario: Visitor hits .com.br

- **WHEN** someone navigates to `fortegb.com.br` or `www.fortegb.com.br`
- **THEN** the documented intent is a permanent redirect to the canonical `.com` production host
- **AND** the Nuxt app is not required to be attached to the `.com.br` names

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
