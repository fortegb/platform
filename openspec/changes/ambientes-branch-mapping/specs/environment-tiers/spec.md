## ADDED Requirements

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
