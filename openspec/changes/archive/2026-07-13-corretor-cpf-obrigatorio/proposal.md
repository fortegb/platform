## Why

D-062 (`journey-corretor-onboarding`, #189) requires WhatsApp on the
corretor's profile and leaves CRECI optional, but never requires the
corretor's own CPF. That's a real gap: #190 (client registration and
commission protection) implies ForteGB eventually pays the corretor a
commission, and paying an individual (pessoa física) in Brazil normally
requires a CPF on file. No current leaf models the payout mechanism
itself, but the profile-fill step at registration is the natural point to
close this gap rather than retrofitting it later once corretores already
have live accounts and outstanding commissions.

## What Changes

- **Modifies `journey-corretor-onboarding`:** the "Account registration
  collects profile and creates a pending corretor" requirement adds CPF as
  a second mandatory profile field alongside WhatsApp (CRECI stays
  optional, unchanged).
- **Reopens D-062**, logged explicitly (same treatment #187 gave D-053 and
  #189 itself gave `crm-source-of-truth`) — not a new decision from
  scratch, a correction to a closed one.
- No payout mechanism is designed here — this only ensures the data point
  exists by the time a commission-payout feature is built.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `journey-corretor-onboarding`: "Account registration collects profile
  and creates a pending corretor" requirement gains a mandatory CPF field;
  scenario coverage adds CPF validation alongside the existing WhatsApp
  requirement.

## Impact

- Frontend: corretor signup/profile step (`pages/login.vue` or dedicated
  onboarding flow, per D-062) gains a required CPF input with format
  validation.
- Backend: corretor registration endpoint requires and persists CPF on
  the corretor profile record.
- Depends on D-062 (existing onboarding flow) and D-055 (role model,
  unchanged) — implementation is Execução (#86, #50), same as the rest of
  D-062.
- **Explicitly out of scope:** the commission payout mechanism itself,
  CPF collection for any role other than corretor, uniqueness/dedupe
  rules beyond basic format validation.
