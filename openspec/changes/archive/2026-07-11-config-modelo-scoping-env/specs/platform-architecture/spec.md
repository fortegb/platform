## ADDED Requirements

### Requirement: Environment value scoping surfaces

The architecture SHALL document exactly three required surfaces for environment variable **values**: Vercel Production scope, Vercel Preview scope, and local gitignored `.env` / `.env.local` files. Variable **names** SHALL follow the inventory convention; scopes SHALL NOT invent alternate names per surface. Vercel Development scope SHALL NOT be required as a fourth logical environment.

#### Scenario: Feature Preview uses Preview-scoped values

- **WHEN** a `feat/*` deployment runs on Vercel
- **THEN** it receives Preview-scoped environment values
- **AND** `APP_ENV` is `staging`
- **AND** it does not use Production-scoped secrets

### Requirement: Backend class per scope

Vercel Production SHALL carry production backends and `APP_ENV=prod`. Vercel Preview SHALL carry staging-class backends and `APP_ENV=staging` for both the long-lived `staging` branch and all feature/fix Previews. Local SHALL default to `APP_ENV=local` with local/mock backends; pointing local at staging-class credentials SHALL be an explicit override; local SHALL NOT default to production credentials.

#### Scenario: Production and Preview coexist with different secrets

- **WHEN** Production and a Preview deployment are both live
- **THEN** each uses its own scoped secret set
- **AND** Preview continues to use staging-class backends while Production uses production backends
