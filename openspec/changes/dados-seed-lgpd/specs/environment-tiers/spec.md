## ADDED Requirements

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
