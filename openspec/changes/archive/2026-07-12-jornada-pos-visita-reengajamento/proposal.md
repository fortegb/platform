## Why

Both visit journeys (#186 scheduled, #187 instant/QR) end at "credential
delivered" — nothing exists after that: no pre-visit reminder, no way for a
visitor to cancel or reschedule, no post-visit follow-up. `screen-map.md`'s
own gap-resolution table already flagged this ("Follow-up pós-visita →
#141 · sem tela MVP"), and #141 itself lists channel/timing/consent as open
design questions. This leaf is fully greenfield — no code exists for any of
the three sub-flows (reminders, cancel/reschedule, follow-up) — and closes
those open questions.

## What Changes

- **New:** a pre-visit reminder sent ~24h before a scheduled visit —
  transactional per D-054 (already covers "lembretes" explicitly), no new
  consent question.
- **New:** self-service cancel/reschedule via a magic link. The link is
  added to the existing booking-confirmation WhatsApp message (and
  repeated on the reminder) — no new send trigger, no login. It opens a
  new no-auth page (`/visita/gerenciar/[token]`) showing the visit with
  Cancel/Reschedule actions.
- **New:** a `cancelled` terminal `visit.status` value, distinct from
  `declined` — a voluntary cancellation and a failed-verification decline
  are operationally different (one is a security signal worth tracking,
  the other is normal life) and conflating them would blur reporting.
  Cancelling a visit that already reached `access_provisioned` also calls
  the `tuya-access` adapter's `revoke(credential)` — named in D-052's
  interface but never given a concrete caller until now.
- **New:** reschedule cancels the current visit (same as above, including
  revoke if needed) and re-enters the normal booking flow (#186),
  pre-filled — no separate "edit visit" mechanism.
- **New:** a cancel or reschedule triggers a Telegram alert to staff (same
  internal-notification pattern as #192) so an emptied calendar slot
  doesn't go unnoticed.
- **New:** post-visit follow-up messaging is classified per D-054's
  existing transactional/marketing split — same-day and +24h messages
  ("how was your visit? questions?") are transactional, no extra consent;
  +3 days and later, or anything nurture-toned (similar listings, "still
  interested?"), is marketing and requires explicit opt-in, off by
  default. This resolves #141's own open LGPD-consent question using the
  framework D-054 already established, not a new policy.

## Capabilities

### New Capabilities
- `journey-post-visit-reengagement`: defines the three sub-flows —
  pre-visit reminders, magic-link self-service cancel/reschedule
  (including the new `cancelled` status and the `revoke` call it
  triggers), and the transactional/marketing classification of post-visit
  follow-up messaging — consuming `tuya-access`, `messaging-channel-policy`,
  and `visit-identity-verification` without modifying any of them (the
  `cancelled` status is additive to the visit lifecycle, not a change to
  verification-gating, which is the only thing `visit-identity-verification`
  claims ownership of).

### Modified Capabilities
(none)

## Impact

- Frontend: new `pages/visita/gerenciar/[token].vue` (management page,
  no auth), reuses the existing booking flow (#186) for the reschedule
  path.
- Backend: token generation at booking time; new
  cancel/reschedule endpoints; reminder + follow-up scheduling (both
  QStash-routed per D-054); staff Telegram alert on cancel/reschedule
  (reuses the pattern from #192).
- Depends on the `visit`/`Cliente` data model (D-053) and the
  `tuya-access` adapter's `revoke` (D-052) already existing — this leaf
  specifies the contract; implementation is Execução (#141, #81).
- **Explicitly out of scope:** anything about the corretor's view of a
  cancelled/rescheduled visit (belongs to #191, corretor pipeline);
  choosing the exact marketing-message content or campaign cadence
  (v2+ per D-018, only the consent classification is decided here).
