## Why

Both visit journeys (#186 scheduled, #187 instant/QR) defer their
verification-exception resolution to a shared `staff-review` queue that,
until now, had no consuming UI at all — not a stub, not a draft, nothing.
D-053 already fully specifies the queue's mechanics (automatic creation on
low `client-match` confidence, `verification_attempt` recording, the hard
gate before `provisionAccess`); D-056 already names this exact screen
(comparing a selfie against a document photo for a human match call) as its
canonical example of custom UI being justified. This leaf closes the loop
those two decisions and the two visitor-facing journeys left open, without
reopening either.

## What Changes

- **New:** a `/staff/*` screen where staff lists pending
  `verification_attempt` records, reviews the selfie and document photo
  side by side for a given attempt, and approves or rejects it.
- **New:** the queue lists both flows' pending exceptions together (per
  D-053's shared-queue design) but surfaces instant/QR items ahead of
  scheduled ones — only the instant flow can have a visitor still
  physically waiting when an exception lands, so flow type is a real
  urgency signal, not just FIFO by timestamp.
- **New:** approval records `verification_attempt` with `method:
  staff-review, outcome: approved` and triggers the same `provisionAccess`
  path already specified for automatic approval (#186/#187) — no separate
  or ad hoc access-granting mechanism.
- **New:** rejection was previously unspecified for the visitor's
  experience — D-053 only detailed the approve path. This leaf specifies
  that a reject moves `visit.status` to `declined` and queues a WhatsApp
  message (D-054) explaining the outcome, rather than leaving the visitor
  with no resolution signal at all.
- **New:** a new pending `verification_attempt` triggers a Telegram alert
  to staff (not WhatsApp) — this is a purely internal notification, no
  visitor is a party to it, so it falls on the internal side of D-054's
  already-decided direction-based channel split. This resolves a latent
  inconsistency between D-052's literal "alerta a staff via WhatsApp" text
  (written for the Tuya-failure case, before D-054 existed) and D-054's
  later general rule — D-054 itself names this exact reconciliation as its
  purpose, so applying Telegram here is following the settled rule, not
  making a new one. The alert is a "go look" ping with a link into the
  queue, not an inline approve/reject action inside the chat — one
  notification per new item, no batching, proportional to this business's
  actual visit volume.
- RBAC gating consumes the already-decided model as-is: `/staff/*`
  namespace, `staff`-level access (admin passes by hierarchy), two-layer
  enforcement (D-055) — no new role or permission concept introduced.
- **No changes to `visit-identity-verification` or `rbac-role-model`** —
  this leaf is a consumer of both, not a modifier.

## Capabilities

### New Capabilities
- `journey-staff-verification-review`: defines the staff-facing exception-
  queue screen — listing, flow-type-aware prioritization, the side-by-side
  review UI's data contract, and the approve/reject outcomes (including the
  previously-unspecified reject-notifies-visitor behavior) — consuming
  `visit-identity-verification`, `tuya-access`, `messaging-channel-policy`,
  and `rbac-role-model` without changing any of their requirements.

### Modified Capabilities
(none)

## Impact

- Frontend: new `/staff/visitas/excecoes` page (per `screen-map.md`'s
  existing route reservation) with a selfie/document comparison view, plus
  a `/staff/*`-scoped auth middleware (new — no staff-side middleware
  exists yet, unlike `middleware/realtor-auth.ts` for corretores).
  D-056 explicitly justifies this as custom UI, not deferred to a vendor
  dashboard.
- Backend: approve/reject endpoints that write `verification_attempt`,
  advance `visit.status`, and (on approve) call the existing
  `provisionAccess` path; a queued WhatsApp send on reject.
- Depends on the `Cliente`/`verification_attempt`/`visit` data model and
  `provisionAccess` adapter already specified by D-052/D-053/D-058/D-059 —
  this leaf specifies the staff-facing contract; implementation is
  Execução (#80, #86 portal corretor/staff shell if shared, #50 for RLS).
- **Explicitly out of scope:** `#193` (staff daily-ops overview — today's
  visits, recent clients, manual lead entry) is a separate leaf; this
  queue's items may surface there contextually, but that screen is not
  built here. `#194` (Tuya emergency-code management, Supabase Studio per
  D-052/D-056) and `#195` (admin-only platform config) are unrelated
  screens under the same `/staff/*`/`/admin` namespace but out of scope.
