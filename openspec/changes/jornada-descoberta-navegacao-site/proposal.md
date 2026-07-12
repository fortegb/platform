## Why

The public-site discovery journey (home → portfólio → detalhe da casa → blog →
contato) was drafted mock-first before the domain-architecture decisions
(D-052–D-056, epic #179) closed. `screen-map.md` explicitly flags it
`RASCUNHO — re-validar no passo 5`. This leaf of epic #176 re-validates the
journey against that architecture and closes a real gap found while doing so:
a WhatsApp CTA click is stated as a v1 lead source in
`crm-source-of-truth`'s "Lead source capture" requirement, but no CTA on this
journey currently captures anything — visitors who click "Falar no WhatsApp"
today leave no trace in the lead model at all.

## What Changes

- Validate the discovery journey (Home → Portfólio lista → Portfólio detalhe
  → Blog → Contato) against RBAC (D-055: `Visitante` unauthenticated, nothing
  stored per-visitor) and messaging policy (D-054) — no conflicts found; the
  journey's `wa.me` links are visitor-initiated browser navigation, not a
  platform-originated send, so the "queued via QStash" requirement in
  `messaging-channel-policy` does not apply to them. This distinction is
  recorded in the new capability so later work (#75) doesn't misapply it.
- **New:** every WhatsApp CTA on this journey (home hero, portfólio detalhe,
  contato) fires a fire-and-forget lead-capture beacon immediately before
  opening the `wa.me` link, creating/updating a `Contato`-tier `cliente`
  record tagged `fonte: cta-whatsapp`.
- **New:** the existing contact form submission (`ContactForm.vue` →
  `POST /api/contact`) is contracted to create/update the same `Contato`-tier
  `cliente` record, tagged `fonte: form-site` (today the endpoint is a stub
  that returns success without persisting anything).
- Scope for this leaf is the four-step flow the parent issue (#185) names
  explicitly; `/sobre` is out of scope — it carries no distinct lead-capture
  or architecture surface.

## Capabilities

### New Capabilities
- `journey-site-discovery`: defines the validated visitor discovery/browsing
  flow (home → portfólio → detalhe → blog → contato), its lead-capture
  contract (WhatsApp CTA beacon + contact form, both stamping `fonte` per the
  existing `crm-source-of-truth` model), and its compatibility notes against
  RBAC and messaging policy.

### Modified Capabilities
(none — `crm-source-of-truth`, `messaging-channel-policy`, and
`rbac-role-model` already state the relevant contracts correctly; this
journey consumes them without changing their requirements)

## Impact

- Frontend: `pages/index.vue` (+ hero variants), `pages/portfolio/[slug].vue`,
  `pages/contato.vue`, `components/WhatsAppButton.vue` — add beacon call
  before each `wa.me` navigation.
- Backend: `server/api/contact.post.ts` — implement the stubbed
  persistence/sync (depends on `crm-source-of-truth`'s Supabase `cliente`
  model and HubSpot sync, both already decided); a new lightweight endpoint
  or the same one, reused, for the WhatsApp-CTA beacon.
- Planning docs: `docs/planning/jornadas-plataforma.md` §3.1 and
  `docs/planning/screen-map.md` Visitante section move from `RASCUNHO` to
  validated once this change is archived.
- No changes to Tuya, identity verification, or visit-booking flows (separate
  Passo 5 leaves — #186/#187).
