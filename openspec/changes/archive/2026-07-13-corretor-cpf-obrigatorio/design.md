## Context

D-062 defined the corretor account-registration requirement: profile
collection with WhatsApp mandatory and CRECI optional, gating
`corretor.status = pending_approval`. It never considered CPF, because no
leaf in Passo 5 modeled how a corretor gets paid — #190 (client
registration/commission protection) only established that ForteGB tracks
which corretor is owed a commission, not how that commission is disbursed.
Paying a pessoa física in Brazil requires a CPF on file; without it, an
approved corretor could reach a payable commission state with no way to
actually pay them.

## Goals / Non-Goals

**Goals:**
- Add CPF as a second mandatory field on the corretor profile, collected
  at the same registration step as WhatsApp (D-062), so the data exists
  before it's needed.
- Keep the change additive to the existing requirement — same
  registration step, same pending-approval gate, no new states or pages.

**Non-Goals:**
- Designing the commission payout mechanism itself — out of scope, not
  modeled by any current leaf.
- CPF collection for any other role (cliente, staff) — cliente-side CPF
  was already decided separately in D-063 (#190) and is untouched here.
- Uniqueness/dedupe or third-party CPF validation services — basic format
  validation only, same rigor already implied for D-063's cliente CPF.

## Decisions

**CPF is required at registration, not deferred to approval or first
payout.** The profile-fill step (D-062) is already the point where
WhatsApp is required and the corretor is actively filling out their
information — asking for CPF later (e.g. at first commission) means
chasing an already-active corretor for a field that was always knowable
upfront. Collecting it now costs nothing extra in the flow (one more
field on the same form) and avoids a second collection touchpoint that
doesn't exist anywhere else in the platform.

**No new `corretor.status` value or approval-queue change.** CPF presence
is a form-validation concern (required field, same as WhatsApp), not an
approval criterion beyond what already exists — staff still approves or
rejects the whole application as one decision on `/staff/corretores`,
unchanged from D-062.

## Risks / Trade-offs

- [Format-only CPF validation accepts syntactically valid but fabricated
  numbers] → Mitigation: same bar already accepted for D-063's cliente
  CPF; verifying real payout eligibility is a task for whatever payout
  mechanism gets built later, not this leaf.
