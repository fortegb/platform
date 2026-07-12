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
Verification outcome SHALL be recorded on the `Cliente` record via two
timestamps: `last_client_match_at` (set only when a full `client-match`
verification completes and approves) and `identity_verified_at` (the
effective reuse-window anchor, initially equal to `last_client_match_at`).
A visit by a `Cliente` whose `identity_verified_at` is within a 12-month
freshness window SHALL skip the `client-match`/`staff-review` verification
step entirely for the scheduled-visit flow. A visit outside that window, or
with no prior verification, SHALL run the normal `client-match`/
`staff-review` flow and set both `last_client_match_at` and
`identity_verified_at` to the approval time.

For the instant/QR flow specifically, a `Cliente` within the 12-month
`identity_verified_at` window SHALL additionally confirm phone possession
via a one-time WhatsApp code (recorded as a `verification_attempt` with
`method: phone-otp`) before access is provisioned — `identity_verified_at`
alone SHALL NOT be sufficient to unlock instant access. A successful
`phone-otp` confirmation SHALL extend `identity_verified_at` to the
confirmation time, but SHALL NOT extend it beyond 24 months past
`last_client_match_at`. Once `last_client_match_at` is more than 24 months
old, `phone-otp` reuse SHALL NOT be offered on the instant flow, and that
visit SHALL run the full `client-match`/`staff-review` flow, resetting both
timestamps on approval.

#### Scenario: Recurring visitor skips re-verification on a scheduled visit
- **WHEN** a `Cliente` with `identity_verified_at` set within the last 12
  months books a scheduled visit
- **THEN** the visit proceeds directly to access provisioning without a new
  `client-match` or `staff-review` step

#### Scenario: Stale verification is not trusted
- **WHEN** a `Cliente`'s `identity_verified_at` is older than 12 months
- **THEN** the visit runs the full verification flow again, regardless of
  flow type

#### Scenario: Instant-flow reuse requires phone-otp, not identity_verified_at alone
- **WHEN** a `Cliente` with `identity_verified_at` within 12 months
  initiates an instant/QR visit
- **THEN** the system requires a successful `phone-otp` confirmation before
  provisioning access, even though the same `Cliente` would skip straight
  to access on a scheduled visit

#### Scenario: Phone-otp extends the window within the ceiling
- **WHEN** a `Cliente`'s `last_client_match_at` is within 24 months and they
  complete `phone-otp` on an instant visit
- **THEN** `identity_verified_at` is set to the confirmation time
- **AND** `last_client_match_at` is unchanged

#### Scenario: Ceiling forces a full re-verification
- **WHEN** a `Cliente`'s `last_client_match_at` is more than 24 months old,
  regardless of how recently `identity_verified_at` was extended by a prior
  `phone-otp` confirmation
- **THEN** `phone-otp` reuse is not offered on the instant flow
- **AND** the visit runs the full `client-match`/`staff-review` flow,
  resetting both `last_client_match_at` and `identity_verified_at` on
  approval

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

