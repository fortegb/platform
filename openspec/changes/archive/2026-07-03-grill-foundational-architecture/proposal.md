## Why

The platform's foundational technical stances were **implied but never explicitly decided** — the early proposed stack in `AGENTS.md` §5 and the "TBD" boxes in `docs/planning/architecture.md` (§4 Data TBD, §5, §7) left CMS-vs-DB, runtime shape, and the MVP boundary open. Several point questions in `open-questions.md` (Q-004, Q-007, Q-005/Q-006) are really *instances* of the same underlying stances. Answering them one-by-one risks re-litigating the same tradeoffs and locking in early, less-informed assumptions. This change resolves the cross-cutting stances first (issue #145), so the point questions become quick applications of an already-decided foundation.

## What Changes

Resolve and document five foundational stances, and as a byproduct **resolve Q-004** (CMS vs DB):

1. **Constraints** — solo dev, multi-month horizon, no hard deadline, free-first, zero-ops, low-hundreds scale.
2. **Build vs buy** — default to managed/SaaS wherever it fits; no self-hosting; no back-office admin built for the owner; build custom only for the unique flows (visits/identity, corretor).
3. **Data ownership / content placement (Q-004)** — content (house listings, timeline, blog, media) → **CMS (Contentful/Sanity)**; operational state + sensitive PII (status, leads, visits, verification, signed contracts, RG/CNH) → **Supabase** (Postgres + private Storage bucket with RLS); **video** → YouTube/Vimeo embed; join by shared house ID; **social** → outside the platform.
4. **System shape** — **serverless** (Vercel Hobby → Pro when useful), API-first, Upstash QStash for async/retry, integration-adapter seam, Telegram-first messaging, Nitro-portable. Persistent-process alternative evaluated and documented.
5. **MVP boundary** — v1 = public site + portfólio + WhatsApp visit CTA + **auth/roles** + **corretor portal + lead/commission-protection + HubSpot** (Gov.br manual-first). **Tours (booked + QR) → v2.** Media kit / social / cliente portal → v3. v2/v3 architected just-in-time behind a short "lock-now" list of foundational seams.

Documentation updated: `open-questions.md`, `docs/planning/decisions.md`, `docs/planning/architecture.md`, root `DECISIONS.md`, `STATUS.md`, plus a new **user-readable architecture & decisions page** in the Platform docs with a card on the index.

## Capabilities

### New Capabilities
<!-- None — this is a decision/documentation change; no new runtime capability or spec requirements. -->

### Modified Capabilities
<!-- None — no spec-level requirement changes. -->

## Impact

- **Docs (canon):** `docs/planning/open-questions.md` (Q-004 → resolved), `docs/planning/decisions.md` (D-015..D-018), `docs/planning/architecture.md` (§1, §4, §5, §7), root `DECISIONS.md` (dated entry), `STATUS.md`.
- **Platform docs (GitHub Pages):** new `docs/planning/arquitetura-decisoes.html` (pt-BR, user-readable) + card on `docs/index.html`.
- **Explore capture:** `docs/planning/explore/runtime-serverless-vs-persistent.md` (already committed).
- **Roadmap/board:** #145 resolved; #28 (standalone Q-004 grilling) becomes **subsumed** — close at close-out crediting #145.
- **No code changes** — stack choices take effect when Phase 1 build starts.
