# DECISIONS — architectural decision history

This file is **append-only**. New sessions add entries at the bottom under a dated heading. Existing entries are never modified or removed. Each entry captures what was decided, why, and what rules or implications follow.

This file and `AGENTS.md` are the shared memory of this project across sessions and across AI tools. Any agent working on this repo should read this file before making significant changes.

---

## Entry format

```
## YYYY-MM-DD — <short description of session or topic>

### <Decision title>

**Decision:** What was decided.

**Rationale:** Why this decision was made. What alternatives were considered and why they were rejected.

**Implications:**
- Rule or consequence that follows from this decision
- Another rule or consequence
```

---

## 2026-07-03 — Grilling 0: foundational architecture stances (#145)

> Detalhe (ADR-lite, pt-BR): `docs/planning/decisions.md` D-015–D-018. Avaliação de runtime: `docs/planning/explore/runtime-serverless-vs-persistent.md`.

### Build vs buy default

**Decision:** Managed/SaaS by default; no self-hosting; no owner-facing back-office admin (use vendor dashboards). Custom code only for the unique flows (visits/identity, corretor).

**Rationale:** Solo dev, free-first, zero-ops — the scarce resource is developer time, not money within free/cheap tiers. Reject self-hosting and bespoke admin as time sinks with no customer value.

**Implications:**
- Every stack choice passes the buy-first filter.
- Vendor dashboards (e.g. Supabase Studio) are the permanent back-office.

### Content placement — CMS + Supabase (resolves Q-004)

**Decision:** Content (house listings, blog, timeline, media) → CMS (Contentful/Sanity). Operational state + sensitive PII (status, leads, visits, verification, Gov.br contracts, RG/CNH) → Supabase (Postgres + private RLS bucket). Video → YouTube/Vimeo embed. Social → outside the platform. Join by shared house ID.

**Rationale:** "CMS vs DB" is a false binary; the house has both operational/relational data and content/media. A managed CMS gives authoring UX with zero build; Supabase owns operational truth + PII. The content↔operational boundary is a thin reference by ID, not heavy sync, at this scale. Rejected: Supabase-only (weak authoring), self-hosted Directus (violates zero-ops), dropping Contentful entirely (reversed).

**Implications:**
- CMS vendor reversible via a service layer; decided at build.
- Pre-resolves the storage side of Q-005/Q-016.

### System shape — serverless

**Decision:** Serverless Nuxt/Nitro on Vercel (Hobby → Pro when useful), API-first, Upstash QStash for delayed/retried async, integration-adapter seam, Telegram-first messaging, Nitro-portable. Persistent-process alternative evaluated and rejected for now.

**Rationale:** Priorities free-first + zero-ops + Vercel simplicity point at serverless; no free always-on host gives both no-sleep and no-ops. Traded away: async coherence (scattered across functions + QStash), accepted by the owner. At 1–2 houses/year, usage never triggers a paid upgrade.

**Implications:**
- Live video offloaded to vendors (not proxied by the backend).
- Portability kept as cheap insurance against future host constraints.

### MVP boundary — v1/v2/v3

**Decision:** v1 = public site + portfólio + WhatsApp visit CTA + auth/roles + corretor portal (onboarding, lead + first-wins commission timestamp, HubSpot) with Gov.br manual-first. Tours (booked + QR) + identity + Tuya + calendar → v2. Media kit / social / cliente portal / BI → v3. Architect v1 deep; defer v2/v3 detail behind a "lock-now" list (core data model + IDs, RBAC for all roles, storage taxonomy, adapter seam, API-first, QStash).

**Rationale:** Full scope is many months for a solo dev. Corretor before tours: no hardware/external deps, protects commission early, human-sales-aligned. Tours = largest/riskiest unique build → v2. Gov.br manual-first so it doesn't gate shipping. Rejects big-design-up-front (D-011) and blind deferral (would foreclose v2/v3).

**Implications:**
- v2/v3 architecture decided just-in-time at each phase's grilling.
- #28 (standalone Q-004 grilling) subsumed by #145.
