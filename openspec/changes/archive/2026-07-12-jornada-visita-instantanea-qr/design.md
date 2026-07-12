## Context

`pages/visita/qr/[code].vue` and `server/api/visits/instant.post.ts` predate
D-052/D-053, same as the scheduled-visit code did before #186 corrected it.
The stub: writes to the legacy `visits` table; calls a raw Tuya stub and
swallows failures while still returning "success"; trusts a client-supplied
`verificationData.verified` boolean; sends WhatsApp synchronously; and has
no reuse check and no failure-escalation path at all (a failed check just
403s with no recovery). This leaf applies the same corrections #186 made,
adapted to this flow's D-053-specified differences (no synchronous wait on
failure) and adds a new mechanism this flow specifically needs: a bounded,
phone-possession-gated reuse shortcut.

## Goals / Non-Goals

**Goals:**
- Specify the instant/QR journey's contract against D-052/D-053, correcting
  the same category of stub bugs #186 fixed.
- Implement D-053's already-decided "no synchronous wait, immediate decline
  + escape hatch" rule for this flow, for the first time.
- Resolve the reuse-shortcut risk specific to instant access (zero human
  awareness between reuse match and door unlock) with a phone-possession
  check, and bound how long that lighter check can substitute for a full
  `client-match` re-run.

**Non-Goals:**
- Redesigning `client-match` capture UI — unchanged, only what happens
  around it.
- The staff-review screen (#192) or condomínio/portaria access (#140) —
  separate leaves, already deferred.
- Choosing the OTP code length, exact expiry duration, or the shorter
  Tuya-failure-detection timeout D-052 already flagged as build-time tuning
  — none of these get a specific number in this leaf.
- Changing #186's scheduled-flow reuse behavior — it keeps its unconditional
  "within 12 months, skip entirely" rule; the new `last_client_match_at`
  field is additive and doesn't touch that already-closed logic.

## Decisions

**Failure handling matches D-053 literally: immediate decline, no
synchronous wait.** Unlike #186 (async, "we'll confirm before your visit"),
a failed or low-confidence `client-match` on this flow declines immediately
and shows a WhatsApp link to contact staff directly — the visitor decides
whether to pursue it, the system never holds them in a pending state. If
they do contact staff and get approved, that's recorded as a normal
`staff-review` `verification_attempt` (same mechanism D-053 already
defined) and the same `provisionAccess` path runs — whether or not the
visitor is still physically present when it resolves.

**Reuse requires phone-possession confirmation for this flow only.** A
`Cliente` within the 12-month `identity_verified_at` window still needs to
enter a short-lived WhatsApp one-time code before `provisionAccess` runs on
an instant visit — `identity_verified_at` alone unlocks scheduled visits
(#186) but not this flow, because instant access has no human-reviewable
gap between a reuse decision and physical entry. The code is delivered via
the same QStash-routed WhatsApp mechanism as every other message in this
journey (D-054) — no new send pattern. Entry happens on the same
micro-página, via a component swap analogous to `IdentityVerification.vue`
(a code-input form emitting a "confirmed" event), not a redirect or a
separate page.

**OTP failure/timeout reuses the existing decline path, not a new one.** A
wrong or expired code routes through the same immediate-decline +
staff-escape-hatch flow already specified for a failed `client-match` —
no third distinct failure state.

**Bounded OTP-extension mechanism (reopens D-053).** A successful OTP
confirmation extends `identity_verified_at` to the confirmation time — but
only while doing so stays within 24 months of `last_client_match_at`, a new
field set only when a full `client-match` verification actually completes.
Once `last_client_match_at` passes the 24-month mark, OTP-based reuse is no
longer offered regardless of how recently `identity_verified_at` was
nudged, and the visit falls through to a full `client-match` run, which
resets both timestamps. This is deliberately a *ceiling on the anchor*, not
a cap on `identity_verified_at` directly — it's what forces a real
re-verification to eventually happen no matter how many OTP-only visits
occur in between, while still letting frequent visitors avoid repeated
document uploads.

**`verification_attempt.method` gains a third value: `phone-otp`.** No new
entity — the existing `verification_attempt` shape (already holding
`client-match` and `staff-review`) accommodates this without structural
change, just a new enum value and an outcome.

## Risks / Trade-offs

- **[Risk]** Two-field reuse logic (`identity_verified_at` +
  `last_client_match_at`) is more complex than #186's single-field check,
  and only this flow uses the second field.
  → **Mitigation:** accepted — the complexity is proportional to a real
  risk difference (instant access has no human-reviewable gap; scheduled
  does), not applied uniformly where it isn't needed.
- **[Risk]** A visitor whose phone number was reassigned or compromised
  could still pass the OTP check within the reuse window, since OTP proves
  current possession, not that the *original* verified person still holds
  it.
  → **Mitigation:** same trust boundary already accepted for `Cliente`'s
  WhatsApp field as its identity key (D-020); OTP is strictly additive
  security over the pre-existing baseline (previously: reuse required no
  check at all on this flow, since it wasn't implemented), not a claim of
  perfect assurance.
- **[Risk]** The 24-month ceiling is a new, somewhat arbitrary number.
  → **Mitigation:** chosen as 2× the existing 12-month window as a simple,
  legible rule (guarantees at most one "free" OTP-extended cycle before a
  forced re-verification); exact tuning is not precious and can be revised
  via a future decision if real usage shows it's wrong in either direction.

## Open Questions

None — all questions raised during exploration (failure-handling shape,
reuse gating mechanism, OTP entry UX, refresh-vs-no-refresh, and the
bounded-ceiling resolution) were settled in this leaf's discussion.
