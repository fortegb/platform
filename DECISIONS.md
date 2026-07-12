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

---

## 2026-07-10 — Environment tiers (#147 / A1)

### Three logical environments — local / staging / prod

**Decision:** Exactly three logical environments. Preview deploys are a delivery mechanism, not a fourth name. `local` = isolated laptop (Nuxt/Node + local DB/mocks). `staging` = private pre-prod (dev + optional partner UAT). `prod` = live. Data outside prod is seed/fake by default (no prod PII copy). Integrations: mock / safe-target / prod-live — never a real door or real-customer WhatsApp off prod. Promote via staging before prod; emergency hotfixes are exceptional, explicit, and logged (procedure later). Runtime identity: `APP_ENV`.

**Rationale:** Minimum set that separates disposable work, shared validation, and real customers without multiplying free-tier accounts for a solo free-first setup. Spec only in this step — delivery (branches, hosting, domains, seed packs) comes in later leaves.

**Implications:**
- Canon: `docs/planning/decisions.md` D-025; template `docs/planning/templates/environments.md`; sócios page `docs/planning/ambientes.html`.
- Unblocks branch mapping, Vercel topology, and domains leaves with a shared vocabulary.

---

## 2026-07-10 — Branch → environment map (#148 / A2)

### Git lines map to local / staging / prod

