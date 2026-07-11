## ADDED Requirements

### Requirement: Integration inventory and safe-target classes

The architecture SHALL document an integration map covering HubSpot, Tuya, WhatsApp, Telegram, Google Calendar, and Upstash QStash. Supabase and Sanity SHALL NOT be re-mapped here (already environment-scoped). Gov.br SHALL appear as a deferred/manual row until automated. For each mapped integration, the map SHALL name the safe-target *class* (kind of test resource), not concrete account or device identifiers.

#### Scenario: Staging HubSpot aims at a test portal class

- **WHEN** HubSpot runs under the safe-target posture
- **THEN** it targets a separate test/sandbox CRM portal class
- **AND** not the live ForteGB production portal

### Requirement: Integration MVP phases on the map

The integration map SHALL tag each integration with an MVP phase aligned to the product version boundary: HubSpot, WhatsApp, and QStash as v1; Telegram as v1 adapter seam with bots growing later; Tuya and Google Calendar as v2; Gov.br manual in v1 until automation.

#### Scenario: Tuya not required for v1 launch

- **WHEN** planning v1 safe-target provisioning
- **THEN** Tuya may be deferred to v2 while its safe-target class remains documented
