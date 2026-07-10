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
