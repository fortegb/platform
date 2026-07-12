## MODIFIED Requirements

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
