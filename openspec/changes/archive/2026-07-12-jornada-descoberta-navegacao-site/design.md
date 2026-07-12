## Context

The discovery journey's pages already exist as mock-data UI stubs
(`pages/index.vue` + hero variants, `pages/portfolio/index.vue`,
`pages/portfolio/[slug].vue`, `pages/blog/*`, `pages/contato.vue`,
`components/ContactForm.vue`, `components/WhatsAppButton.vue`). The contact
form already posts to `server/api/contact.post.ts`, which is a stub that
validates input and returns success without persisting anything. WhatsApp
CTAs are plain `<a href="https://wa.me/...">` anchors with no server
round-trip. `crm-source-of-truth` already defines the target data model
(`cliente` Contato/Cliente two-tier, `fonte` stamped and synced to HubSpot)
and already lists "site-form/WhatsApp-CTA contatos" as a v1 lead source —
this change closes the gap between that stated contract and what the code
does today.

## Goals / Non-Goals

**Goals:**
- Define the validated discovery journey and its screens/states.
- Specify that both lead-capture entry points on this journey (WhatsApp CTA,
  contact form) create/update a `Contato`-tier `cliente` record with a
  distinct `fonte`, per the existing `crm-source-of-truth` contract.
- Record why this journey's WhatsApp links are exempt from
  `messaging-channel-policy`'s QStash-queuing requirement.

**Non-Goals:**
- Choosing the HubSpot sync mechanism or Supabase schema — both already
  decided in `crm-source-of-truth`; this leaf only specifies that this
  journey's two entry points feed into that existing model.
- Visit booking, identity verification, or Tuya access — separate Passo 5
  leaves (#186/#187).
- Retry/delivery-guarantee infrastructure for the beacon (see Risks below).

## Decisions

**Beacon reuses `POST /api/contact`, discriminated by a `fonte` field,
rather than a new endpoint.** The endpoint already validates input and is
the natural landing spot for "something entered the lead funnel." Adding a
second endpoint for the WhatsApp-CTA case would duplicate the persistence
and HubSpot-sync logic for no behavioral benefit. The WhatsApp CTA call
sends the minimal fields it actually has (no name/message yet, since the
visitor hasn't typed anything) with `fonte: 'cta-whatsapp'`; the form call
keeps sending its full field set with `fonte: 'form-site'`. The endpoint's
existing required-field validation (`name`, `email`, `phone`, `message`)
relaxes to treat those as required only for the form path, not the beacon
path.

**Fire-and-forget, not blocking.** The beacon call (`fetch` with no
`await` in the click handler, or `navigator.sendBeacon` where available)
fires immediately before `window.open`/navigation to the `wa.me` URL. The
visitor's path to WhatsApp is never delayed or blocked by the network call
succeeding. Rationale carried over from exploration: this is a marketing
signal, not a transaction — losing an occasional beacon to a flaky network
is an acceptable trade against adding latency to every WhatsApp click.

**`wa.me` links are exempt from `messaging-channel-policy`'s queuing
requirement**, because that requirement governs messages the *platform*
sends (`messaging-channel-policy`'s "Messaging sends are queued" scenario
is scoped to outbound sends triggered by a platform-side event, e.g. a
booking confirmation). A `wa.me` link only opens the visitor's own WhatsApp
client with a pre-filled draft they choose to send themselves — the
platform never calls a messaging provider API for this interaction. No
change to `messaging-channel-policy` is needed; this is recorded here so
future work (#75, WhatsApp Business API build-out) doesn't mistake this CTA
for a provider-routed send.

## Risks / Trade-offs

- **[Risk]** Fire-and-forget means a failed or dropped beacon silently
  loses a lead, with no user-visible signal and no retry.
  → **Mitigation:** accepted for v1 given the low stakes (marketing signal,
  not a transaction); revisit with a retry/outbox pattern only if observed
  drop rate matters in practice — not built preemptively.
- **[Risk]** Relaxing `/api/contact`'s required-field validation for the
  beacon path could let malformed/empty requests create junk `Contato`
  rows.
  → **Mitigation:** the beacon path still requires a `fonte` discriminator
  and at minimum the page/house context it fired from; full contact-detail
  fields remain required only on the form path.

## Open Questions

- Exact shape of the minimal beacon payload (e.g. does it need the house
  slug for portfólio-detalhe clicks, for HubSpot deal association later) —
  left to implementation-time judgment during Execução (#78), not blocking
  this spec.
