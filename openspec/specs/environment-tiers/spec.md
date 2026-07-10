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

