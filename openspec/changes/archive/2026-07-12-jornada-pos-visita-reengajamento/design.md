## Context

Both visit journeys end at credential delivery — no reminder, no
cancel/reschedule path, no follow-up exists in code or in the drafted
jornada docs beyond a single line ("follow-up automático ou manual",
§3.2 step 9, now step 10). #141 (Execução) already captured this gap and
listed its own open questions (channel, timing, copy, consent) without
resolving them. This leaf resolves all four for the parts that are
journey-shape decisions, leaving vendor/copy choices to Execução.

## Goals / Non-Goals

**Goals:**
- Specify pre-visit reminder timing/classification.
- Specify a self-service cancel/reschedule mechanism that needs no visitor
  account, reusing WhatsApp (delivery) and the existing booking flow
  (rescheduling) rather than building new mechanisms where existing ones
  suffice.
- Resolve #141's open consent question using D-054's existing
  transactional/marketing framework.

**Non-Goals:**
- Exact follow-up message copy, exact timing beyond same-day/+24h vs.
  +3 days tiers, or choosing a marketing-automation tool — all Execução
  (#141) or later v2+ (D-018) concerns.
- The corretor-facing view of a cancelled/rescheduled visit — #191.
- Rebuilding the booking flow — reschedule reuses #186 exactly.

## Decisions

**Magic link over WhatsApp-mediated cancellation.** Initially considered
having visitors message staff to cancel (reusing the "contact staff"
pattern from #186/#187/#192, zero new UI) — but explicitly rejected in
favor of self-service: the visitor completes it themselves with no
back-and-forth, and no staff time is spent per cancellation, however rare.
The link is a high-entropy, unguessable token — not a small/derivable
code — attached to the visit at booking time. It carries no separate
expiry timer; it's simply valid as long as the visit hasn't reached a
terminal state (`completed`, `cancelled`, `declined`) or the scheduled
time hasn't passed, avoiding a second, arbitrary TTL to manage.

**The link rides on existing messages, not a new send.** It's appended to
the booking-confirmation WhatsApp message (already sent by #186) and
repeated on the pre-visit reminder (new in this leaf) — no additional
message type, no new trigger condition.

**`cancelled` is a new, distinct terminal status — additive, not a
modification to `visit-identity-verification`.** That capability's Purpose
is scoped to verification mechanism/gating, not the full visit lifecycle;
it never claims to enumerate every terminal status. Adding `cancelled`
alongside the already-informal `completed`/`declined` outcomes doesn't
touch any of its requirements — nothing there gates on the *absence* of a
`cancelled` value. Folding cancellation into `declined` was considered and
rejected: `declined` currently means "failed verification," a security-
relevant signal; conflating it with "visitor changed their mind" would
make that signal noisy for no benefit.

**Cancelling after `access_provisioned` revokes the credential.** D-052
already named `revoke(credential)` in the adapter interface but nothing
called it — a live door code should never outlive a visit the visitor
explicitly cancelled. This is the first concrete caller of that function,
not a change to the adapter's contract.

**Reschedule = cancel + rebook, not edit-in-place.** Mirrors the same
reasoning already used in this leaf's own cancel design and in prior
leaves' preference for reusing an existing mechanism over inventing a
parallel one: the management page's "Remarcar" button cancels the current
visit (same path as above) and hands off into the normal #186 booking
form, pre-filled with the visitor's known details. Verification reuse
(12-month window, or the instant-flow OTP gate if they end up on that
flow) applies exactly as it would for any fresh booking — no special
casing.

**Post-visit follow-up consent follows D-054's existing split, not a new
one.** Same-day and +24h messages are framed as service check-ins tied to
the specific visit the person just took ("como foi sua visita?") —
transactional, covered by the same mandatory-WhatsApp-field basis every
other transactional message in this project already uses. +3 days and
beyond, or anything with a sales/nurture framing (similar listings,
"ainda interessado?"), is marketing — requires the explicit, off-by-default
opt-in D-054 already scoped (and left unbuilt, v2+). This leaf only draws
the line; it doesn't build the marketing side.

**Staff Telegram alert on cancel/reschedule.** Same internal-notification
shape as #192 — no external party involved, so it's Telegram not WhatsApp
per D-054's already-settled split, applied here rather than re-argued.

## Risks / Trade-offs

- **[Risk]** A leaked or forwarded management link lets someone else
  cancel a visitor's booking.
  → **Mitigation:** accepted at this scale and this action's stakes —
  worst case is an unwanted cancellation, not a security/access breach
  (cancelling revokes access, it never grants it); high-entropy tokens
  make guessing infeasible, and this is the same trust model already
  accepted for the visit's own access-delivery WhatsApp message, which
  contains a working door code.
- **[Risk]** No rate limit or audit trail specified for how many times a
  link can be used before the visit's terminal state naturally invalidates
  it.
  → **Mitigation:** out of scope for this leaf; low real-world risk at
  this visit volume, revisit only if it becomes an actual problem — same
  proportionality reasoning applied throughout this epic.

## Open Questions

None — the mechanism question (self-service vs. WhatsApp-mediated) and the
follow-up consent classification were both settled during exploration.
