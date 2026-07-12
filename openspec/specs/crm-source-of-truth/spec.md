# crm-source-of-truth Specification

## Purpose
TBD - created by archiving change grill-crm-source-of-truth. Update Purpose after archive.
## Requirements
### Requirement: Supabase is the authority for client attribution
The system SHALL treat Supabase as the source of truth for the `Cliente` and for commission attribution, and SHALL sync to HubSpot as a downstream (Cliente→Contact, Registro→Deal). Commission-relevant evaluation (first-wins, dedup, sale trigger) SHALL be performed in Supabase; HubSpot SHALL NOT be authoritative for attribution or sale status.

#### Scenario: Two brokers race to register the same client
- **WHEN** two brokers submit a registration for the same CPF on the same house
- **THEN** exactly one registration is accepted (the earliest valid `registrado_em`) via a transactional uniqueness guarantee in Supabase, and the second is rejected/flagged

#### Scenario: Broker registers once, HubSpot is populated by sync
- **WHEN** a broker registers a client in the ForteGB portal or bot
- **THEN** the record is written to Supabase and pushed to HubSpot by the sync, with no manual double entry

### Requirement: Client identity and two-level promotion
The system SHALL represent a person as a single `cliente` record identified by a unique CPF, allowing a CPF-less "Contato" level that is promoted to "Cliente" when a CPF is provided. WhatsApp SHALL be mandatory on every record; email SHALL be optional.

#### Scenario: Contato promoted to Cliente on visit registration
- **WHEN** a CPF-less Contato later registers for a visit and provides a CPF
- **THEN** the record is promoted in place by setting the CPF (no migration to a different table), reconciling by CPF first and WhatsApp second

#### Scenario: Different phone at promotion
- **WHEN** a returning person provides a CPF that matches an existing Cliente but a new WhatsApp number
- **THEN** the existing Cliente is used, the WhatsApp is updated, and the change is recorded in the audit history

### Requirement: Per-house registration and audit
The system SHALL record client interest as a `registro` per (cliente ×
casa) carrying status, broker attribution (null = direct), and
registration timestamp, with an append-only audit history of
commission-relevant events. A `registro.corretor_id` SHALL only be valid
if an `approved` `corretor_casa` record exists for that corretor and that
casa; the system SHALL NOT permit a corretor to be attributed on a
`registro` for a house they have not been approved for.

#### Scenario: Same person, different houses
- **WHEN** the same client is broker-attributed on one house and direct on
  another
- **THEN** each house has its own `registro` with independent status and
  attribution

#### Scenario: Audit is viewable in the UI
- **WHEN** staff or the attributed broker opens a client/house record
- **THEN** the registration, attribution, exceptions, and status changes
  are visible in the UI without running database queries

#### Scenario: Attribution requires house-level approval
- **WHEN** a corretor attempts to register a client for a house they have
  no `approved` `corretor_casa` record for
- **THEN** the system does not permit that corretor to be attributed on
  the resulting `registro`

#### Scenario: Approved corretor registers normally
- **WHEN** a corretor with an `approved` `corretor_casa` for a given house
  registers a client for that house
- **THEN** the `registro` is created with that corretor attributed
  normally

### Requirement: Lead source capture
The system SHALL stamp every client entry with a `fonte` and map it to a HubSpot source property; v1 sources are broker portal, staff manual entry, and site-form/WhatsApp-CTA contatos, with QR, bots, and tours deferred to v2.

#### Scenario: Source recorded and reportable
- **WHEN** a client or contato is created from any entry point
- **THEN** its `fonte` is stored and synced to HubSpot so lead source is reportable

