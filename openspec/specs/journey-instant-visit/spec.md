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

### Requirement: Capability purpose is stated
The `journey-instant-visit` capability SHALL declare a written Purpose describing the journey it covers, and SHALL NOT leave it as the `TBD` placeholder emitted by the archive step.

Purpose as written: *the instant / QR self-guided visit journey — a visitor at the house scans the placa QR, identifies and verifies (or confirms phone possession as a returning client), and receives immediate in-session access or an actionable decline. Owns the journey's data rules and screen surfaces under `/visita/qr/[code]/*` end to end.*

#### Scenario: Purpose is read for a fit check
- **WHEN** a change proposes to append a requirement to `journey-instant-visit`
- **THEN** its `Purpose` line names the journey it covers, not `TBD - created by archiving change ...`

### Requirement: Instant-flow verification failure renders as an immediate decline
The instant-visit result screen SHALL render a failed or low-confidence `client-match`, or an incorrect/expired one-time code, as an immediate decline that offers a WhatsApp link to contact staff, and SHALL NOT present it as a pending, loading, or async-acknowledgement state.

The instant flow has no time slack — the visitor is at the door — so it has no equivalent of the scheduled flow's non-blocking "we will confirm before your visit" acknowledgement. Both failure sources (`client-match` and OTP) land on this one decline path.

#### Scenario: Low-confidence match at the door
- **WHEN** `client-match` returns a low-confidence result during an instant/QR visit
- **THEN** the visitor sees a decline with a staff-contact WhatsApp link
- **AND** no pending or loading state is shown waiting for staff

#### Scenario: Wrong one-time code
- **WHEN** a returning visitor enters an incorrect or expired one-time code
- **THEN** the same immediate-decline-with-escape-hatch state is shown, not a distinct error

### Requirement: Reuse-eligible visitors get a phone-OTP screen state
The verification surface SHALL present a WhatsApp one-time-code entry state for a returning `Cliente` within the 12-month reuse window, distinct from the full selfie-plus-document verification state shown to a new visitor.

`identity_verified_at` alone does not grant instant access; confirming phone possession is a screen the visitor must pass through.

#### Scenario: Returning client within the window
- **WHEN** a `Cliente` within the reuse window initiates an instant/QR visit
- **THEN** the verification surface shows the one-time-code entry state, not the full identity-verification state

#### Scenario: Past the reuse ceiling
- **WHEN** the visitor is within the 12-month `identity_verified_at` window but past 24 months from `last_client_match_at`
- **THEN** the one-time-code entry state is not offered
- **AND** the visitor is routed to the full identity-verification state

### Requirement: The instant visit shows its house context
The instant-visit entry screen SHALL display the house the QR code resolves to — name, status, and a link to `/portfolio/[slug]` — rather than a bare title.

#### Scenario: Visitor lands from the placa QR
- **WHEN** a visitor opens `/visita/qr/[code]` for a valid code
- **THEN** the screen shows which house is being visited, its status, and a link to its portfolio page

#### Scenario: House no longer eligible for a self-guided visit
- **WHEN** the resolved house is not `disponivel` (a placa that outlived the status)
- **THEN** the screen explains no self-guided access is available and offers a WhatsApp contact, and does not proceed to verification

### Requirement: Failed access provisioning is visible to the visitor
The instant-visit result screen SHALL distinguish a visit whose access was provisioned from one whose provisioning failed, and SHALL NOT display an access password that was not written to the lock.

#### Scenario: Lock write fails
- **WHEN** `provisionAccess` fails during an instant visit
- **THEN** the result screen shows a staff-alerted state with no password, visually distinct from the granted state

#### Scenario: Provisioning succeeds
- **WHEN** `visit.status` reaches `access_provisioned`
- **THEN** the result screen shows the access password and its validity window

### Requirement: The instant-visit result is addressable and derives from stored status
The instant-visit result SHALL live at a route within the `/visita/qr/[code]/*` namespace so it survives a refresh, and its variant SHALL be selected from the visit's stored status, not encoded in the URL.

#### Scenario: Visitor refreshes the result
- **WHEN** the visitor refreshes the result screen
- **THEN** the same outcome renders, re-resolved from the server by `[code]`

#### Scenario: Outcome encoded in the URL
- **WHEN** a URL attempts to address a specific outcome directly
- **THEN** the screen still renders the variant its stored status dictates, not the one named in the URL

### Requirement: Journeys do not share screens
The instant-visit result SHALL be its own screen under `/visita/qr/[code]/*`, and SHALL NOT reuse the scheduled-visit result screen `/visita/[token]`, even though both display a visit.

#### Scenario: Two token/code-keyed visit screens
- **WHEN** the instant-visit result and the scheduled-visit result both need to show an outcome
- **THEN** each journey renders its own screen; the instant flow does not route to `/visita/[token]`

### Requirement: The instant flow shows step progress
The instant-visit entry and verification surfaces SHALL indicate which step the visitor is on.

#### Scenario: Visitor moves from identify to verification
- **WHEN** the visitor advances from the entry screen to the verification surface
- **THEN** a step indicator reflects the current step across both surfaces

