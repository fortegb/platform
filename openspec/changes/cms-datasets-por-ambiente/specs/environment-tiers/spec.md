## ADDED Requirements

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
