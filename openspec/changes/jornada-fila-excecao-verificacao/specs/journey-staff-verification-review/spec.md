## ADDED Requirements

### Requirement: Staff can list pending verification exceptions
The system SHALL present staff-level users with a list of `verification_attempt`
records in the `pending` outcome state, spanning both the scheduled and
instant/QR visit flows.

#### Scenario: Staff sees pending exceptions from both flows
- **WHEN** a staff-level user opens the exception queue
- **THEN** pending `verification_attempt` records from both scheduled and
  instant/QR visits appear in the same list

### Requirement: Queue prioritizes instant/QR items over scheduled ones
The system SHALL order the exception queue so that pending
`verification_attempt` records originating from an instant/QR visit are
shown ahead of those from a scheduled visit, regardless of creation
timestamp.

#### Scenario: Instant item surfaces first despite being created later
- **WHEN** the queue contains a scheduled-visit exception created earlier
  and an instant/QR exception created later
- **THEN** the instant/QR exception is listed first

### Requirement: Staff reviews selfie and document side by side
The system SHALL, for a selected pending `verification_attempt`, display
the associated selfie photo and document photo side by side for staff to
make an approve/reject judgment.

#### Scenario: Both images are visible for comparison
- **WHEN** staff opens a pending `verification_attempt` for review
- **THEN** the selfie and document photo are both displayed in the same
  view

### Requirement: Approval unlocks the standard access-provisioning path
The system SHALL, when staff approves a pending `verification_attempt`,
record it with `method: staff-review` and `outcome: approved`, advance the
associated `visit.status` to `verified`, and call the same
`provisionAccess` path used for automatic approval — no separate or ad hoc
access-granting mechanism.

#### Scenario: Approved exception provisions access normally
- **WHEN** staff approves a pending exception
- **THEN** `visit.status` advances to `verified`
- **AND** `provisionAccess(visit)` is called through the same adapter path
  as an automatic approval

### Requirement: Rejection notifies the visitor
The system SHALL, when staff rejects a pending `verification_attempt`,
record the rejection, advance `visit.status` to `declined`, and queue a
WhatsApp message to the visitor explaining the outcome.

#### Scenario: Rejected visitor receives a message
- **WHEN** staff rejects a pending exception
- **THEN** `visit.status` advances to `declined`
- **AND** a WhatsApp message explaining the rejection is queued for the
  visitor, not left unsent

### Requirement: Screen is restricted to staff-level access
The system SHALL restrict the exception-queue screen and its approve/reject
actions to users with `staff`-level access or higher (per the RBAC
hierarchy where `admin` passes any `staff`-level check), enforced at both
the application-routing layer and the data layer.

#### Scenario: A non-staff user cannot reach the queue
- **WHEN** a user without `staff` or `admin` role attempts to access the
  exception-queue screen
- **THEN** access is denied
