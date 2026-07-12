## Why

The scheduled-visit journey (agendamento → verificação de identidade → acesso
Tuya → confirmação WhatsApp) predates both domain-architecture decisions it
depends on (D-052 Tuya, D-053 visits/identity) and was never rebuilt against
them. `screen-map.md` flags it `RASCUNHO — re-validar no passo 5`. Re-
validating it surfaced structural gaps, not cosmetic ones: the current code
writes to the legacy `visits` table D-053 replaced, provisions access via a
raw inline Tuya stub that can silently "succeed" even when the lock write
fails, trusts a client-supplied `verified` boolean instead of a server-
persisted gate, sends WhatsApp synchronously instead of via QStash, never
checks the 12-month verification-reuse window D-053 already granted
returning clients, and has no staff-review exception path at all — despite
D-053 naming that queue as the mechanism for handling a failed automated
check.

## What Changes

- Re-validate and correct the scheduled-visit journey to consume the D-052
  adapter seam and D-053 data model/retention/reuse rules correctly, instead
  of the pre-architecture stub implementation currently in place.
- **New:** returning `Cliente` records with `identity_verified_at` inside the
  12-month window skip identity verification entirely on a new booking
  (D-053's reuse rule, never implemented).
- **New:** access provisioning is gated on a server-persisted
  `visit.status = verified`, calls the D-052 adapter's `provisionAccess`
  (not a raw Tuya stub), and treats a provisioning failure as a real failure
  — triggering the D-052 fallback (static emergency code + immediate staff
  WhatsApp alert) — never a silent "success" with an unprovisioned password.
- **New:** a failed or low-confidence `client-match` check routes the
  booking into the shared `staff-review` exception queue, resolved
  **asynchronously** — the client sees a "confirmaremos por WhatsApp antes
  da visita" pending state, not a synchronous wait, since a scheduled visit
  (booked ≥1 day ahead) has slack an instant/QR visit doesn't. (D-053 only
  specified synchronous-wait avoidance for the *instant* flow; this leaf
  settles the equivalent question for *scheduled*.)
- **New:** confirmation and staff-escalation messages route via QStash
  (D-054), not a synchronous call inside the booking request handler.
- Data model moves off the legacy `visits` table onto D-053's three-entity
  model (`Cliente.identity_verified_at`, `verification_attempt`, `visit`),
  with the per-artifact retention D-053 already decided (selfie deleted on
  approval; document retained only for the active verification window) —
  confirmed as-is after discussion, not reopened.
- **Explicitly out of scope:** the staff-side review screen itself (selfie
  vs. document side-by-side, approve/reject) is a separate leaf
  ([#192](https://github.com/fortegb/platform/issues/192)) — this journey
  only specifies that a failed check *enters* that queue and that its
  resolution unlocks the same `provisionAccess` path as automatic approval.
  The instant/QR visit flow is also a separate leaf
  ([#187](https://github.com/fortegb/platform/issues/187)).

## Capabilities

### New Capabilities
- `journey-scheduled-visit`: defines the validated scheduled-visit journey
  from the `Cliente`'s perspective — booking, verification (with 12-month
  reuse), the async staff-review escalation path, gated access provisioning,
  and QStash-routed confirmation — consuming `tuya-access` and
  `visit-identity-verification` without changing their requirements.

### Modified Capabilities
(none — `tuya-access`, `visit-identity-verification`, and
`messaging-channel-policy` already state the relevant contracts correctly;
this journey is the first consumer to actually implement them instead of
the pre-architecture stubs)

## Impact

- Frontend: `pages/visita/agendar/[houseId].vue` (add reuse-skip branch,
  async pending state), `components/IdentityVerification.vue` (no change to
  the capture UI itself, only what happens after a failed check).
- Backend: `server/api/visits/schedule.post.ts` and `verify.post.ts`
  (rewritten against the three-entity model and the hard gate),
  `server/services/tuya.service.ts` (wrapped behind the D-052 adapter seam
  instead of called directly), `server/services/whatsapp.service.ts`
  (routed via QStash per D-054).
- Depends on `tuya-access` (D-052) and `visit-identity-verification` (D-053)
  being implemented at the adapter/data-model level — this leaf specifies
  the journey's contract against them; actual implementation is Execução
  (#81, #80, #77/#135).
- No changes to the discovery journey (#185, already closed) or the
  instant/QR and staff-review-screen leaves (#187, #192).
