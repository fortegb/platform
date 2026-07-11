## ADDED Requirements

### Requirement: Committed env example file

The repository SHALL include a root `.env.example` that lists every inventory environment variable name with empty or non-secret placeholder values and SHALL NOT contain real API keys or tokens. The file SHALL be safe to commit and SHALL be the copy source for local `.env` setup.

#### Scenario: Developer bootstraps local env

- **WHEN** a developer runs `cp .env.example .env`
- **THEN** the resulting file contains the canonical variable names from the inventory
- **AND** no production or staging secret values are present in `.env.example`

### Requirement: SETUP-CREDENTIALS structure

`docs/SETUP-CREDENTIALS.md` SHALL document, without embedding secret values: how to obtain each credential family, where to place values (local `.env` vs Vercel Production/Preview per scoping rules), and pointers to the secrets access policy. It SHALL NOT document removed vendors (e.g. Contentful) as current stack. Local secret files (`.env`, `.env.local`) SHALL be gitignored.

#### Scenario: HubSpot section has no pasted key

- **WHEN** a reader follows the HubSpot section of SETUP-CREDENTIALS
- **THEN** they see how to create/obtain a key and which env var name to set
- **AND** the document does not include a real or JWT-shaped sample secret value
