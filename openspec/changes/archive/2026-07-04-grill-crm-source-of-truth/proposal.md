## Why

The v1 corretor/lead flow (D-018) needs a settled CRM stance before it can be built. Two open questions gate it: **Q-007** (is HubSpot the source of truth for leads, or Supabase master + sync?) and **Q-018** (the closed list of lead sources day-one). Both were left open at Grilling 0 and are the next in the suggested order. This change (issue #28) resolves them and locks the client/broker data model that the commission-protection logic depends on.

## What Changes

- **Q-007 → resolved (option B):** **Supabase is the source of truth** for the client and commission attribution; **HubSpot is a synced downstream** for the sales pipeline/reporting. Rationale: first-wins attribution with CPF dedup must be transactional, RLS-protected, and LGPD-controlled; the sale trigger (`Casa.status = vendida`) already lives in Supabase (D-016). `Cliente` → HubSpot Contact, `Registro` → HubSpot Deal; broker registers once (portal/bot → Supabase), sync pushes to HubSpot.
- **Ubiquitous language:** the person is a **`Cliente`** throughout; lifecycle is a **`status`** field (interessado → em negociação → comprador). "Comprador" is a status value, not a new entity. The feature is **"Registro de Cliente"**, not "Comissões" (commission is the contractual *consequence*).
- **Data model:** one `cliente` table (`cpf UNIQUE` nullable, `whatsapp NOT NULL`, `email` nullable, `fonte`) — a CPF-less row is the lighter **Contato** level; filling CPF **promotes** it to Cliente. `cliente` **1─N** `registro` (cliente × casa: `status`, `corretor_id` null = direto, `registrado_em`) + append-only `historico` audit off `registro`.
- **Two-level promotion + reconciliation:** self-service (customer registers for a visit + provides CPF); CPF is dedup authority; WhatsApp-match promotes an existing Contato; else new record + staff-merge fallback. WhatsApp mandatory and updatable (change logged in audit).
- **Q-018 → resolved:** day-one sources = **v1** broker portal, staff manual, site-form/WhatsApp-CTA contatos; **v2** QR, bots, tours. Every entry stamps `fonte` → HubSpot source property.
- **Scope:** commission **protection + audit** in v1 (staff-driven status, UI-visible history); commission **financial/payment** out of v1.
- **Naming/route:** screen-map `/admin/comissoes` → `/staff/registros` ("Registro de Cliente / histórico").

## Capabilities

### New Capabilities
- `crm-source-of-truth`: where clients/leads and commission attribution are authoritative (Supabase) and how they sync to HubSpot, including the client/registro data model and lead-source capture.

### Modified Capabilities
<!-- None -->

## Impact

- **Docs (canon):** `open-questions.md` (Q-007, Q-018 resolved), `decisions.md` (D-019 CRM master, D-020 Cliente model + sources + naming), `architecture.md` §5/§6.3, `screen-map.md` (route rename).
- **Platform docs:** `arquitetura-decisoes.html` — new "Clientes & corretores" section (pt-BR); regenerate screen-map.html.
- **Follow-up (not this change):** broader terminology alignment (lead/prospecto → cliente) across older docs like `company-structure.md`.
- **No code** — takes effect when the v1 corretor/lead build starts (Phase 2 epics).
