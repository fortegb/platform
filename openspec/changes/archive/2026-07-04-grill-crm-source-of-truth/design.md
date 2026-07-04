# Design — CRM source of truth & client model (#28)

> Grilling of Q-007 + Q-018. Source for `decisions.md` D-019/D-020 and the `architecture.md` §5/§6.3 updates at apply.

## Context

The v1 release (D-018) includes the corretor portal with lead registration + commission protection + HubSpot. The commission-protection rules were closed at the 2026-07-02 interview (company-structure.md, gaps 1–8): attribution per house, **first valid registration wins**, dedup **nome+CPF**, no time expiration, platform-captured = direto. What was missing is *where that lives* (Q-007) and *which sources feed it* (Q-018).

## Decision 1 — CRM source of truth (Q-007 = B)

**Decision:** Supabase is the source of truth for the `Cliente` and commission attribution; HubSpot is a synced downstream (Contact/Deal) for pipeline, follow-up, reporting, marketing.

**Rationale:** The commission guarantee — "two brokers race → exactly one wins by timestamp, dedup on CPF" — needs a **transactional** write with a uniqueness constraint in a DB we control, not HubSpot's eventually-consistent API. CPF is sensitive PII (LGPD/residency). The sale trigger reads `Casa.status = vendida`, already a Supabase fact (D-016). So the entire commission evaluation happens in Supabase; HubSpot never gates money.

**Alternatives rejected:** *HubSpot master* (fragile attribution enforcement, CPF in US SaaS). *Thin attribution-claim in Supabase + HubSpot owns person↔house* (splits the corretor attribution from the Deal it attributes across a two-system join keyed by CPF+casa — fragile for the most legally-critical field).

**Sync:** broker registers once (portal/bot → Supabase `registro`); a sync pushes Cliente→Contact and Registro→Deal to HubSpot. Status is authored in Supabase (staff-driven) and synced out, never authored in HubSpot.

## Decision 2 — Client data model & ubiquitous language (Q-018 + model)

**Ubiquitous language:** the person is a **`Cliente`** everywhere (ForteGB-facing). Lifecycle is a **`status`** field (interessado → em negociação → comprador); "comprador" is a status value, not a new entity. The feature is **"Registro de Cliente"**, never "Comissões" (commission is the consequence).

**Entities:**
```
cliente (id, cpf UNIQUE nullable, nome, whatsapp NOT NULL, email nullable, fonte, criado_em)
   │ 1─N
registro (id, cliente_id FK, casa_id FK, status, corretor_id nullable[null=direto], registrado_em)
   │ 1─N
historico (id, registro_id FK, tipo, ator, em, detalhe)   ← append-only audit
```
- **One table for person**, `cpf` nullable+`UNIQUE` (Postgres allows many NULLs): a CPF-less row is the **Contato** level; filling CPF **promotes** to Cliente via `UPDATE` — no cross-table migration.
- **Per-house facts** (status, corretor attribution, first-wins timestamp, audit) live on `registro`, because the same person can be broker-attributed on one house and direto on another (gap-2). This is the minimum shape that expresses that rule; it also removes the update/insert/delete anomalies of a flat repeated-lines table and lets `UNIQUE(cpf)` enforce the dedup the DB, not app code.
- **HubSpot mapping:** `cliente`→Contact, `registro`→Deal.

**Two-level promotion + reconciliation:** self-service first (customer registers for a visit + provides CPF); broker/staff can also promote. At promotion:
- CPF matches existing Cliente → same person; attach new `registro`; update WhatsApp if changed (log in `historico`).
- CPF new + WhatsApp matches a Contato → promote that Contato.
- Neither → new Cliente; old CPF-less Contato lingers unmatched; **staff can manually merge**. Duplicate risk is inherent to CPF-less contatos and resolves once CPF exists.

**Field rules:** WhatsApp mandatory + updatable (change audited); email nullable (future); CPF mandatory to *be* a Cliente (Brazil standard + ties to document-based visit authorization in v2).

**Sources (Q-018):** v1 = broker portal, staff manual, site-form/WhatsApp-CTA (contatos); v2 = QR, WhatsApp/Telegram bot, tours. Every entry stamps `fonte` (site_form, whatsapp_cta, corretor, staff_manual, qr, bot, social) → HubSpot source property.

## Decision 3 — Scope & naming

- **v1:** commission **protection + audit** — staff-driven `status`, UI-visible per-lead/per-house history, broker sees own registrations, sale notification. **Financial/payment** (amounts, reconciliation, cross-house financials) **out of v1** (architecture.md §2).
- **Route/naming:** `/admin/comissoes` → `/staff/registros`; the area is "Registro de Cliente / histórico," not "Comissões."

## Deferred (have a home)

- Status-transition flow logic (who triggers each transition; coupling of `registro.status=comprador` ↔ `casa.status=vendida` ↔ other registros → encerrado) → visit/sale flow grilling.
- HubSpot custom-property details → build.
- Terminology sweep (lead/prospecto → cliente) in older docs → follow-up.
