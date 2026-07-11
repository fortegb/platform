## MODIFIED Requirements

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
