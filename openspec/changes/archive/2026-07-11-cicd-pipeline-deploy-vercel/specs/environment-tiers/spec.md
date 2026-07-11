## ADDED Requirements

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
