## ADDED Requirements

### Requirement: Concrete safe-target contract with TBD slots

For each mapped integration, the architecture SHALL document a concrete safe-target contract: what the target must be, what it must not be, and named slots for identifiers to be filled when provisioned. The Architecture leaf SHALL NOT invent account IDs, phone numbers, or device serials. Secrets SHALL NOT be committed to git or published in Platform docs HTML.

#### Scenario: Tuya safe target excludes sale houses

- **WHEN** a Tuya safe-target is documented or provisioned
- **THEN** it is a dedicated test device
- **AND** it is not a lock installed on a house offered for sale

### Requirement: Safe-target secret placement

API keys and tokens for safe-targets SHALL live in Vercel environment scopes (Preview = staging-class; Production = prod) and local gitignored `.env` files. Non-secret labels (e.g. test portal display name) MAY be recorded in the safe-targets template when known. Exact environment variable names and full credential runbooks are deferred to later config leaves.

#### Scenario: Staging Preview uses staging-class secrets

- **WHEN** a Vercel Preview deployment needs HubSpot credentials
- **THEN** it uses Preview/staging-class secrets aimed at the test portal
- **AND** not Production portal credentials
