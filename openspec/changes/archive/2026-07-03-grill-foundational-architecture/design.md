# Design — Foundational architecture stances

> Grilling 0 (#145). Decisions below are the source for the `decisions.md` D-entries and the `architecture.md` updates produced at apply. Full runtime evaluation lives in [`docs/planning/explore/runtime-serverless-vs-persistent.md`](../../../docs/planning/explore/runtime-serverless-vs-persistent.md).

## Context

Constraints driving every decision: **solo developer** (Ricardo), **multi-month** build with no hard deadline (one flagship house as soft motivation), **free-first** (pre-revenue initiative of pessoas físicas; spend only once proven useful), **zero-ops** (time is the scarce resource, not money), **low-hundreds** users in peaks. The platform is **integration-heavy and event-driven** (WhatsApp/Telegram bots, HubSpot sync, Tuya devices, scheduled work) with a **likely future mobile client** (staff approvals + push).

## Decision 1 — Build vs buy

**Decision:** Default to managed/SaaS wherever a good option exists. **No self-hosting.** **No back-office admin built for the owner** (use vendor dashboards, e.g. Supabase Studio). Build custom **only** for the unique flows: visits/identity handling and the corretor flow.

**Rationale:** The scarce resource is the solo dev's time, not money (within free/cheap tiers). Every managed service is dev-hours not spent building and maintaining. Custom code is reserved for what no SaaS fits.

## Decision 2 — Data ownership / content placement (resolves Q-004)

**Decision:** A per-content-type taxonomy on two axes (public↔private, light↔heavy):

| Content | Home |
|---|---|
| House listing content (photos, plantas, descrição, timeline) | **CMS** (Contentful/Sanity) |
| Blog | **CMS** (unified authoring) |
| House **operational** state (status, links to leads/visits/verification) | **Supabase** (Postgres) |
| Video | **YouTube/Vimeo** embed; URL stored as a field |
| Sensitive docs (corretor contracts via Gov.br, RG/CNH verification) | **Supabase private bucket + RLS**, LGPD retention |
| Social posts | **outside the platform** (AI drafts + optional free scheduler) |
| Join content ↔ operational | **shared house ID/slug**, merged in Nuxt |

**Rationale:** "CMS vs DB" is a false binary; the house entity has both operational/relational data (must be queryable, drives tour/CRM logic, RLS-protected) and content/media (wants a good authoring UI). A managed CMS gives authoring UX with zero build; Supabase owns operational truth + sensitive PII. At this scale the content↔operational boundary is a **thin reference by shared ID**, not heavy sync. Video is offloaded because streaming/transcoding/egress are exactly what free tiers do poorly.

**Alternatives rejected:** *Supabase-only* (authoring UX is a raw dashboard, weak for media/mobile). *Self-hosted admin layer over Postgres (Directus)* (violates zero-ops). *Contentful dropped entirely* (reversed — a CMS earns its keep for authoring).

**Open:** CMS vendor (Contentful already in `package.json` vs Sanity's more generous free tier) — reversible via the service layer; decided at build.

## Decision 3 — System shape (runtime)

**Decision:** **Serverless.** Nuxt/Nitro on **Vercel** (Hobby free → Pro ~$20/mo when useful), **API-first** (web = first client; PWA/native/bots reuse the same endpoints), **Upstash QStash** for delayed jobs + retries, an **integration-adapter seam** (one module per third-party), **Telegram-first** messaging (free; WhatsApp = paid-when-useful), live video offloaded to vendors, kept **Nitro-portable** as cheap insurance.

**Rationale:** The stated priorities — free-first + zero-ops + Vercel simplicity — point at serverless. No free always-on host offers both no-sleep and no-ops. What's traded away is async coherence (logic scattered across functions + QStash), which the owner accepted ("don't mind scattered async provided it works"); the evaluation shows it works. At 1–2 houses/year the free-tier usage never triggers an upgrade; Pro is a discretionary later choice.

**Alternative evaluated and documented:** persistent Node process (Fly.io/Oracle/Railway) with in-process pg-boss scheduler + websockets — architecturally cleaner for event/bot/real-time and closer to the owner's C/LAMP instincts, but truly-free + always-on + zero-ops don't coexist. Would be chosen if coherence/real-time outweighed free-first/zero-ops. Full comparison in the explore doc.

## Decision 4 — MVP boundary

**Decision:** Ship in vertical slices; architect v1 in depth, defer v2/v3 detail to their phase behind a short "lock-now" list.

- **v1** — public site + real portfólio + WhatsApp visit CTA · **auth + roles** (foundation) · corretor onboarding (register → staff approve) · **lead registration + commission timestamp (first-wins) + HubSpot sync** · contract/Gov.br **manual-first** · staff approvals + lead view · minimal admin config.
- **v2** — **self-guided tours (booked + QR)** + identity + Tuya + calendar + exception queue · **automated Gov.br** · WhatsApp/Telegram lead bots.
- **v3 / Phase 3** — media kit, timeline de obra, social engine, cliente portal, BI.

**Lock now (foundational, hard to reverse):** core data model + stable IDs (house, user, lead, corretor, with visit/contract as forward-looking refs); RBAC covering all future roles; storage taxonomy (Decision 2); integration-adapter seam; API-first; async/queue choice (QStash). **Defer to phase grilling:** tours mechanics (Q-005/006/017), media kit (Q-009/011–013), social, mobile (Q-008/019), bot conversational design.

**Rationale:** The full-platform scope is many months for a solo dev. Corretor before tours because it has **no hardware/external dependencies** (no Tuya, no facial match), delivers commission-protection value the moment two corretores are involved, and is human-sales-aligned. Tours are the largest, riskiest unique build → v2. Gov.br is the corretor flow's riskiest integration → manual-first so it doesn't gate shipping. Big-design-up-front is rejected (violates D-011); blind deferral is rejected (risks foreclosing v2/v3) — hence the lock-now guardrail.

## Cross-cutting notes

- **Free-tier bends:** WhatsApp (per-message in BR) and Tuya (production quotas) — both unique, low-volume, small early. Supabase Storage (photos) is the first thing to outgrow (offload to Cloudflare R2 if needed).
- **Consistency with existing canon:** aligns with D-011 (decide at the moment) and `architecture.md`'s "DEFINE only" stance.
