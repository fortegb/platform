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

