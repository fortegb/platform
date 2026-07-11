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
Completing a normal change SHALL use two human-gated steps when the repository opts into an integration branch: (1) **stage** — merge the feature branch into the integration branch without archiving the OpenSpec change and without closing the GitHub issue; (2) **close** — after staging validation, archive the OpenSpec change, merge the integration branch into the default branch (`main`), and close the issue. Promoting integration → production is that close step for opted-in repos (or an explicit merge `staging` → `main`). Hosting providers SHALL NOT be assumed to auto-promote staging to production. Repositories without lifecycle config SHALL keep a single close-out that merges the feature branch into `main`.

#### Scenario: Stage does not finish the issue
- **WHEN** a change is staged onto the integration branch
- **THEN** the OpenSpec change remains active, the GitHub issue remains open, and board Status is not set to Done

#### Scenario: Close finishes on main
- **WHEN** staging has been validated and close-out runs on an opted-in repo
- **THEN** the OpenSpec change is archived, `staging` (integration) is merged into `main`, and the issue is closed with board Status Done

#### Scenario: Promote is intentional
- **WHEN** staging has been validated and production should receive it
- **THEN** an explicit close/promote action (merge integration → `main`) is required; it does not happen solely because a Preview exists

### Requirement: Opt-in lifecycle merge-target config
Change tooling SHALL default to merging the feature branch into the repository default branch (`main`) on close-out. A repository MAY opt in via a small explicit config file (e.g. `.rbo/lifecycle.yml`) that sets `integrationBranch` (e.g. `staging`). When that config is present: **stage** tooling SHALL merge the feature branch into `integrationBranch` and SHALL fail if the remote integration branch is missing; **close** tooling SHALL archive then merge `integrationBranch` into the default branch and SHALL fail (not fall back to feature→`main`) if the change was not landed on the integration branch. When the config is absent, behavior SHALL remain feature→default-branch on close. Tooling SHALL NOT infer merge targets by parsing free-form documentation. Platform docs sync (`pages:sync`) SHALL run only on close to `main`, not on stage.

#### Scenario: Repo without config keeps current behavior
- **WHEN** the lifecycle config file is absent
- **THEN** close-out merges the feature branch into `main` (or the git default branch)

#### Scenario: Repo with integrationBranch set — stage
- **WHEN** the lifecycle config sets `integrationBranch` to `staging` and stage-out runs
- **THEN** the feature branch is merged into `staging` without OpenSpec archive and without closing the issue

#### Scenario: Repo with integrationBranch set — close
- **WHEN** the lifecycle config sets `integrationBranch` to `staging` and close-out runs after a successful stage
- **THEN** close-out archives the change and merges `staging` into `main` (not the feature branch into `main`)

#### Scenario: Missing remote integration branch
- **WHEN** stage-out runs and `origin/<integrationBranch>` does not exist
- **THEN** stage-out fails without creating the remote branch

#### Scenario: Close without stage on opted-in repo
- **WHEN** lifecycle config is present and close-out would merge a feature branch that was not landed on the integration branch
- **THEN** close-out fails and does not merge feature→`main`

#### Scenario: Config is explicit not documentary
- **WHEN** only markdown environment docs describe staging-before-prod
- **THEN** tooling does not change merge targets until the explicit config file is present

#### Scenario: pages sync only on close
- **WHEN** a change is staged onto the integration branch
- **THEN** Platform docs `pages:sync` is not required; sync runs as part of close-out to `main` when the repo supports it

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

### Requirement: Shared non-production seed pack

The platform SHALL define one shared base seed pack for `local` and `staging`. Production SHALL NOT receive this seed as a default path. The pack MUST be disposable and recreatable by a documented one-command (or short) procedure (e.g. local `supabase db reset` once seed is wired).

#### Scenario: Local and staging share the base pack

- **WHEN** non-prod environments are populated for development or UAT
- **THEN** they use the same base synthetic pack
- **AND** production is not seeded with that pack by default

#### Scenario: Wipe and recreate

- **WHEN** staging or local data is wiped
- **THEN** documentation describes how to recreate the base pack without relying on a production dump

