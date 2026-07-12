# visit-identity-verification Specification

## Purpose
Defines how the platform verifies a guided-visit visitor's identity — mechanism, exception handling, reuse, and retention — and how that verification gates physical access provisioning.

## Requirements
### Requirement: Single verification mechanism for both visit flows
The system SHALL use `client-match` (client-side comparison of a selfie photo against a document photo) as the primary identity-verification mechanism for both the scheduled and instant/QR guided-visit flows. The system SHALL NOT use a different primary verification mechanism per flow, and SHALL NOT require a paid KYC SaaS as the primary mechanism.

#### Scenario: Instant flow uses the same mechanism as scheduled
- **WHEN** a visitor's identity is verified for either a scheduled or an instant/QR visit
- **THEN** the same `client-match` mechanism performs the initial verification in both cases

### Requirement: Shared staff-review exception queue
`staff-review` SHALL be the shared exception path for both visit flows, triggered either automatically when `client-match` confidence is low, or by the visitor contacting staff directly. Every `staff-review` resolution, regardless of trigger, SHALL be recorded as a `verification_attempt` before any access credential is provisioned. Staff SHALL NOT issue an access credential (from the local-pool or the D-052 emergency-code mechanism) as a substitute for recording and approving a verification attempt.

#### Scenario: Staff approves via WhatsApp
- **WHEN** a visitor contacts staff directly because an instant verification was declined, and staff manually reviews and approves photos sent over WhatsApp
- **THEN** the system records a `verification_attempt` with `method: staff-review` and `outcome: approved`
- **AND** only after that record exists does the system call the access-provisioning adapter

### Requirement: Instant-flow failure has no synchronous staff wait
When `client-match` fails or is inconclusive during an instant/QR visit, the system SHALL decline immediately without holding the visitor in a synchronous wait for staff review. The decline SHALL include a way for the visitor to contact staff directly (e.g. WhatsApp) as an optional next step, not a blocking in-flow state.

#### Scenario: Instant visitor is not left waiting on a spinner
- **WHEN** `client-match` returns a low-confidence or failed result during an instant/QR visit
- **THEN** the visitor immediately receives a decline with a staff-contact option
- **AND** the system does not hold the visitor in a pending/loading state waiting for a staff response

### Requirement: Verification reuse via Cliente identity
Verification outcome SHALL be recorded on the `Cliente` record (`identity_verified_at`), not solely on the individual visit. A visit by a `Cliente` whose `identity_verified_at` is within a 12-month freshness window SHALL skip the verification step entirely. A visit outside that window, or with no prior verification, SHALL run the normal `client-match`/`staff-review` flow and update `identity_verified_at` on approval.

#### Scenario: Recurring visitor skips re-verification
- **WHEN** a `Cliente` with `identity_verified_at` set within the last 12 months books another visit
- **THEN** the visit proceeds directly to access provisioning without a new `client-match` or `staff-review` step

#### Scenario: Stale verification is not trusted
- **WHEN** a `Cliente`'s `identity_verified_at` is older than 12 months
- **THEN** the visit runs the full verification flow again

### Requirement: Retention differs by artifact
The selfie photo captured for verification SHALL be deleted immediately upon approval, and retained no longer than 30 days when the outcome is rejected or went through the exception queue. The document photo (RG/CNH) SHALL be retained for as long as the verification it backs remains within the 12-month freshness window, and SHALL be deleted and replaced when that verification is renewed or expires.

#### Scenario: Selfie does not outlive an approved verification
- **WHEN** a verification attempt is approved
- **THEN** the associated selfie photo is deleted immediately
- **AND** the associated document photo is retained while `identity_verified_at` remains within its freshness window

### Requirement: Access provisioning is gated by verification
The system SHALL NOT call the access-provisioning adapter (`provisionAccess`, per the `tuya-access` capability) for a visit until that visit's status is `verified`. Verification and access provisioning SHALL NOT run in parallel, and access SHALL NOT be provisioned for a visit that has not reached `verified` status.

#### Scenario: Access is never provisioned before verification
- **WHEN** a visit is in the `pending_verification` status
- **THEN** the system does not call `provisionAccess` for that visit
- **AND** it only does so after the visit transitions to `verified`

