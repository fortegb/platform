## ADDED Requirements

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
