## Why

D-022 opened the full-solution environments epic but did not lock each environment’s purpose and rules. Without that contract, later work (branches, hosting, domains, data, integrations) risks inconsistent assumptions. This change is the **written spec** of the three environments — not their delivery — after grilling A1 (#147).

## What Changes

Document the three environments (definition only — nothing provisioned):

1. **`local`** — developer machine; isolated by default (Nuxt/Node + local DB/mocks); no real customer data; mock integrations; never real lock or paid WhatsApp to real customers.
2. **`staging`** — private shared pre-production (dev + optional sócio UAT, not a public beta); non-production/seed data; **safe-target** integrations only; required before promoting to prod.
3. **`prod`** — live system; real data under LGPD; real integrations; only promoted changes (emergency hotfix override exists as exceptional/logged; procedure later).

Also:
- Decision entry (**D-025**) + short root `DECISIONS.md` note.
- Config template: `docs/planning/templates/environments.md` (`APP_ENV` + rules table).
- **Dedicated Platform docs page** (pt-BR) for sócios + index card; pointer from architecture decisions page.
- Canon pointers in `architecture.md` / `STATUS.md`.
- **Out of scope:** branch map, Vercel topology, domains, seeding contents, concrete vendor sandboxes (sibling leaves).

## Capabilities

### New Capabilities
- `environment-tiers`: Contract for the three named environments — purpose, data/integration posture, promotion boundary, hotfix preview, `APP_ENV`.

### Modified Capabilities
<!-- none -->

## Impact

- **Docs:** `decisions.md` (D-025), `architecture.md`, `templates/environments.md`, root `DECISIONS.md`, `STATUS.md`.
- **Platform docs:** new `docs/planning/ambientes.html` + card on `docs/index.html` + link from `arquitetura-decisoes.html`.
- **Board:** closes #147; unblocks A2–A4 with shared vocabulary.
- **No product runtime code** and **no cloud resources**.