**Decision:** Long-lived `staging` + `main` (prod) + short-lived `feat/*` and `fix/*` (Preview → staging-class backends). Normal path: feature → merge to `staging` → separate promote to `main`. Close targets the integration branch (`staging` for ForteGB); promote is not automatic in Vercel. Global close skill stays agnostic: default merge-to-`main`; optional repo config `integrationBranch` (implemented later in #166). Until then, docs/skill may disagree — gap called out in STATUS.

**Rationale:** Keeps the three-environment contract honest in git without hardcoding ForteGB into a multi-product skill.

**Implications:**
- Canon: D-026; template branches section; Ambientes page updated.
- #166 DoD: read opt-in config; ForteGB adds the file.

---

## 2026-07-10 — Vercel topology (#149 / A3)

### One project · Production vs Preview · password gate

**Decision:** Single Vercel project. Production tracks `main` only. `staging` and feature branches deploy as Previews (coexist with Production; cold start ≠ powering off prod). Previews use shared-password host protection (no Vercel account for partners; one unlock per browser). App auth remains a separate layer. Env: Production scope = prod; Preview scope = staging-class for all Previews.

**Rationale:** Matches the branch map with minimal ops; keeps staging private without onboarding sócios to Vercel.

**Implications:**
- Canon: D-027; template + Ambientes page. Domains → #150. Project not provisioned in this change.

---

## 2026-07-10 — Passos 1–2 validated (#177)

### Contexto & Funcionalidades closed by grilling (journeys stay in step 5)

**Decision:** Passos 1–2 are validated. Canonical artifacts accepted (`company-structure.md`, `platform-vision.md`, `deliverables.md`, `modules.md`). No new offer items. Deep journey/screen re-validation remains passo 5 (#176). Planning hygiene must not contradict known board/org/Architecture state.

**Rationale:** Content was already sufficient; a leafless epic needed a real DoD (decision + hygiene), not invented product scope.

**Implications:**
- Canon: `docs/planning/decisions.md` D-028.
- Closes #177; enables closing epic #175. G2 still gates build until Definição 4–7 close.

---

## 2026-07-10 — Domains per environment (#150 / A4)

### Hostnames for local / staging / preview / prod + .com.br redirects

**Decision:** Prod = `fortegb.com` + `www.fortegb.com` (same Production). Stable staging = `staging.fortegb.com`. Feature Previews = `*.vercel.app` only. Local = localhost. `fortegb.com.br` / `www.fortegb.com.br` = 301 → `https://fortegb.com` (not app hosts; no staging `.com.br`). Platform docs stay on GitHub Pages.

**Rationale:** One staging bookmark; ephemeral PR URLs; `.com` canonical; `.com.br` via HTTP redirect at registrar/CDN.

**Implications:**
- Canon: D-029; template + Ambientes page. DNS/Vercel attach not done in this change. Next data leaf: #151.

---

## 2026-07-10 — Supabase projects per environment (#151 / B1)

### Two cloud projects + local Docker; Previews share staging

**Decision:** Cloud projects `fortegb-staging` and `fortegb-prod` only. Local = Docker/OrbStack (CLI), not a third cloud project. All Vercel Previews use staging. No prod PII in non-prod by default. One schema-as-code across targets. Auth redirects and Vercel Production/Preview secret scopes map to those projects. Free-tier: 2 active projects; ~7d pause caveat; storage caps known.

**Rationale:** Matches Free plan; Previews already staging-class (D-027); local doesn’t burn a cloud slot.

**Implications:**
- Canon: D-030; template + Ambientes page. Projects/secrets not provisioned in this change. Seed → #154.

---

## 2026-07-10 — Supabase CLI migration strategy (#152 / B2)

### Migrations in repo; CLI apply; not on Vercel deploy

**Decision:** Schema source of truth = `supabase/migrations/` via Supabase CLI. Apply local against Docker; staging/prod via CLI `db push` (staging before prod). No auto-migrate on Vercel. Forward-only; seed separate (#154); RLS in migrations. `docs/database-schema.sql` = legacy until ported. Optional thin npm wrappers later — no custom migrator.

**Rationale:** Matches Supabase local/cloud; keeps deploys from mutating schema by surprise.

**Implications:**
- Canon: D-031; template + Ambientes. Local runbook → #153 / D-032. Init/scaffold → #171 / #43.

---

## 2026-07-10 — Local Supabase runbook (#153 / B3)

### OrbStack preferred; docs-only; init deferred

**Decision:** Document local Supabase day-to-day: OrbStack preferred on macOS (Docker Desktop OK); install CLI; start/stop/status; Studio + keys → `.env`; `db reset`; common failures. **No** `supabase init` / `supabase/` scaffold in this leaf — that belongs to bootstrap (#171) and/or schema build (#43). Toolchain inventory stays #170; seed #154; cloud push remains D-031.

**Rationale:** Closes the operational gap without mixing repo scaffold into definition docs; keeps #153 focused vs #170/#171.

**Implications:**
- Canon: D-032; `templates/supabase-local.md` + Ambientes pointer. Next dados leaf: #154 seed.

---

## 2026-07-10 — Seed / test data + LGPD non-prod (#154 / B4)

### Shared synthetic pack; dummy docs; test logins; recreatable

**Decision:** One base seed pack for local+staging (not prod). Supabase operational rows + stable house IDs; CMS fixtures later (#156/#157). Realistic pt-BR synthetic people; dummy RG/CNH repo fixtures → local/staging storage only. Known corretor+staff test auth accounts (non-prod). Disposable and one-command recreatable. No prod dumps. Full LGPD hardening → #126. Docs only in this leaf (`templates/seed-lgpd.md`).

**Rationale:** Safe UAT and ID-verification testing without real customer PII.

**Implications:**
- Canon: D-033. Implement seed files after supabase scaffold. Next epic leaf: #155 CMS vendor.

---

## 2026-07-10 — CMS vendor: Sanity (#155 / C1)

### Sanity chosen; Contentful removed from installed stack

**Decision:** CMS vendor = **Sanity**. Free-tier longevity, 2 datasets for staging/prod, schema-as-code, avoid Contentful pricing cliff. Remove `contentful` dependency; `useCms` composable (mocks until provisioned). Retitle build issues #45/#63. Datasets → #156; content model → #157.

**Rationale:** Matches D-015 free-first and ForteGB scale.

**Implications:**
- Canon: D-034. D-016 taxonomy unchanged (CMS + Supabase). Living docs/code no longer point at Contentful as the stack.

---

## 2026-07-10 — Sanity datasets per environment (#156 / C2)

### Two datasets; Previews share staging; explicit promote

**Decision:** One Sanity project; datasets `staging` + `production`. Local + staging + all Vercel Previews → `staging`; prod → `production`. Promote content with explicit CLI/copy — not on Vercel deploy. Preview env → staging dataset; Production → production; local → staging or mocks. Exact var names → #162+. Content model → #157.

**Rationale:** Mirrors Supabase/Vercel staging-class sharing; fits free tier; prevents deploy from publishing draft content.

**Implications:**
- Canon: D-035; template + Ambientes. No Sanity project created in this change. Next: #157 content model.

---

## 2026-07-10 — CMS content model (#157)

### Document types + house CMS/Supabase split

**Decision:** Sanity types `house`, `blogPost`, `constructionTimeline`, `mediaKit`. v1 full depth on house + blogPost; timeline/mediaKit stub for later (D-018). Sanity holds marketing + `houseId`; Supabase holds ops (status, Tuya, QR). Nuxt merges by `houseId`. Video = YouTube/Vimeo URLs. Locale = pt-BR only. This leaf = docs only; Studio schemas → #45.

**Rationale:** Keeps PII/ops out of CMS; shared contract for Studio and portfolio without over-modeling v3 modules in Architecture.

**Implications:**
- Canon: D-036; `templates/cms-content-model.md` + Ambientes. Next Architecture leaf: #158 integrations 3-tier model.

## 2026-07-10 — Integration 3-tier model (#158)

### Postures mock / safe-target / prod-live

**Decision:** Integration tiers are postures (not environments): mock, safe-target, prod-live. Defaults: local→mock, staging+Previews→safe-target, prod→prod-live. Overrides only on local/staging within {mock, safe-target}; prod always live; never prod-live outside prod; never infer from credentials. Effective tier = override ?? default(APP_ENV). Docs only; map/targets/mocks → #159/#160/#172; env names → #162.

**Rationale:** Locks safety rules before per-vendor maps; allows conscious local→sandbox without opening production.

**Implications:**
- Canon: D-037; `templates/integrations-tiers.md` + Ambientes. Next: #159 per-integration map.

## 2026-07-10 — Integration map per vendor (#159)

### Inventory, safe-target classes, MVP phases

**Decision:** Map HubSpot, Tuya, WhatsApp, Telegram, Google Calendar, QStash (+ Gov.br deferred). Safe-target classes: test portal / test lock / sandbox number / dev bot / test calendar / non-prod QStash creds. Phases: HubSpot+WA+QStash v1; Telegram v1 seam; Tuya+Calendar v2; Gov.br manual. Not Supabase/Sanity. Docs only; concrete targets → #160.

**Rationale:** Separates inventory/classes from account provisioning; aligns with D-018.

**Implications:**
- Canon: D-038; `templates/integrations-map.md`. Next: #160 concrete safe targets.

## 2026-07-10 — Safe-target concrete contract (#160)

### Must/must-not, TBD slots, secret placement

**Decision:** Document concrete safe-target contract with TBD slots (no invented IDs). Per-vendor must/must-not (esp. Tuya ≠ sale-house lock). Secrets in Vercel Preview/Production scopes + local `.env` only — never git/HTML. Owner = ForteGB tech. Docs only; fill slots at setup. Env names → #162; credential runbook → #164/#165.

**Rationale:** Spec-before-provision pattern; keeps secrets out of the repo.

**Implications:**
- Canon: D-039; `templates/integrations-safe-targets.md`. Next Architecture leaf: #161 webhooks.

## 2026-07-10 — Webhooks / callbacks by environment (#161)

### Stable hosts only; Preview bypass; staging sink

**Decision:** Vendor-registered callbacks use only `https://fortegb.com` (prod) and `https://staging.fortegb.com` (stable staging). Preview `feat/*`/`fix/*` never get vendor webhook URLs (ephemeral + Vercel password). Local defaults to mock inbound; optional ephemeral tunnel for deliberate tests. Path convention `/api/webhooks/<vendor>`; signature verification required on real inbound. Docs only.

**Rationale:** Preview cannot be a reliable public callback target; one staging sink fits free-first solo UAT.

**Implications:**
- Canon: D-040; `templates/integrations-webhooks.md`. Next Architecture leaf: #162 env var inventory. Tunnel tooling → #170; mocks → #172.

## 2026-07-10 — Env var inventory + naming (#162)

### Convention + canonical name list

**Decision:** Document SCREAMING_SNAKE naming; `NUXT_PUBLIC_*` for client-only; vendor prefixes; `INTEGRATION_TIER_<VENDOR>` overrides (D-037). Inventory covers APP_ENV, Supabase, Sanity, HubSpot, WhatsApp, Telegram, QStash, Tuya, Google Calendar, webhook secrets, and overrides — with v1/v2 phase tags. Docs only; no values; no `.env.example`.

**Rationale:** Stops ad-hoc key invention before Vercel/local setup; absorbs existing `nuxt.config.ts` names.

**Implications:**
- Canon: D-041; `templates/env-vars.md`. Next: #163 scoping (Production/Preview/local).

## 2026-07-10 — Env value scoping (#163)

### Production / Preview / local surfaces

**Decision:** Three required value surfaces — Vercel Production (`APP_ENV=prod` + prod backends), Vercel Preview (`APP_ENV=staging` + staging-class for `staging` and all `feat/*`/`fix/*`), local gitignored `.env`/`.env.local` (`APP_ENV=local`, mock/local default). Same D-041 names; different values. Vercel Development scope not required. Docs only.

**Rationale:** Matches existing one-Preview-secret-set topology; prevents prod keys leaking into Previews.

**Implications:**
- Canon: D-042; `templates/env-scoping.md`. Next: #164 secrets access policy.

## 2026-07-10 — Secrets access policy (#164)

### Tech-only ownership; no partner API keys; rotate on leak

**Decision:** ForteGB tech owns Production and staging-class secrets (Vercel env + vendor API keys). Sócios get Preview password access only, not env/API keys. Secrets never in git, public docs, issues/PRs/OpenSpec, or partner chat. Rotate on leak/device loss/vendor compromise; periodic rotation optional. No paid vault required for v1. Docs only.

**Rationale:** Least privilege for a solo-tech family operation; prevents casual secret sharing.

**Implications:**
- Canon: D-043; `templates/secrets-access.md`. Next: #165 `.env.example` + SETUP-CREDENTIALS structure.

## 2026-07-10 — .env.example + SETUP-CREDENTIALS structure (#165)

### Commitable example file; secret-free runbook

**Decision:** Add root `.env.example` with all D-041 names and empty/non-secret placeholders. Rewrite `docs/SETUP-CREDENTIALS.md` as obtain/place runbook (local vs Vercel Preview/Production) with D-042/D-043 pointers — no secret values, no Contentful. Gitignore `.env` / `.env.local` / `.env.*.local`. Rotation dates stay in a private note. Filling real credentials deferred to setup (#47).

**Rationale:** Gives a safe copy-paste bootstrap; removes outdated/dangerous sample material from SETUP.

**Implications:**
- Canon: D-044; `.env.example` + SETUP + `templates/env-example.md`. Config area E definition complete; next Architecture leaf: #166 CI/CD close→staging.

---

## 2026-07-10 — CI/CD stage vs close (#166)

### Stage lands on staging; close archives to main

**Decision:** Opt-in `.rbo/lifecycle.yml` (`integrationBranch: staging`). **Stage** merges `feat/*` → staging without OpenSpec archive or issue close. **Close** archives then merges staging → `main` (`Closes` + Done + `pages:sync`). No config → close unchanged (`feat/*` → `main`). Fail if remote staging missing on stage; fail-closed on close if not staged. Supersedes D-026 “close lands on staging” only; branch map unchanged. Skills implemented in companion `ai-skills` issue (not this platform leaf alone).

**Rationale:** UAT may fail after land; archive/close must wait until production ship. Global skills stay safe via opt-in.

**Implications:**
- Canon: D-045; `.rbo/lifecycle.yml`; environments template + Ambientes. Remote `staging` → #167. Skill code → `ai-skills`.

---

## 2026-07-11 — CI/CD deploy pipeline branch→Vercel (#167)

### Native Vercel trigger, main-only merge gate, deferred staging bootstrap

**Decision:** Deploy trigger is Vercel's native git integration — no custom CI now (custom build hooks addable later if needed). Merge into `main` requires a passing Vercel deploy; `staging` stays ungated (integration/validation role, per D-045). Rollback uses Vercel's built-in dashboard rollback. No custom deploy notifications — Vercel's default emails suffice. `origin/staging` creation is decided now (long-lived, from `main`) but deferred to Execução bootstrap (#42/#46), not this Definição leaf. Definição leaves closing before staging exists merge `feat/*`→`main` directly, same as #166.

**Rationale:** Decision-only leaf, no provisioning (G2 still gates Execução). `main`-only gating matches staging's role as a place to catch problems, not block them.

**Implications:**
- Canon: D-046; `templates/cicd-deploy-pipeline.md`; `environments.md` pointers. Branch protection toggle + `origin/staging` creation → #42/#46 (Execução).

---

## 2026-07-11 — CI/CD migrations on merge (#168)

### Manual apply, trigger points tied to stage/close, commit-message traceability

**Decision:** Migration apply stays manual — no CI automation (new workflow + secrets surface + approval gate needed to preserve D-031's staging→smoke→prod order, real cost with no demonstrated need). Trigger points: after `rbo-stage-change` lands on staging, apply against staging; after `rbo-close-change` merges to `main` post-smoke, apply against prod. Traceability via commit message (migration filename referenced), no tooling. No automated pending-migration check — a missed migration surfaces as a loud, immediate application error, same accepted-risk reasoning as D-046's rollback/notifications choices.

**Rationale:** Proportionate to solo/family scale; avoids a new CI/secrets surface without demonstrated need; not a closed door — revisit if forgetting becomes a real recurring problem.

**Implications:**
- Canon: D-047; `environments.md` pointer near D-031/D-032. Skill instruction changes (`rbo-stage-change`/`rbo-close-change`) → separate companion cycle in `ai-skills`, not this leaf.

---

## 2026-07-11 — CI/CD promotion/hotfix process (#169)

### One-at-a-time promotion, hotfix bypass with mandatory staging sync

**Decision:** Promotion happens one staged change at a time — closing a staged change promotes everything on `staging`, so don't close one while another is still mid-validation on the same branch (explicit decision, not accidental git-merge behavior). Hotfix: branch `hotfix/<name>` from `main`; `rbo-close-change` (v0.5, already shipped in `ai-skills`) recognizes the prefix and bypasses staging, merging straight to `main`. Mandatory `main`→`staging` sync immediately after a hotfix lands — not optional. Recording: normal issue/OpenSpec tracking is sufficient per use; `decisions.md` records the procedure once, not each invocation.

**Rationale:** Selective promotion tooling has no demonstrated need; staging sync is cheap now, expensive to discover missing later; per-use logging would be ceremony disproportionate to an exception mechanism.

**Implications:**
- Canon: D-048; `environments.md` pointer near D-045/D-046/D-047. Skill support already delivered separately (`ai-skills` v0.7.0, `uniform-hotfix-exception`).

---

## 2026-07-11 — Dev local toolchain (#170)

### Four-tool inventory, dual Node pin, no pinning elsewhere

**Decision:** Local dev toolchain is exactly four tools — Node.js, Docker/OrbStack (D-032), Supabase CLI (D-031), ngrok. Node pinned two ways: `.nvmrc` (day-to-day `nvm use`) and `engines` in `package.json` (free safety net on `npm install`). No version pinning for the other three — human-invoked CLI tools with their own auto-update, "latest stable" is the standing expectation. ngrok confirmed optional/tunnel-only per D-040, not elevated to baseline.

**Rationale:** Node is the one tool where version drift causes real, subtle bugs; the others already have their own update safety net, so a doc-only pin would be redundant, not additive.

**Implications:**
- Canon: D-049; `environments.md` pointer near D-030–D-032; new `templates/dev-local-toolchain.md`. Actual install/bootstrap → #171.

---

## 2026-07-11 — Dev local bootstrap runbook (#171)

### Local-only, ordered checklist consolidating already-decided pieces

**Decision:** New `templates/dev-local-bootstrap.md` — ordered runbook: clone → toolchain (D-049) → Supabase local (D-032) → env vars (D-044) → `npm run dev` working. Local only — staging/prod bootstrap stays with #42/#43/#46 (Execução), not this leaf. Docs only, no commands executed by this leaf.

**Rationale:** All the pieces already exist as decisions; this leaf only orders and consolidates them. Including staging/prod would duplicate #42/#43/#46 and blur the Definição/Execução split.

**Implications:**
- Canon: D-050; new `templates/dev-local-bootstrap.md`; `environments.md` pointer.

---

## 2026-07-11 — Dev local mock strategy (#172)

### Happy-path default, per-vendor boolean env var override, adapter-colocated

**Decision:** Mock posture defaults to a successful, realistic-shaped response for every vendor. A single boolean override per vendor (`MOCK_<VENDOR>_FORCE_ERROR`, following D-041's naming convention) forces a generic failure — no parameterized failure types, no config file. Mocks live inside each vendor's existing adapter module (D-017), not a separate directory. Documentation only — no mock code written in this leaf.

**Rationale:** Trivial-only mocks never exercise error-handling code locally; elaborate failure-type simulation is more machinery than needed at this scale — that nuance belongs at the safe-target tier against a real sandbox API.

**Implications:**
- Canon: D-051; pointer in integrations docs near D-037–D-040. Mock implementation code → Etapa 8 build.
