# journey-scheduled-visit Specification

## Purpose
TBD - created by archiving change jornada-visita-agendada. Update Purpose after archive.
## Requirements
### Requirement: Returning verified clients skip identity verification
The system SHALL skip the identity-verification step of the scheduled-visit
journey when the `Cliente` matched by the visitor's WhatsApp number has an
`identity_verified_at` timestamp within the last 12 months, proceeding
directly to scheduling confirmation.

#### Scenario: Returning client within the reuse window
- **WHEN** a visitor books a scheduled visit and their `Cliente` record has
  `identity_verified_at` set to 6 months ago
- **THEN** the journey skips the selfie/document step entirely
- **AND** proceeds directly to scheduling confirmation

#### Scenario: Returning client outside the reuse window
- **WHEN** a visitor's `Cliente` record has `identity_verified_at` set to 13
  months ago
- **THEN** the journey runs the full identity-verification step as if they
  were new

### Requirement: Access provisioning is gated on persisted verification state
The system SHALL provision physical access for a scheduled visit only after
`visit.status` has been persisted as `verified` on the server, and SHALL
NOT accept a client-supplied verification flag as sufficient grounds to
provision access.

#### Scenario: Server re-derives verification state
- **WHEN** the booking request includes verification data
- **THEN** the server determines `visit.status` from its own persisted
  `verification_attempt` outcome, not from a boolean supplied in the
  request body

#### Scenario: Provisioning call is singular and gated
- **WHEN** `visit.status` reaches `verified`
- **THEN** exactly one call to the access adapter's `provisionAccess(visit)`
  both generates and programs the credential
- **AND** no credential is shown to the visitor before that call succeeds

### Requirement: Provisioning failure never presents as success
The system SHALL treat a failed `provisionAccess` call as a failed
provisioning attempt — triggering the access adapter's fallback (static
emergency code and an immediate staff WhatsApp alert) — and SHALL NOT
advance `visit.status` to `access_provisioned` or show the visitor a
credential when the call fails.

#### Scenario: Lock write fails
- **WHEN** `provisionAccess(visit)` throws or times out
- **THEN** `visit.status` does not advance to `access_provisioned`
- **AND** the fallback (emergency code + staff WhatsApp alert) fires
- **AND** the visitor is not shown a password that was never programmed

### Requirement: Failed verification escalates asynchronously
The system SHALL, when the automated `client-match` check fails or returns
low confidence for a scheduled visit, create a `verification_attempt` with
a pending outcome and route it to the shared `staff-review` queue without
blocking the booking request or requiring the visitor to wait
synchronously for resolution.

#### Scenario: Automated check fails, booking still completes
- **WHEN** `client-match` returns a low-confidence result during a
  scheduled-visit booking
- **THEN** the booking request completes and the visitor sees a pending
  confirmation state, not an error
- **AND** a `verification_attempt` is enqueued to the `staff-review` queue

#### Scenario: Staff resolution unlocks the normal access path
- **WHEN** staff approves a pending `verification_attempt` (via the
  separate staff-review screen)
- **THEN** `visit.status` advances to `verified`
- **AND** the same `provisionAccess` path used for automatic approval runs
  — no ad hoc credential is issued as a shortcut

### Requirement: Confirmation and escalation messages are queued
The system SHALL dispatch the access-granted WhatsApp message and the
staff provisioning-failure alert produced by this journey through the
platform's asynchronous job queue, not synchronously within the booking
request handler.

#### Scenario: Booking request does not block on message delivery
- **WHEN** a scheduled visit reaches `access_provisioned`
- **THEN** the WhatsApp message carrying the access credential is queued
  for asynchronous delivery
- **AND** the booking request's response does not wait on the messaging
  provider's API call

### Requirement: Skipped verification is shown, not silent
The scheduling screen SHALL tell a returning client that identity verification was skipped and why, when the 12-month reuse window applies.

#### Scenario: Returning client within the reuse window
- **WHEN** the WhatsApp number entered matches a `Cliente` whose `identity_verified_at` is within 12 months
- **THEN** the screen advances straight to scheduling confirmation and states that the previous identity verification is still valid, rather than jumping a step with no explanation

### Requirement: Pending staff review renders as an acknowledgement
The scheduling screen SHALL render a pending-review state as a successful receipt of the booking, and SHALL NOT present it as a failure or return the visitor to the form.

#### Scenario: Automatic match fails or is low-confidence
- **WHEN** `client-match` fails or returns low confidence for a scheduled visit
- **THEN** the screen confirms the booking was received and states that confirmation will arrive by WhatsApp before the visit date, with no access password shown and no error styling

### Requirement: Failed access provisioning is visible to the visitor
The confirmation screen SHALL distinguish a booking whose access was provisioned from one whose provisioning failed, and SHALL NOT display an access password that was not written to the lock.

#### Scenario: Provisioning call fails
- **WHEN** `provisionAccess(visit)` fails and the D-052 fallback fires
- **THEN** the screen shows the visit as booked with access pending, states that staff were alerted and will send access details by WhatsApp, and shows no password

#### Scenario: Provisioning succeeds
- **WHEN** the visit reaches `access_provisioned`
- **THEN** the screen shows the access password alongside the date, time, and address

### Requirement: Multi-step scheduling shows progress and allows return
The scheduling flow SHALL indicate which step the visitor is on and SHALL allow returning to the previous step before submission.

#### Scenario: Visitor mistypes a phone number
- **WHEN** a visitor has advanced to the identity-verification step and needs to correct a field from the form step
- **THEN** the flow offers a path back to the form with entered values preserved

### Requirement: The booking result is addressable
The scheduled-visit result SHALL live at its own token-keyed route so it survives a page refresh and can be linked from the WhatsApp confirmation message.

#### Scenario: Visitor opens the link from WhatsApp
- **WHEN** a visitor follows the confirmation link sent after booking
- **THEN** the result screen loads showing that visit's current state, without the visitor re-entering any details

#### Scenario: Visitor refreshes the result screen
- **WHEN** a visitor reloads the result route
- **THEN** the screen renders the same state, rather than losing it to component-local step state

### Requirement: Result variant derives from stored visit status
The result screen SHALL select its variant from the visit's stored status, and the outcome SHALL NOT be addressable independently of that status.

#### Scenario: Outcome encoded in the URL
- **WHEN** a route shape would let a visitor open a "confirmed" result for a visit whose stored status is pending review
- **THEN** that shape is rejected in favour of one token-keyed route whose variant is derived server-side

### Requirement: Journeys do not share screens
A screen SHALL belong to exactly one journey, and a second journey needing a similar surface SHALL get its own screen.

#### Scenario: Two token-keyed visit screens
- **WHEN** the scheduled-visit journey needs a booking-result screen and the post-visit journey needs a manage-booking screen
- **THEN** each journey owns its own route (`/visita/[token]` and `/visita/gerenciar/[token]` respectively) rather than negotiating a shared one

