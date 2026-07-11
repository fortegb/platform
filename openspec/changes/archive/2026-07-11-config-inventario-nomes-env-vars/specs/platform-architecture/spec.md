## ADDED Requirements

### Requirement: Environment variable naming convention

The architecture SHALL document a naming convention for application environment variables: `SCREAMING_SNAKE_CASE`; client-exposed values MUST use the `NUXT_PUBLIC_` prefix; server-only secrets MUST NOT use that prefix; vendor-related keys MUST use a stable vendor prefix (`SUPABASE_`, `SANITY_`, `HUBSPOT_`, `WHATSAPP_`, `TELEGRAM_`, `TUYA_`, `GOOGLE_CALENDAR_`, `QSTASH_`). Logical environment identity SHALL remain `APP_ENV` with values `local`, `staging`, and `prod`.

#### Scenario: Public WhatsApp number is client-safe

- **WHEN** a value must be readable in the browser (e.g. contact WhatsApp number)
- **THEN** it is named with the `NUXT_PUBLIC_` prefix
- **AND** API tokens for the same vendor remain without that prefix

### Requirement: Environment variable inventory

The architecture SHALL maintain an inventory of required and planned environment variable names with purpose, public-vs-secret classification, and MVP phase (v1/v2). The inventory SHALL cover runtime identity, Supabase, Sanity, HubSpot, WhatsApp, Telegram, QStash, Tuya, Google Calendar, optional webhook secrets, and optional per-integration posture overrides. Exact Vercel Production/Preview placement rules are deferred to the scoping leaf; `.env.example` materialization is deferred to the credentials-template leaf.

#### Scenario: Inventory names posture overrides

- **WHEN** a non-prod environment needs an explicit integration posture override
- **THEN** the documented name follows `INTEGRATION_TIER_<VENDOR>`
- **AND** allowed values are `mock`, `safe-target`, or `prod-live` subject to D-037 rules
