# journey-instant-visit Specification

## Purpose
The instant / QR self-guided visit journey — a visitor at the house scans the placa QR, identifies and verifies (or confirms phone possession as a returning client), and receives immediate in-session access or an actionable decline. Owns the journey's data rules and screen surfaces under `/visita/qr/[code]/*` end to end.
## Requirements
### Requirement: Reuse-eligible visitors confirm phone possession before instant access
The system SHALL, for a `Cliente` within the 12-month `identity_verified_at`
reuse window who initiates an instant/QR visit, require confirmation of
phone possession via a short-lived WhatsApp one-time code before calling
`provisionAccess`, in addition to the reuse window check itself.

#### Scenario: Reuse-eligible visitor completes OTP
- **WHEN** a `Cliente` with `identity_verified_at` within 12 months scans a
  QR code and enters the WhatsApp one-time code sent to their registered
  number
- **THEN** the journey proceeds to access provisioning without running
  `client-match`

#### Scenario: identity_verified_at alone is not sufficient for this flow
- **WHEN** a `Cliente` is within the reuse window but has not yet entered a
  valid one-time code
- **THEN** the system does not call `provisionAccess`

### Requirement: Instant-flow verification failure declines immediately
The system SHALL, when `client-match` fails or returns low confidence
during an instant/QR visit, decline access immediately and present a
WhatsApp link for the visitor to contact staff directly, without holding
the visitor in a synchronous wait for review.

#### Scenario: Visitor is not left waiting on a spinner
- **WHEN** `client-match` returns a low-confidence result during an
  instant/QR visit
- **THEN** the visitor immediately sees a decline with a staff-contact
  WhatsApp link
- **AND** the system does not display a pending/loading state waiting for
  staff

#### Scenario: OTP failure uses the same decline path
- **WHEN** a visitor enters an incorrect or expired one-time code
- **THEN** the same immediate-decline-with-escape-hatch path used for a
  failed `client-match` is shown

### Requirement: Access provisioning is gated on persisted verification state
The system SHALL provision physical access for an instant visit only after
`visit.status` has been persisted as `verified` on the server, and SHALL
NOT accept a client-supplied verification flag as sufficient grounds to
provision access.

#### Scenario: Server re-derives verification state
- **WHEN** the instant-access request includes verification or OTP data
- **THEN** the server determines `visit.status` from its own persisted
  `verification_attempt` outcome, not from a boolean supplied in the
  request body

#### Scenario: Provisioning call is singular and gated
- **WHEN** `visit.status` reaches `verified`
- **THEN** exactly one call to the access adapter's `provisionAccess(visit)`
  both generates and programs the credential

### Requirement: Provisioning failure never presents as success
The system SHALL treat a failed `provisionAccess` call on an instant visit
as a failed provisioning attempt — triggering the access adapter's fallback
— and SHALL NOT advance `visit.status` to `access_provisioned` or show the
visitor a credential when the call fails.

#### Scenario: Lock write fails during instant access
- **WHEN** `provisionAccess(visit)` throws or times out during an instant
  visit
- **THEN** `visit.status` does not advance to `access_provisioned`
- **AND** the fallback fires
- **AND** the visitor is not shown a password that was never programmed

### Requirement: Confirmation and OTP messages are queued
The system SHALL dispatch the access-granted WhatsApp message, the OTP
code, and the staff provisioning-failure alert produced by this journey
through the platform's asynchronous job queue, not synchronously within
the instant-access request handler.

#### Scenario: OTP send does not block the request handler
- **WHEN** a reuse-eligible visitor requests an instant visit
- **THEN** the one-time code is queued for asynchronous WhatsApp delivery
- **AND** the request handler's response does not wait on the messaging
  provider's API call

