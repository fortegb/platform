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

## Index

> Append-only, like the rest of this file — one line per entry below, added
> when the entry is added, never edited. Browse here before grepping when
> you don't know the right keyword yet.

- D-015–D-018 — Grilling 0: build vs buy, content placement, system shape, MVP boundary (#145)
- D-025 — Environment tiers (#147)
- D-026 — Branch → environment map (#148)
- D-027 — Vercel topology (#149)
- D-028 — Passos 1–2 validated (#177)
- D-029 — Domains per environment (#150)
- D-030 — Supabase projects per environment (#151)
- D-031 — Supabase CLI migration strategy (#152)
- D-032 — Local Supabase runbook (#153)
- D-033 — Seed / test data + LGPD non-prod (#154)
- D-034 — CMS vendor: Sanity (#155)
- D-035 — Sanity datasets per environment (#156)
- D-036 — CMS content model (#157)
- D-037 — Integration 3-tier model (#158)
- D-038 — Integration map per vendor (#159)
- D-039 — Safe-target concrete contract (#160)
- D-040 — Webhooks / callbacks by environment (#161)
- D-041 — Env var inventory + naming (#162)
- D-042 — Env value scoping (#163)
- D-043 — Secrets access policy (#164)
- D-044 — .env.example + SETUP-CREDENTIALS structure (#165)
- D-045 — CI/CD stage vs close (#166)
- D-046 — CI/CD deploy pipeline branch→Vercel (#167)
- D-047 — CI/CD migrations on merge (#168)
- D-048 — CI/CD promotion/hotfix process (#169)
- D-049 — Dev local toolchain (#170)
- D-050 — Dev local bootstrap runbook (#171)
- D-051 — Dev local mock strategy (#172)
- D-052 — Tuya viability + failure mode, local-pool primary (#181)
- D-053 — Visits: data model + identity verification (#180)
- D-054 — Messaging: WhatsApp/Telegram provider, triggers, consent (#182)
- D-055 — RBAC: role model and permissions (#183)
- D-056 — Admin: build-vs-buy conflict resolution (#184)
- D-057 — Jornada: site discovery journey validated, WhatsApp-CTA lead capture (#185)
- D-058 — Jornada: scheduled-visit journey corrected against Tuya/identity architecture (#186)
- D-059 — Jornada: instant/QR visit journey — phone-OTP reuse gate, reopens D-053 (#187)
- D-060 — Jornada: staff verification-exception queue — reject notifies visitor, Telegram staff alert (#192)
- D-061 — Jornada: post-visit reengagement — magic-link self-service cancel/reschedule, new cancelled status, follow-up consent split (#188)

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

---

## 2026-07-11 — Tuya: API viability + failure mode (#181)

### Two co-equal mechanisms behind an adapter seam; local-pool as launch default

**Decision:** The installed device (Intelar X2, Tuya WiFi lock) already confirms time-windowed temp passwords as a real capability via its consumer app; Cloud API access for this rebrand stays unverified until a manual spike — that spike is active, near-term scope, not deferred to a volume-driven someday trigger (execution itself sits with #77/#135, Execução). The adapter seam (D-017) hides the mechanism behind `provisionAccess`/`markUsed`/`revoke` — the rest of the visit journey (identity, booking, CRM, WhatsApp) never touches Tuya directly. `local-pool` (pre-provisioned per-house codes, no live API in the critical path) and `tuya-live` (real Cloud API calls) are both first-class mechanisms, equally part of the architecture, journey design, and grilling — neither is shelved. `local-pool` is simply the **launch default** since it doesn't require Cloud API confirmation to ship; `tuya-live` becomes available once the near-term spike confirms viability, at which point which mechanism is primary is an operational choice, not a reopened architecture question. Fallback for either mechanism: a static per-house emergency code (keypad-local, no cloud dependency) + reschedule — never staff dispatch as a designed tier. Failure detection is synchronous at issuance (API error/timeout/offline triggers an immediate staff WhatsApp alert), never visitor-reported; the instant/QR flow needs a much shorter timeout than the scheduled flow. Emergency codes are scoped per house, rotate monthly plus immediately after every real use, and live in a restricted Supabase table (ties to the LGPD epic #126–129) with every fallback trigger logged. v1 maintenance is via Supabase Studio, no bespoke admin UI — explicitly deferred to #184 if scale grows. This resolves a real conflict with D-039: the installed X2 is prod-only (never the staging safe-target default); a second dedicated test lock (spec TBD, matching the X2's password DP set) is required before any automated safe-target testing of the write-password flow.

**Rationale:** Keeping both mechanisms as first-class citizens avoids under-investing in the Tuya API track (it stays on the active plan, not an indefinite "later"), while still giving a launch path (`local-pool`) that isn't blocked by an unconfirmed network dependency. Sequencing the default is not the same as dropping or deferring either option.

**Implications:**
- Canon: `docs/planning/decisions.md` D-052; `templates/tuya-access-adapter.md`.
- Resolves Q-006 (partial — fallback settled; scheduled-vs-instant ordering stays with #180). #180 and #182/#183 can proceed without waiting on Cloud API confirmation.
- Second test lock (spec TBD) is a prerequisite before #77/#135 (Execução) can automate safe-target testing; #77/#135 should scope the Tuya API spike/implementation as near-term work, not conditional on visitor-volume growth.

---

## 2026-07-12 — Visits: data model + identity verification (#180)

### One verification mechanism for both flows, Cliente-scoped reuse, three-entity model replacing the legacy visits table

**Decision:** `client-match` (a frontend library comparing selfie to document) is the primary identity-verification mechanism for **both** the scheduled and instant/QR visit flows — no KYC SaaS (disproportionate cost/build at this scale) and no split mechanism by flow type, since `client-match` has to exist for the instant flow anyway (a visitor can't wait on live staff review) and reusing it for scheduled visits avoids duplicating the model. `staff-review` is the shared exception queue, triggered either automatically (low match confidence) or by the visitor messaging staff directly via WhatsApp when an instant verification is declined. The instant flow never engineers a synchronous wait for staff — a failed automated check is an immediate decline with a WhatsApp escape hatch, mirroring (inverted) the Tuya fallback shape from `D-052`. Any staff-review resolution — automatic or WhatsApp-initiated — is recorded as a normal `verification_attempt` and only then triggers the Tuya adapter's `provisionAccess()`; staff never hands out an ad hoc access code (local-pool or emergency) as a shortcut around verification. Verification results live on `Cliente` (`identity_verified_at`, reusing the existing CPF-keyed model from `D-020`) with a 12-month freshness window, so a recurring visitor within that window skips re-verification entirely. Retention is split by artifact: the selfie is ephemeral (deleted on approval, 30-day hold on rejection/exception), while the document photo (RG/CNH) is retained for the active 12-month verification window — covering the legitimate need to identify a visitor in case of damages/incidents — then deleted on renewal or expiry. The data model replaces the legacy denormalized `visits` table with three entities (`Cliente` + `identity_verified_at`, new `verification_attempt`, and `visit` with a `pending_verification → verified → access_provisioned → completed/declined` status progression), with a hard gate: `provisionAccess` only fires once `visit.status = verified`.

**Rationale:** A single verification mechanism shared across both flows avoids building and maintaining two different pipelines; reusing the exception queue (automatic or WhatsApp-initiated) avoids inventing a second approval path. Reuse via `Cliente` avoids re-uploading documents on every recurring visit without weakening the guarantee, since the freshness window still expires. Artifact-level retention balances LGPD minimization with a real, time-bounded liability-traceability need. The hard gate between verification and access is what makes the two adapters (identity + Tuya) composable without relying on manual discipline.

**Implications:**
- Canon: `docs/planning/decisions.md` D-053; `templates/visitas-identidade-modelo-dados.md`.
- Resolves Q-005. Passo 5 (#176) can design the visit journey on top of an already-decided data model; #80 (Execução) implements the concrete library/threshold/queue-UI tuning without reopening architecture.
- #182/#183 (messaging/RBAC) can assume `Cliente.identity_verified_at` and the `visit.status` hard gate already exist.

---

## 2026-07-12 — Messaging: WhatsApp/Telegram provider, triggers, consent (#182)

### Direction-based channel split, deferred provider pick, QStash-routed sends

**Decision:** Messaging channel is split by direction, not by cost: **WhatsApp always** for any externally-facing message (visitor, customer, **or corretor** — any party outside ForteGB), no exceptions — forcing an external party onto Telegram (install an app, create an account) is unacceptable. **Telegram** is reserved for **internal-only** notifications (staff/system, no external party involved), justified by a real technical asymmetry rather than generic preference: Telegram's Bot API needs no template-approval process, is free regardless of volume, and takes minutes to set up (BotFather), versus WhatsApp Business API's business verification and pre-approved templates for business-initiated messages outside the 24-hour window. This corrects `D-017`'s generic "Telegram-first" framing to the exact scope where it still applies, reconciling it with the WhatsApp-only pattern already assumed informally in `D-052`/`D-053`. Consent is split into two scopes: transactional/operational messages (visit confirmations, access codes, staff escalation, reminders) are implicitly covered by `Cliente`'s mandatory WhatsApp field (`D-020`) plus the specific action taken — no separate opt-in; marketing/promotional messaging is a distinct, explicit opt-in scope, off by default, named now but not built (it's `D-018`'s v2+ territory). The actual provider (WhatsApp Business API direct vs. a Twilio wrapper) is **not** chosen in this leaf — same "spec now, provision later" pattern as Tuya's second test lock (`D-052`) — only the selection criteria are documented (template support, reasonable BR pricing, serverless-compatible), with the real pick deferred to `#75` (Execução). All sends (WhatsApp or Telegram) route through QStash (`D-017`), never a synchronous call inside the triggering request handler. Messaging is simply another vendor behind the existing adapter seam (`D-017`), the same shape as Tuya (`D-052`), not a new pattern.

**Rationale:** The direction-based split resolves a real tension between `D-017`'s generic Telegram-first framing and the WhatsApp usage already assumed in `D-052`/`D-053`, backed by a concrete technical reason (template/cost/setup friction) rather than preference alone. Implicit consent for transactional messages avoids disproportionate ceremony at this scale; naming the marketing consent scope now avoids future conflation without building anything prematurely. Deferring the vendor pick matches the pattern already used for Tuya — real verification needs a live account, not more speculation.

**Implications:**
- Canon: `docs/planning/decisions.md` D-054; `templates/mensageria-provider-gatilhos.md`.
- No prior `Q-XXX` resolved — this gap was identified in the post-#146 review, not previously tracked in `open-questions.md`.
- `#75` (Execução) picks the vendor and implements without reopening architecture; Passo 5 (#176) designs the trigger-by-trigger journey on top of this already-decided policy; `#183`/`#184` (RBAC/admin) can assume the WhatsApp-external/Telegram-internal split is already settled.

---

## 2026-07-12 — RBAC: role model and permissions (#183)

### Single role enum, hierarchy at evaluation not storage, two-layer enforcement

**Decision:** `D-018` had already flagged "RBAC covering all roles" as a foundational "lock now" item, but it was never formalized — only a loose table in `architecture.md` §2 existed, with documented overlap (Ricardo as both Admin and Digital; all three founders as both Admin and Sócio/investidor). This leaf resolves it: a **single `role` enum per user** — `cliente | corretor | staff | admin` — with no multi-role assignment, since Corretor and Cliente are mutually exclusive relationships to the business (a corretor doesn't buy, a customer doesn't sell) and multi-role machinery doesn't reflect the domain's reality. "Digital" and "Sócio/investidor" are **not** RBAC roles — they're organizational facts recorded in `company-structure.md` that don't gate any distinct system capability on their own. Admin is not "Staff + Admin" stored together — it's a single role that is hierarchically superior to Staff **at permission-check evaluation time** ("requires Staff-level access" passes automatically for Admin); this hierarchy is a property of evaluation, not of what's stored on the user. Enforcement happens in two layers: app-level middleware/routing (a UX convenience, not a real security boundary) and Supabase RLS (the actual row-level security boundary), matching the pattern already used for the private document bucket (`D-016`/`D-030`) — a route-guard bug should never be the only thing standing between a Corretor and another Corretor's leads. `Visitante` is not a stored enum value — it's the default/absence case for anyone without a session; anonymous-traffic tracking (Google Ads, GA4) is a separate concern (`#124`), orthogonal to authorization.

**Rationale:** A single enum per user avoids multi-role machinery the domain doesn't call for; treating "Digital"/"Sócio" as organizational facts rather than RBAC roles keeps the enum from inflating with labels that gate nothing. Hierarchy at evaluation time (not storage) resolves the documented founder overlap without multi-assignment. Two enforcement layers, not one, because middleware is UX convenience while RLS is the real security boundary — the same logic already applied to the private document bucket.

**Implications:**
- Canon: `docs/planning/decisions.md` D-055; `templates/rbac-modelo-papeis.md`.
- No prior `Q-XXX` resolved — same as `D-054`, this gap surfaced in the post-#146 review.
- `#50` (Execução) implements RLS/profiles without reopening architecture; Passo 5 (#176) designs screens/flows on an already-decided role model; `#184` (admin) can assume `admin ⊇ staff` hierarchically when resolving its build-vs-buy conflict.

---

## 2026-07-12 — Admin: build-vs-buy conflict resolution (#184)

### Amend the scope, not the rule — content editing stays vendor-only, operational workflow UI is a distinct, named category

**Decision:** The existing `platform-architecture` requirement ("Build-vs-buy default") prohibits *"back-office admin UIs for owner-only content editing"* — but that's narrowly scoped to content (houses, photos, blog), already correctly resolved by Sanity (`D-034`). The declared need surfacing across `D-052`–`D-055` (staff approving corretores, staff reviewing the identity-verification exception queue, staff managing Tuya emergency codes, RBAC role assignment) is a different thing entirely — **operational workflow UI** — a category the original rule never addressed. This isn't a real architecture conflict; it's a requirement written too narrowly that needs amending. The resolution is a **three-part test** for when custom UI is justified (build only if at least one holds): (1) a multi-step workflow with side effects beyond changing a value (e.g. approving a corretor also notifies them and unlocks portal access; approving a verification exception triggers `provisionAccess`); (2) domain-specific rendering a generic dashboard can't reasonably do (e.g. comparing a selfie against a document photo for a human match call); (3) needs to be safe for non-technical staff (Cláudia, Gisele) without touching a database table directly. If none apply, it stays on the vendor dashboard (Supabase Studio/Sanity Studio) — unchanged from the original rule. Reclassifying what's already been decided: corretor-onboarding approval and the verification exception queue (`D-053`) hit (1) and (2) → custom UI justified; Tuya emergency-code rotation (`D-052`) hits none → stays on Supabase Studio, original call unchanged. All operational workflow UI lives under a single `/staff/*` route namespace, gated at `staff`-level via `D-055`'s RBAC middleware — Admin already passes any Staff-level check by hierarchy, so no separate `/admin/*` tree is needed; genuinely Admin-only actions (platform config, API keys, role assignment) get a stricter per-route/per-action check within the same tree. This amends `platform-architecture`'s existing requirement directly (a `MODIFIED` requirement delta), not a new capability, since it's a scope correction to an existing rule, not a new domain.

**Rationale:** Treating this as a scope amendment (not an abandonment of the original rule) preserves the buy-first discipline where it's always worked well (content) while acknowledging operational workflow is a real, distinct need that was never consciously decided — only implicitly assumed across `D-052`/`D-053`. The three-part test avoids both "everything is admin, build it all" and "nothing is admin, build nothing," giving a reusable criterion for future decisions without reopening this architecture for every new screen. A single `/staff/*` namespace avoids duplicating UI trees when `D-055`'s hierarchy already resolves Admin vs. Staff at evaluation time.

**Implications:**
- Canon: `docs/planning/decisions.md` D-056; `templates/admin-build-vs-buy.md`; amended requirement in `openspec/specs/platform-architecture/spec.md`.
- **Epic #179 (Arquitetura de domínio) has all 5 leaves closed** — unblocks Passo 5 (Jornadas, #176) to design screens on an already-decided foundation.
- The corrected `platform-architecture` requirement prevents future Execução work from over-reading "no bespoke admin" more broadly than intended.

---

## 2026-07-12 — Jornada: descoberta e navegação do site (#185)

### WhatsApp CTA clicks become a tracked lead, reusing the existing contact endpoint, fire-and-forget

**Decision:** The site discovery journey (home → portfólio → detalhe da casa → blog → contato) existed as a pre-architecture draft, flagged `RASCUNHO — re-validar no passo 5`. Re-validating it against the closed domain architecture surfaced a real gap: `crm-source-of-truth` already lists "site-form/WhatsApp-CTA contatos" as a v1 lead source, but no WhatsApp CTA on the journey captured anything — they're static `wa.me` links with no backend round-trip. This leaf closes that gap: every WhatsApp CTA on the journey (home, portfólio detalhe, contato) now fires a fire-and-forget request immediately before opening the `wa.me` link, creating/updating a `Contato`-tier `cliente` record tagged `fonte: cta-whatsapp` — never blocking or delaying the visitor's navigation to WhatsApp. The beacon reuses the existing `POST /api/contact` endpoint rather than introducing a new one (it already validates input and is the natural landing spot for "something entered the lead funnel"); required-field validation now applies only on the contact-form path, while the beacon path requires just `fonte` plus minimal page/house context. Fire-and-forget failures are silent and non-blocking by design — this is a marketing signal, not a transaction, so occasional loss is an acceptable trade against adding latency to every WhatsApp click; no retry/outbox is built preemptively. `wa.me` links are explicitly **not** treated as a platform-originated send: `messaging-channel-policy`'s QStash-routing requirement governs messages the platform itself dispatches, while a `wa.me` link only opens the visitor's own WhatsApp client with a pre-filled draft they choose to send — no change to that policy, just a documented boundary so `#75` doesn't later misread this CTA as needing provider routing. The journey continues to require no authentication and stores no `Visitante` entity (`D-055`), consistent with the two lead-capture points being its only trace-leaving actions. `/sobre` is out of scope (no distinct lead-capture or architecture surface); visit/identity/Tuya flows remain separate Passo 5 leaves (`#186`/`#187`).

**Rationale:** Capturing the WhatsApp click closes the gap between what `crm-source-of-truth` already promises (a CTA-WhatsApp source) and what the code actually does, rather than deferring that promise indefinitely. Reusing the existing endpoint avoids duplicating persistence/sync logic just to distinguish lead origin. Fire-and-forget prioritizes visitor experience (no perceptible delay) over delivery guarantees, proportional to the real risk (a marketing lead, not a payment). Documenting the non-applicability of `messaging-channel-policy` here heads off a future misreading by whoever implements `#75`.

**Implications:**
- Canon: `docs/planning/decisions.md` D-057; `templates/jornada-descoberta-site.md`; new `journey-site-discovery` capability (`openspec/specs/`).
- `#56`/`#78`/`#73` (Execução) implement the frontend beacon and endpoint persistence without reopening architecture.
- `jornadas-plataforma.md` §3.1 and `screen-map.md` move from draft to validated for this journey; later Passo 5 leaves (`#186`–`#195`) follow the same re-validation pattern.

---

## 2026-07-12 — Jornada: visita agendada (#186)

### Correct the scheduled-visit journey against Tuya and identity architecture — gated provisioning, async exception handling, 12-month reuse

**Decision:** The scheduled-visit journey (booking → identity verification → Tuya access → WhatsApp confirmation) predates both `D-052` (Tuya adapter seam, fallback) and `D-053` (visit/identity data model, `client-match`/`staff-review`, 12-month reuse) and was never rebuilt against them. Re-validation found structural gaps, not cosmetic ones: `server/api/visits/schedule.post.ts` writes to the legacy `visits` table `D-053` replaced; `programSmartLock()` calls Tuya directly and swallows failures (catch + log, response still says "success") instead of using `D-052`'s adapter seam and fallback; the endpoint trusts a client-supplied `verificationData.verified` boolean instead of deriving state server-side; the WhatsApp confirmation is sent synchronously instead of via QStash (`D-054`); `D-053`'s 12-month reuse window (`Cliente.identity_verified_at`) is never checked; and there is no `staff-review` code path at all — a failed `client-match` simply dead-ends in an error. This leaf corrects all of it: a returning `Cliente` verified within 12 months skips the verification step entirely (implementing `D-053`'s already-decided reuse rule for the first time); access provisioning becomes a single gated call to the adapter's `provisionAccess(visit)` only after `visit.status = verified` is persisted server-side, so the credential shown to the visitor and the one programmed on the lock can never diverge, and a failed call triggers `D-052`'s fallback (static emergency code + immediate staff WhatsApp alert) instead of a silent fake success; a failed/low-confidence `client-match` now enqueues a pending `verification_attempt` to the shared `staff-review` queue **asynchronously** — settling the one question `D-053` left open for this specific flow (it only specified synchronous-wait avoidance for the *instant* flow) — since a scheduled visit, booked at least a day ahead, has slack an instant/QR visit doesn't; and all outbound messages route through QStash. Selfie retention was reconsidered during exploration (whether to retain it indefinitely "to simplify the flow") and explicitly kept as `D-053` specified — the capture step is identical either way, so the proposed simplification didn't actually remove a flow branch, only a post-approval delete call, and retaining biometric-adjacent data longer than needed traded a real minimization safeguard for a simplification that wasn't real. This leaf explicitly draws a boundary with two sibling leaves: the staff-review screen itself is `#192`, and the instant/QR flow is `#187` — this leaf only specifies that a failure *enters* the shared queue and that its resolution *unlocks* the same `provisionAccess` path as automatic approval.

**Rationale:** The pre-architecture stubs weren't just incomplete — silently returning "success" when the lock write actually failed is a real reliability bug this leaf corrects before it becomes production behavior. Closing the 12-month reuse gap avoids forcing every recurring client to re-upload documents needlessly, a burden `D-053` had already ruled out. Resolving the exception-handling timing now (rather than accidentally inheriting the instant flow's synchronous pattern) avoids building an unnecessary wait where real slack already exists. Keeping selfie retention as `D-053` specified avoids reopening an LGPD minimization decision for a simplicity gain that didn't survive scrutiny.

**Implications:**
- Canon: `docs/planning/decisions.md` D-058; `templates/jornada-visita-agendada.md`; new `journey-scheduled-visit` capability (`openspec/specs/`).
- `#81`/`#80`/`#77`/`#135` (Execução) implement the endpoint/adapter/UI rewrite without reopening architecture.
- `#192` (staff-review screen) and `#187` (instant/QR) can build against the boundary already drawn here.
- `jornadas-plataforma.md` §3.2 and `screen-map.md` move from draft to validated for this journey.

---

## 2026-07-12 — Jornada: visita instantânea via QR (#187)

### Same structural corrections as #186, plus a phone-OTP reuse gate — explicit reopening of D-053

**Decision:** The instant/QR visit journey (plaque → QR → micro-page → verification → immediate access) had the same pre-architecture gaps `#186` fixed for the scheduled flow: the legacy `visits` table, a raw Tuya call that swallows failures while still returning "success," a client-trusted verification boolean, synchronous WhatsApp, no 12-month reuse check, and no failure-escalation path at all (today a failed check just 403s with no recovery). This leaf applies the same corrections, plus resolves a question specific to this flow: the 12-month reuse shortcut is safe for scheduled visits because staff has a calendar entry and days of lead time to notice a mismatch, but instant/QR access has zero human-reviewable gap between a reuse match and the door unlocking. Resolution: failure handling finally implements `D-053`'s already-decided rule literally — immediate decline with a WhatsApp staff-contact escape hatch, no synchronous wait, unlike `#186`'s async "we'll confirm before your visit" state, since a visitor at the door has no useful "later" to wait on. The 12-month reuse shortcut is gated, for this flow only, behind a WhatsApp one-time-code confirmation of phone possession — `identity_verified_at` alone unlocks scheduled visits but not this one. A successful code confirmation extends `identity_verified_at`, but only up to a hard ceiling of 24 months since the `Cliente`'s last actual `client-match` verification, tracked via a new `last_client_match_at` field that only a full verification touches; past that ceiling, code-based reuse is no longer offered and a full `client-match` re-run resets both timestamps. `verification_attempt.method` gains a third value, `phone-otp`, alongside the existing `client-match`/`staff-review` values — no new entity needed. This explicitly **reopens `D-053`** for the dual-timestamp bounded-refresh mechanism; `#186`'s scheduled-flow reuse logic is unaffected, since it still reads only `identity_verified_at` unconditionally.

**Rationale:** The same silent-success Tuya bug `#186` corrected existed here too and needed the same fix before it reached production. Implementing the "no synchronous wait" rule `D-053` had already decided but never built closes a real gap, not a new decision. Gating instant reuse behind phone possession recognizes that reuse risk is qualitatively different with no time slack and no human review — without that gate, anyone claiming an already-verified `Cliente`'s number would get in immediately. The 24-month ceiling stops the same person from indefinitely avoiding a real `client-match` just by repeatedly proving phone possession, preserving the intent of `D-053`'s freshness window even with the new shortcut layered on top.

**Implications:**
- Canon: `docs/planning/decisions.md` D-059; `templates/jornada-visita-instantanea-qr.md`; new `journey-instant-visit` capability; `MODIFIED` delta to `visit-identity-verification` (`openspec/specs/`).
- Formally reopens `D-053` — recorded here, not silently absorbed into a journey leaf.
- `#81`/`#80`/`#77`/`#135`/`#75` (Execução) implement without reopening architecture again; `#186` is unaffected.
- `jornadas-plataforma.md` §3.3 and `screen-map.md` move from draft to validated for this journey.

---

## 2026-07-12 — Jornada: staff verification-exception queue (#192)

### Purely additive consumer of D-052/D-053/D-054/D-055/D-056 — closes a gap in reject handling, reconsiders and keeps the WhatsApp/Telegram split

**Decision:** Both visit journeys (`#186`, `#187`) already defer verification-exception resolution to the shared `staff-review` queue `D-053` fully specifies, and `D-056` already names this exact screen (selfie vs. document side-by-side) as its canonical example of justified custom UI — but no consuming UI existed at all, not even a stub, unlike every prior journey leaf which corrected pre-architecture code. This leaf builds it: a `/staff/*` screen listing pending `verification_attempt` records from both flows, prioritized so instant/QR items surface ahead of scheduled ones (only the instant flow can have a visitor physically waiting when an exception is created). Approval reuses the exact same `provisionAccess` call site already established by `#186`/`#187` — no new access-granting code. Rejection closes a real gap `D-053` left open (it only detailed the approve path): `visit.status` moves to `declined` and a WhatsApp message is queued explaining the outcome, rather than leaving the visitor with zero signal. A new pending item also triggers a Telegram alert to staff — resolving a latent inconsistency between `D-052`'s literal "alerta a staff via WhatsApp" text (written before `D-054` existed) and `D-054`'s later, general internal/external channel split; this is a purely internal message with no external party involved, so it falls on the Telegram side of an already-settled rule, not a new one. During exploration, the WhatsApp/Telegram split itself was reconsidered — given WhatsApp is already mandatory for customer-facing messaging, is a second tool worth it? — and kept: WhatsApp Business API requires Meta template pre-approval **per distinct message type**, not once; internal notifications are the category most likely to keep growing (this leaf adds one, more will likely follow), so collapsing everything onto WhatsApp would mean repeating that approval friction for every future internal alert, while Telegram has none of it. `D-054` is not reopened.

**Rationale:** This leaf changes nothing about the underlying verification mechanism, data model, or messaging policy — it's the first journey leaf that's purely additive rather than corrective, because no code existed to correct. Flow-type prioritization mirrors the same urgency reasoning already applied in `#187`'s failure-handling design. Closing the reject-notification gap is a small, low-risk default (telling a declined visitor something is strictly better than telling them nothing) rather than a new policy decision. Keeping the WhatsApp/Telegram split after re-examining it validates the original `D-054` reasoning was about approval-process friction for a growing message category, not generic preference — worth restating explicitly now that it was questioned directly, rather than left as an unexamined inheritance.

**Implications:**
- Canon: `docs/planning/decisions.md` D-060; `templates/jornada-fila-excecao-verificacao.md`; new `journey-staff-verification-review` capability (`openspec/specs/`).
- `#80`/`#86`/`#50` (Execução) implement the screen, endpoints, and RLS without reopening architecture.
- `#193` (staff daily-ops) can assume the exception queue has its own dedicated screen already, not something it needs to rebuild.
- First Passo 5 leaf to build a fully greenfield screen — no pre-architecture stub existed to correct, unlike `#185`/`#186`/`#187`.

---

## 2026-07-12 — Jornada: post-visit reengagement (#188)

### Self-service magic link over WhatsApp-mediated cancellation; new cancelled status; consent-only scope for follow-up

**Decision:** Both visit journeys (`#186`, `#187`) end at "credential delivered" — nothing existed after that: no reminder, no cancel/reschedule path, no follow-up, matching a gap `screen-map.md` had already flagged and `#141` (Execução) had left as open questions (channel, timing, consent). This leaf resolves all three sub-flows. A pre-visit reminder fires ~24h ahead, transactional per `D-054` (already names "lembretes" explicitly). Cancellation/rescheduling is **self-service via a magic link**: initially considered reusing the WhatsApp-contact-staff escape-hatch pattern already established in `#186`/`#187`/`#192` (zero new UI), but explicitly rejected in favor of a unique, high-entropy token attached to the visit and delivered on the existing confirmation and reminder messages (no new send trigger) — the visitor resolves it themselves, no back-and-forth, no staff time spent per request, however rare. Opening the link shows the visit and Cancel/Reschedule actions with no login. Cancelling sets a **new terminal `visit.status: cancelled`**, kept distinct from `declined` (which means "failed verification," a security signal that shouldn't be diluted by an unrelated operational event) — additive to the visit lifecycle, not a modification to `visit-identity-verification`, since that capability never claimed to enumerate every terminal status. Cancelling a visit that already reached `access_provisioned` calls the `tuya-access` adapter's `revoke(credential)` — named in `D-052`'s interface but never given a concrete caller until now. Rescheduling cancels the current visit and re-enters the standard `#186` booking flow pre-filled, rather than editing in place. A cancel or reschedule also queues a Telegram alert to staff (same internal-notification shape as `#192`). Post-visit follow-up messaging is classified by timing using `D-054`'s existing transactional/marketing split: same-day/+24h check-ins need no extra consent, +3 days or promotional content requires explicit opt-in, off by default — resolving `#141`'s open consent question with the framework already in place, not a new one. This leaf's scope is strictly the **consent rule**, not the nurture sequence itself (content/cadence/tooling stays Execução or v2+); no new channel is introduced — email remains deferred (`D-020`) and outside `D-054`'s WhatsApp/Telegram scope.

**Rationale:** Self-service prioritizes zero ongoing staff workload over lower build cost — proportional to avoiding a recurring manual step compounding over time versus a one-time no-auth page. Keeping `cancelled` distinct from `declined` preserves a security-relevant signal instead of diluting it with an unrelated voluntary event. Resolving follow-up consent through `D-054`'s existing framework avoids inventing a second consent policy for the same underlying transactional-vs-promotional distinction already solved once.

**Implications:**
- Canon: `docs/planning/decisions.md` D-061; `templates/jornada-pos-visita-reengajamento.md`; new `journey-post-visit-reengagement` capability (`openspec/specs/`).
- `#141`/`#81` (Execução) implement without reopening architecture.
- First real caller of `revoke()` sets the pattern any future cancellation-adjacent work should follow.
- `jornadas-plataforma.md` §3.2 and `screen-map.md` move from draft to validated for this journey.
