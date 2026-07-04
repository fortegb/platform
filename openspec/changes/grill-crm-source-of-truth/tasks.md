# Tasks — CRM source of truth & client model (#28)

## 1. Canon docs

- [x] 1.1 `docs/planning/open-questions.md` — mark **Q-007 resolved** (→ D-019) and **Q-018 resolved** (→ D-020).
- [x] 1.2 `docs/planning/decisions.md` — append **D-019** (Q-007: Supabase master + HubSpot sync) and **D-020** (Cliente/Registro model, two-level Contato→Cliente, Q-018 sources, naming "Registro de Cliente"). ADR-lite, pt-BR.
- [x] 1.3 `docs/planning/architecture.md` — §5 update the "Leads / CRM" row (Q-007 resolved: Supabase master + HubSpot sync); §6.3 note the Cliente/Registro model + two-level + fonte.
- [x] 1.4 `docs/planning/screen-map.md` — rename route `/admin/comissoes` → `/staff/registros`; relabel to "Registro de Cliente / histórico"; note commission protection+audit is v1 (financials out).

## 2. Platform docs

- [x] 2.1 `docs/planning/arquitetura-decisoes.html` — new pt-BR section "Clientes & corretores" (Cliente único por CPF, dois níveis Contato→Cliente, registro por casa, proteção de comissão via primeiro-registro, HubSpot sync).
- [x] 2.2 Regenerate `screen-map.html` from `screen-map.md` (`node scripts/generate-portal-assets.mjs`) so the route rename shows in Platform docs.

## 3. Verify

- [x] 3.1 D-numbering contiguous (D-019, D-020), append-only.
- [x] 3.2 pt-BR strict in all touched docs (no pt-PT).
- [x] 3.3 `git status` — only intended files; commit on `feat/grill-crm-source-of-truth`.

> **Do NOT archive or close #28 yet** — owner may add touches after review.
> Follow-up (separate): terminology sweep lead/prospecto → cliente in `company-structure.md` etc.
