## MODIFIED Requirements

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
