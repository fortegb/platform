## Context

The scheduled-visit UI (`pages/visita/agendar/[houseId].vue`,
`components/IdentityVerification.vue`) and its backend
(`server/api/visits/schedule.post.ts`, `verify.post.ts`,
`server/services/tuya.service.ts`, `whatsapp.service.ts`) were built before
D-052 (Tuya adapter seam, fallback) and D-053 (visit/identity data model,
`client-match` + `staff-review`, 12-month reuse) closed. The code today:
writes directly to the legacy `visits` table with verification blobs
embedded inline; calls `TuyaService.programPassword()` directly and
swallows failures (`catch` + `console.error`, request still returns
"success"); trusts a client-supplied `verificationData.verified` boolean;
calls `WhatsAppService.sendMessage()` synchronously inside the request
handler; and has no code path at all for a failed `client-match` check
beyond returning an error to the visitor. This leaf re-specifies the
journey so Execução (#81/#80/#77/#135) rebuilds it correctly instead of
extending the stub.

## Goals / Non-Goals

**Goals:**
- Specify the scheduled-visit journey's contract against the D-052 adapter
  seam and D-053 data model, replacing the pre-architecture stub behavior.
- Settle the one question D-053 left open for this specific flow: scheduled
  visits resolve verification exceptions asynchronously.
- Draw a clean boundary with the two adjacent leaves (#187 instant/QR,
  #192 staff-review screen) so none of the three re-specify each other's
  territory.

**Non-Goals:**
- Redesigning the `client-match` capture UI (selfie/document upload) —
  unchanged from what exists; only what happens after a check completes.
- Designing the staff-review screen itself — #192.
- Choosing the exact Tuya adapter implementation (`local-pool` vs.
  `tuya-live`) or the WhatsApp provider — both already deferred to Execução
  by D-052/D-054.
- Reopening D-053's retention split (selfie ephemeral, document 12-month
  window) — considered and explicitly kept as-is during exploration.

## Decisions

**12-month reuse is a real branch in the journey, checked before showing
the verification step.** On landing on the booking form, the backend (or a
pre-check call) looks up the `Cliente` by the WhatsApp/phone entered in
step 1. If `identity_verified_at` is set and within 12 months, step 2
(selfie + document) is skipped entirely and the journey goes straight to
scheduling confirmation. This mirrors D-053's rule literally — "dentro dela,
uma nova visita pula a verificação inteiramente" — which the current code
never implemented (it always shows step 2).

**Access provisioning is a single gated call, not two independent stub
calls.** `schedule.post.ts` currently generates a password locally, then
tries to program the lock and send WhatsApp as two independent best-effort
side effects that don't affect the response. The corrected shape: once
`visit.status` reaches `verified` (either via automatic `client-match` or
via `staff-review` approval), a single call to the adapter's
`provisionAccess(visit)` (D-052) both generates and programs the credential
— the password shown to the visitor and the password on the lock can never
diverge, because there's only one call that produces both. If that call
throws, `visit.status` does **not** advance to `access_provisioned`; the
D-052 fallback (static emergency code + immediate staff WhatsApp alert)
fires instead, and the visitor is told to expect the emergency code via
WhatsApp rather than being shown a password that was never written anywhere.

**Async staff-review, mirrored (inverted) from D-053's instant-flow
pattern.** D-053 already describes an inverted escape hatch for the instant
flow (visitor contacts staff via WhatsApp when declined). For scheduled
visits, the direction is the same escalation mechanism but the trigger is
automatic: a failed/low-confidence `client-match` creates a
`verification_attempt` with `outcome: pending` and enqueues it to the
shared `staff-review` queue (owned by #192), without blocking the booking
request. The visitor's confirmation screen shows a distinct state —
"agendamento recebido, confirmaremos por WhatsApp antes da sua visita" —
instead of the password shown when `access_provisioned`. Staff resolving
the exception (approve/reject in #192's screen) is what advances
`visit.status`; this leaf does not implement that resolution UI, only the
entry into the queue and the pending-state contract on the visitor side.

**Messaging via QStash, one send point.** All three message types this
journey produces — booking-received acknowledgment (if any), the
access-granted message with the password, and the staff alert on
provisioning failure — are queued through QStash (D-054) rather than
called synchronously from `schedule.post.ts`. The route handler's
responsibility ends at enqueueing; delivery is decoupled.

## Risks / Trade-offs

- **[Risk]** The 12-month reuse lookup happens before verification, keyed
  on a phone number the visitor self-reports — a mismatched or reused
  number could either wrongly skip verification for a new person or
  wrongly force a re-verification for the real returning client.
  → **Mitigation:** accepted as the same trust level D-020/D-053 already
  place on the WhatsApp field as the `Cliente` identity key; no new trust
  boundary introduced by this leaf. Tightening that (e.g. requiring CPF
  match too) is a `crm-source-of-truth` concern, not this journey's.
- **[Risk]** Async resolution means a visitor could show up on the visit
  date before staff has resolved the exception.
  → **Mitigation:** out of scope for this leaf to solve with a hard
  deadline/SLA; the pending-state copy sets the expectation
  ("confirmaremos antes da visita"), and staff operational cadence
  (#193 daily-ops leaf) is where a review-SLA would be addressed if it
  becomes a real problem.
- **[Risk]** Splitting responsibility across three leaves (#186 booking
  contract, #192 staff resolution UI, #187 instant flow) risks a gap where
  none of them actually specifies the `verification_attempt` → `visit`
  status transition shared by all three.
  → **Mitigation:** that transition is owned by D-053 itself (already
  specified: `pending_verification → verified → access_provisioned →
  completed/declined`), not re-specified by any journey leaf — each leaf
  only says how it reaches or reacts to a given status.

## Open Questions

None — all open questions raised during exploration (selfie retention,
gating mechanism, messaging routing, 12-month enforcement, async vs. sync
staff-review) were resolved in this leaf's discussion.
