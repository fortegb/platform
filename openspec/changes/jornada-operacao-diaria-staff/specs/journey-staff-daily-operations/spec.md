## ADDED Requirements

### Requirement: Staff sees today's visits business-wide
The system SHALL display, on the staff daily-operations screen, all
`visit` records scheduled or occurring on the current day across all
houses and corretores, not scoped to any single corretor.

#### Scenario: Visits from multiple corretores appear together
- **WHEN** a staff-level user opens the daily-operations screen
- **THEN** today's visits are shown regardless of which corretor (if any)
  is attributed to the associated client

### Requirement: Staff sees recently registered clients business-wide
The system SHALL display recently registered `cliente`/`registro` records
from all sources (direct and broker-attributed) on the staff
daily-operations screen.

#### Scenario: Recent clients from all sources appear together
- **WHEN** a staff-level user opens the daily-operations screen
- **THEN** recently registered clients are shown regardless of `fonte` or
  broker attribution

### Requirement: Manual lead entry creates a Contato-tier record
The system SHALL, when staff manually enters a walk-in or phone-call
contact, create the record at the `Contato` tier (WhatsApp only, CPF
optional) and tag it `fonte: staff-manual`, and SHALL NOT require CPF for
this entry point.

#### Scenario: Manual entry without CPF succeeds
- **WHEN** staff enters a contact with only a name and WhatsApp number
- **THEN** the entry succeeds at the `Contato` tier, tagged
  `fonte: staff-manual`

### Requirement: Manual entry reuses existing reconciliation
The system SHALL, when a manually entered WhatsApp number matches an
existing `Contato` or `Cliente` record, reuse that existing record rather
than creating a duplicate.

#### Scenario: Matching number reuses the existing record
- **WHEN** staff enters a contact whose WhatsApp number matches an
  existing record
- **THEN** the existing record is updated, not duplicated

### Requirement: Daily-ops screen summarizes pending approval queues
The system SHALL display, on the staff daily-operations screen, counts of
pending items in the corretor/house-claim approval queue (#189) and the
verification-exception queue (#192), each linking to its own existing
screen, without reimplementing either queue's approve/reject logic.

#### Scenario: Pending counts link to their owning screens
- **WHEN** a staff-level user opens the daily-operations screen and
  pending items exist in either queue
- **THEN** their counts are shown with links to the corresponding
  existing screen