### Requirement: Operational Supabase seed vs CMS content

The seed pack SHALL target Supabase operational data (e.g. corretores, leads, visits) and stable house identifiers for joins. CMS listing/blog/media fixtures SHALL be owned by CMS environment leaves, not required inside this seed decision.

#### Scenario: House IDs without full CMS dump

- **WHEN** the seed pack is specified
- **THEN** it includes stable house IDs for operational rows
- **AND** it does not require a full CMS content export as part of this leaf

### Requirement: Synthetic identity and document fixtures

Non-prod seed people SHALL use invented but realistic Brazilian Portuguese lookalike data (names, phones, addresses). Production customer PII and production database dumps MUST NOT be copied into local or staging by default. The pack MAY include dummy RG/CNH (and related) fixture files stored in the repository and loaded only into local/staging storage — never into production buckets. Real identity document scans MUST NOT appear in the seed pack.

#### Scenario: No prod dump path

- **WHEN** populating local or staging
- **THEN** the default path is the synthetic seed pack
- **AND** restoring a production dump is outside the default contract

#### Scenario: Dummy documents stay non-prod

- **WHEN** seed applies document fixtures
- **THEN** they are fabricated test assets from the repo
- **AND** they are not uploaded to production storage

### Requirement: Non-prod test auth accounts

The seed contract SHALL include a small set of known test login accounts (at least corretor and staff) for local/staging, with credentials documented for non-prod use only. Real sócio or customer accounts MUST NOT be used as seed credentials.

#### Scenario: Portal can be exercised after seed

- **WHEN** the seed pack is applied in local or staging (once implemented)
- **THEN** documented test accounts exist for corretor and staff roles
- **AND** those credentials are not production user credentials

### Requirement: Sanity dataset map per environment

The platform SHALL use one Sanity project with exactly two datasets named `staging` and `production`, fitting the Sanity free-tier two-dataset limit:

| App target | Sanity dataset |
|------------|----------------|
| `local`, `staging`, and all Vercel Previews | `staging` |
| `prod` (Vercel Production / `main`) | `production` |

#### Scenario: Previews share staging dataset

- **WHEN** a Vercel Preview or local app loads CMS content from the live Sanity API
- **THEN** it uses the `staging` dataset
- **AND** Production uses only the `production` dataset

### Requirement: Explicit CMS content promotion

Content SHALL be authored and validated in the `staging` dataset and promoted to `production` by an explicit procedure (e.g. Sanity CLI dataset copy or export/import). Application deploys on Vercel MUST NOT automatically copy CMS content between datasets.

#### Scenario: Deploy does not promote CMS

- **WHEN** a Vercel Production deploy runs
- **THEN** it does not copy the staging dataset into production
- **AND** content promotion remains a separate explicit step

### Requirement: Dataset selection via environment scopes

Vercel Preview env scope SHALL point the app at the Sanity `staging` dataset. Vercel Production env scope SHALL point at the `production` dataset. Local SHALL default to the `staging` dataset when live credentials are set, or use mocks via the CMS composable when unset. Exact environment variable names MAY be deferred to the config inventory leaf.

#### Scenario: Preview never reads production dataset by scope

- **WHEN** Preview deployments load CMS configuration
- **THEN** they receive staging-dataset credentials/config from Preview scope
- **AND** Production scope alone targets the production dataset

### Requirement: Deploy trigger is Vercel's native git integration
The deploy pipeline SHALL use Vercel's native git integration (push-to-deploy)
as its trigger mechanism, per the topology already fixed in D-027. No custom
GitHub Actions deploy workflow SHALL be introduced unless a concrete gap
appears that Vercel's native integration cannot cover.

#### Scenario: Push to a branch
- **WHEN** a commit is pushed to `main`, `staging`, or a `feat/*`/`fix/*` branch
- **THEN** Vercel deploys it natively (Production for `main`, Preview otherwise)
- **AND** no separate CI workflow is required to trigger that deploy

### Requirement: Merge into main requires a passing deploy
A merge into `main` SHALL require a passing Vercel deploy check. A merge into
`staging` SHALL NOT require this — `staging` exists for integration and
validation, not as a merge gate.

