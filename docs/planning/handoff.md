# Handoff — fortegb/platform — 2026-07-20

**Updated:** 2026-07-20T16:50:00-03:00
**Status:** consumed

> Advisory only. Board + STATUS.md win. Catch-up reads this until Status is
> `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use.

## Context

Closed out [#198 — Design e tokenização: Agendar visita](https://github.com/fortegb/platform/issues/198),
the second of Passo 6's 11 design leaves. Next session starts fresh on
[#199 — Design e tokenização: Visita QR](https://github.com/fortegb/platform/issues/199).
Nothing in flight — branch merged and deleted (local + remote), tree clean, `main` pushed.

This was a long, high-yield session driven the way the user works: they review
visually, one screen at a time, critique bluntly, and each critique tends to expose
a real gap in the journey canon rather than a cosmetic tweak. #198 grew from "review
the existing page" to **3 routes / 19 states**, 5 spun-off issues, and one decision
(D-070). Expect #199 to behave the same way.

## Control doc paths

- Decisions: **`docs/planning/decisions.md`** (pt-BR canon, D-0XX) — this session added
  **D-070**. Root **`DECISIONS.md`** (English, dated) is a parallel mirror; D-070 written
  to both. The two-log double-entry is still an open hygiene question (see #198 handoff
  history / STATUS) — write new decisions to both until it's settled.
- Session compass: **`STATUS.md`** — 2026-07-20 block added, "Próxima sessão" points at #199.
- Context: **`AGENTS.md`** (`@`-imported by `CLAUDE.md`, loads every session — keep tight).
  Gained a new standing section this session: **"Como responder ao usuário"** — short
  answers to simple questions, one question at a time, no jargon/acronyms, issues always
  linked with titles, recommend don't inventory. It exists because the user said so more
  than once; honor it.
- Planning: `docs/planning/design-system-fluxo.md` (three Passo 6 scope rules added),
  `screen-map.md`, `templates/cms-content-model.md` (`na-planta` status).
- Handoff: `docs/planning/handoff.md` (this file).

## Current state

**Done this session — [#198](https://github.com/fortegb/platform/issues/198) closed**
- Archived `2026-07-20-design-agendar-visita`; spec deltas promoted (`design-tokens` +5,
  `journey-scheduled-visit` +7). Merged to `main`, board Done, ROADMAP + Platform docs synced.
- **One stepped page → 3 routes:** `/visita/agendar/[houseId]` (form),
  `.../verificacao` (handoff), `/visita/[token]` (result, 7 variants from stored status,
  never from the URL). New components `HouseVisitHeader.vue`, `VisitStepIndicator.vue`;
  new composables `useHouseStatus.ts`, `useVisitBooking.ts`.
- **Visit matrix by house status:** self-guided only on `disponivel`; guided (future, #213)
  on `disponivel`+`em-construcao`; no visit otherwise. New status `na-planta` ("Na planta").
  `HouseCard` CTA narrowed from "everything except vendido" to `disponivel` only — shared
  with `/portfolio`, verify there too.
- **CPF field** added to the form (mod-11 validation) — D-020 always required it at visit time.
- **D-070** — identity verification becomes an external service (Didit free tier, 500/mo)
  behind an adapter; take-and-delete retention; own branding only at launch. **Amends D-053**
  ("sem KYC SaaS"). Confirmed by a spike before build (#217).

**Traps worth knowing**
1. **Nuxt routing:** `[houseId].vue` beside a `[houseId]/` folder silently becomes a parent
   layout — the child route renders the parent's template. Fixed by moving the form to
   `[houseId]/index.vue`. This will bite again on any journey with a nested dynamic route.
2. **Tokenization audit globbing:** bracket route paths (`[houseId]`, `[token]`) are shell
   glob character classes — an unquoted grep list expands to nothing and reads as "clean".
   Always `set -f` + quoted array + a per-file existence check, and run **without**
   `2>/dev/null`. Every remaining leaf has dynamic segments.
3. **`pages:sync` after an interrupted build:** a killed Nuxt build leaves a corrupt
   `.nuxt/dist/server/client.manifest.mjs`, and the next `pages:sync` fails with a
   RollupError. Fix: `rm -rf .nuxt` and re-run. It's a ~2–3 min full static build; let it
   finish (don't poll it to death — wait for the task notification).

**5 issues spun off from #198** (all Etapa 8, Module tours, on the board)
- [#213 — Visita guiada](https://github.com/fortegb/platform/issues/213): accompanied tour;
  brings its own availability source (Google Calendar, v2). The fixed 09–17 slot grid was
  never a decision.
- [#214 — Janela de acesso e espaçamento](https://github.com/fortegb/platform/issues/214):
  access-code validity window + slot spacing derived from it (not from visit length); the
  abandoned-slot release rule (1h nudge, release at 24h or 2h-before) is noted here.
- [#215 — Staff agenda visita](https://github.com/fortegb/platform/issues/215): staff booking
  a visit for someone who only messaged WhatsApp — not covered by D-065.
- [#216 — Mídia por WhatsApp (LGPD)](https://github.com/fortegb/platform/issues/216): document
  handling on the corporate phone; gallery auto-save + cloud backup are the real leaks.
- [#217 — Spike do serviço de verificação](https://github.com/fortegb/platform/issues/217):
  confirm Didit hands-on before build (BR docs recognized, delete endpoint, in-app browser).

## Artifacts

- Archived change: `openspec/changes/archive/2026-07-20-design-agendar-visita/`
- Specs extended: `openspec/specs/design-tokens/`, `openspec/specs/journey-scheduled-visit/`
- Tokenization report: `openspec/specs/design-tokens/tokenization-report.md` (Pass 3 appended)
- Decision: **D-070** in `docs/planning/decisions.md` and root `DECISIONS.md`

## Next session

**First action:** `rbo-catch-up`, then start
[#199 — Design e tokenização: Visita QR](https://github.com/fortegb/platform/issues/199)
with `rbo-create-change`.

Third of the 11 design leaves. Route `/visita/qr/[code]`, journey basis
[#187](https://github.com/fortegb/platform/issues/187)/**D-059**. It **inherits #198's
patterns directly** — the verification handoff and the token-keyed result screen are the
same shapes, and `useVisitBooking`/`useHouseStatus`/`HouseVisitHeader`/`VisitStepIndicator`
are all reusable. **D-070 applies here too** (external verification), so no separate identity
decision.

The real difference from #198, per D-059: the instant/QR flow has **no time slack** — the
visitor is at the door. So (a) verification failure refuses **immediately** with a WhatsApp
escape hatch, not the async "confirmaremos antes da visita" of #198; and (b) the 12-month
reuse shortcut requires **phone possession** here — a WhatsApp OTP (`method: phone-otp`)
before `provisionAccess`, capped at 24 months from `last_client_match_at`. Those are result/
verification states this leaf must design that #198 did not have. QR/placa physical artifact
(#98/#100) is assumed to exist — not this leaf.

## Suggested skills

- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-ui-standards` — prime tokens before touching UI
- `rbo-create-change` — to start #199
