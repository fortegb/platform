## Why

The instant/QR visit journey (placa → QR → micro-página → verificação →
acesso imediato) predates D-052 (Tuya) and D-053 (visits/identity), same as
the scheduled journey did before #186. Re-validating it found the same
category of structural gaps #186 fixed (legacy `visits` table, a raw Tuya
call that silently "succeeds" on failure, a client-trusted verification
boolean, synchronous WhatsApp, no 12-month reuse check), plus one genuinely
new design question specific to this flow: the 12-month reuse shortcut is
safe for scheduled visits because staff has a calendar entry and days of
lead time to notice a mismatch, but for instant/QR there's zero human
awareness between a reuse match and the door unlocking. This leaf resolves
that gap with a phone-possession check (WhatsApp one-time code) gating
reuse specifically for this flow, and — because the discussion also
surfaced a real question about how long that lighter check can substitute
for full re-verification — a bounded extension mechanism on top of D-053's
existing reuse window.

## What Changes

- Re-validate and correct the instant/QR journey against the D-052 adapter
  seam and D-053 data model, mirroring #186's fixes (three-entity model,
  gated single-call `provisionAccess`, no-silent-success on failure, QStash
  messaging) adapted to this flow's specifics.
- **New:** instant-flow failure handling implements D-053's already-decided
  rule literally for the first time — immediate decline with a WhatsApp
  staff-contact escape hatch, no synchronous wait — as opposed to #186's
  async "we'll confirm before your visit" pending state, since a visitor at
  the door has no useful "later" to wait on.
- **New:** the 12-month reuse shortcut (D-053) is gated, for this flow only,
  behind a WhatsApp one-time-code confirmation of phone possession —
  `identity_verified_at` alone is not sufficient to unlock instant access,
  unlike the scheduled flow (#186) where it is.
- **New (modifies `visit-identity-verification`, reopens D-053):** a
  successful OTP confirmation extends `identity_verified_at`, but only up
  to a hard ceiling of 24 months since the `Cliente`'s last actual
  `client-match` verification (tracked via a new `last_client_match_at`
  field). Past that ceiling, OTP-based reuse is no longer offered and a
  full `client-match` re-verification runs, resetting both timestamps. This
  guarantees periodic re-verification while reducing friction for frequent
  visitors — resolving a real gap in D-053, which specified 12-month reuse
  but never addressed how a lighter, repeatable check should interact with
  that window's integrity.
- OTP method recorded as a new `verification_attempt.method` value
  (`phone-otp`), alongside the existing `client-match`/`staff-review`
  values D-053 already defined — no new entity needed.
- **No change to the scheduled flow (#186):** its reuse logic still reads
  only `identity_verified_at` unconditionally; the new `last_client_match_at`
  field is additive and doesn't alter #186's already-closed behavior.
- **Explicitly out of scope:** the staff-review screen ([#192](https://github.com/fortegb/platform/issues/192));
  condomínio/portaria access (Q-017, [#140](https://github.com/fortegb/platform/issues/140), already deferred to Execução);
  the physical media kit (QR plaque itself, [#98](https://github.com/fortegb/platform/issues/98)/[#100](https://github.com/fortegb/platform/issues/100)) — this journey assumes the QR exists and consumes it.

## Capabilities

### New Capabilities
- `journey-instant-visit`: defines the validated instant/QR visit journey
  from the `Cliente`'s perspective — QR landing, the reuse-vs-full-
  verification branch (including the OTP sub-flow), immediate-decline
  failure handling with a staff escape hatch, and gated access provisioning
  — consuming `tuya-access` and the modified `visit-identity-verification`.

### Modified Capabilities
- `visit-identity-verification`: the "Verification reuse via Cliente
  identity" requirement is modified to introduce `last_client_match_at` as
  a second timestamp (set only by a full `client-match` approval) and to
  specify the bounded OTP-extension mechanism for the instant flow's reuse
  gate, capped at 24 months since the last full verification. This is a
  reopening of D-053, logged explicitly (not a silent scope-creep through
  this journey leaf).

## Impact

- Frontend: `pages/visita/qr/[code].vue` (add reuse-vs-verify branch, OTP
  entry screen, immediate-decline state with staff-contact link).
- Backend: `server/api/visits/instant.post.ts` (rewritten against the
  three-entity model and the hard gate, same shape as #186's
  `schedule.post.ts` correction), new OTP send/verify handling,
  `server/services/tuya.service.ts` and `whatsapp.service.ts` (same
  adapter-seam/QStash wrapping #186 already specifies — shared, not
  duplicated).
- Data model: `Cliente` gains `last_client_match_at`; `verification_attempt`
  gains `method: phone-otp` as a valid value.
- Depends on `tuya-access` (D-052) and the corrected
  `visit-identity-verification` (D-053 as amended here) at the
  implementation level — this leaf specifies the contract; actual
  implementation is Execução (#81, #80, #77/#135, #75 for WhatsApp OTP
  delivery).