#### Scenario: Broken deploy blocks production merge
- **WHEN** a Vercel deploy fails for a change targeting `main`
- **THEN** the merge into `main` is blocked until the deploy succeeds

#### Scenario: Staging accepts an unvalidated merge
- **WHEN** a change is staged onto `staging` via `rbo-stage-change`
- **THEN** the merge into `staging` is not blocked by deploy status

### Requirement: Rollback uses Vercel's built-in mechanism
A bad production deploy SHALL be recovered using Vercel's built-in dashboard
rollback (redeploying a prior successful deployment). No custom rollback
procedure SHALL be built for this.

#### Scenario: Production deploy needs to be reverted
- **WHEN** a deploy on `main` is found to be broken after going live
- **THEN** the prior successful deployment is redeployed via the Vercel
  dashboard, without a git revert being required first

### Requirement: Origin staging is created at Execução bootstrap, not Definição
The `origin/staging` branch SHALL be created as a long-lived branch from
`main`, but its creation SHALL happen during Execução bootstrap (under the
Platform environments epic), not during any Definição leaf. Definição leaves
closing before `origin/staging` exists SHALL merge `feat/*` directly into
`main`, matching how #166 itself was closed.

#### Scenario: Definição leaf closes before staging exists
- **WHEN** a Definição-phase change is closed and `origin/staging` does not
  yet exist
- **THEN** the change merges `feat/*` directly into `main`
- **AND** this is not treated as a violation of the stage-vs-close contract,
  since nothing has a branch to stage onto yet

### Requirement: No custom deploy notifications
Deploy failure/success notifications SHALL rely on Vercel's default email
notifications. No custom notification integration (e.g. Telegram, Slack)
SHALL be built for deploy status in this leaf.

#### Scenario: A deploy fails
- **WHEN** a Vercel deploy fails
- **THEN** the default Vercel email notification is the only alert mechanism

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

### Requirement: Promotion happens one staged change at a time
Closing a staged change SHALL be treated as promoting everything currently
on `staging` to `main`, not just that one change. A staged change SHALL NOT
be closed while another unrelated change is also staged and still
mid-validation on the same branch.

#### Scenario: Single staged change ready to promote
- **WHEN** exactly one change is staged on `staging` and validated
- **THEN** closing it promotes that change's content to `main` with no
  unrelated in-flight work mixed in

#### Scenario: Two changes staged simultaneously
- **WHEN** a second change is staged on `staging` while a first is still
  mid-validation
- **THEN** the first change is not closed until the second is also ready,
  since closing either promotes both

### Requirement: Hotfix branches from main and bypasses staging
A hotfix SHALL branch as `hotfix/<name>` from `main` and SHALL be closed via
the sanctioned exception that merges directly to `main`, bypassing the
normal staging requirement. It SHALL still go through normal issue and
OpenSpec change tracking — only the staging step is skipped.

#### Scenario: Urgent production fix
- **WHEN** a fix must reach production without waiting for staging
  validation
- **THEN** it is branched as `hotfix/<name>` from `main`
- **AND** it is tracked by a normal issue and OpenSpec change, same as any
  other work

### Requirement: Staging sync is mandatory after a hotfix
`main` SHALL be merged into `staging` immediately after a hotfix lands on
`main`, as a mandatory step of the hotfix procedure, not an optional or
memory-dependent follow-up.

#### Scenario: Hotfix lands on main
- **WHEN** a hotfix merge to `main` completes
- **THEN** `main` is merged into `staging` before any other work continues
- **AND** this happens regardless of whether `staging` currently has other
  changes in flight

### Requirement: Normal tracking satisfies hotfix recording
The normal issue and OpenSpec change trail SHALL be sufficient to satisfy
the recording expectation for a hotfix. A separate decision-log entry SHALL
NOT be required per individual hotfix use — `decisions.md` records the
procedure once, not each invocation of it.

#### Scenario: Hotfix closed and tracked
- **WHEN** a hotfix's issue is closed via its OpenSpec change
- **THEN** that issue/change trail is the complete record of that hotfix
- **AND** no additional `decisions.md` entry is created for that specific
  instance

