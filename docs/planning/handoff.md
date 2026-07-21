# Handoff — fortegb/platform — 2026-07-20

**Updated:** 2026-07-20T22:05:00-03:00
**Status:** active

> Advisory only. Board + STATUS.md win. Catch-up reads this until Status is
> `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use.

## Context

Closed out [#199 — Design e tokenização: Visita QR](https://github.com/fortegb/platform/issues/199),
the **third** of Passo 6's 11 design leaves. Next session starts fresh on
[#200 — Design e tokenização: Gerenciar visita](https://github.com/fortegb/platform/issues/200).
Nothing in flight — branch merged and deleted (local + remote), tree clean, `main` pushed.

Two things happened this session beyond the leaf itself, both worth knowing:
1. #199 behaved like #198 — a pre-architecture stub grew into 3 routes under a design
   walkthrough, but this time with **no new decision and no derived issues** (it inherited
   D-059/D-070 cleanly). The mobile pass (below) was the only user-driven expansion.
2. A **Node-version rabbit hole** surfaced during close-out and is now resolved (below). This
   is the part most likely to bite the next session if not understood.

## Control doc paths

- Decisions: **`docs/planning/decisions.md`** (pt-BR canon, D-0XX). No new D-number this
  session. Root **`DECISIONS.md`** (English mirror) also unchanged.
- Session compass: **`STATUS.md`** — 2026-07-20 block updated; "PRÓXIMO" points at #200.
- Context: **`AGENTS.md`** (`@`-imported by `CLAUDE.md`, loads every session). Unchanged this
  session — the standing "Como responder ao usuário" section still applies (short answers,
  one question at a time, no jargon, issues always linked with titles).
- Planning: `docs/planning/design-system-fluxo.md` (Passo 6 runbook + scope rules),
  `screen-map.md` (QR split into 3 rows).
- Handoff: `docs/planning/handoff.md` (this file).

## Current state

**Done this session — [#199](https://github.com/fortegb/platform/issues/199) closed**
- Archived `2026-07-21-design-visita-qr`; spec delta promoted (`journey-instant-visit` +8,
  and its `TBD` Purpose written). Merged to `main`, board Done, ROADMAP + Platform docs synced.
- **One stub → 3 routes** under `/visita/qr/[code]`: `index` (identify — WhatsApp + CPF),
  `verificacao` (full ID **or** WhatsApp OTP for returning clients), `resultado` (variant from
  stored status, never the URL). New composable `useQrVisit.ts` (re-exports masks/CPF from
  `useVisitBooking`). Reuses `HouseVisitHeader` / `VisitStepIndicator` / `IdentityVerification`
  / `useHouseStatus`.
- **The three states D-059 makes unique to the instant flow** (no time slack — at the door):
  phone-OTP reuse gate (`identity_verified_at` alone insufficient; 24-month
  `last_client_match_at` ceiling); **immediate decline with WhatsApp escape hatch** (NOT #198's
  async "confirmaremos" acknowledgement — that state deliberately does not exist here); visible
  provisioning failure (no code, staff-alerted).
- **Mobile pass** (user-driven): the flow is scanned one-handed at the door, so primary CTAs go
  full-width + taller on mobile, reverting to compact auto-width on `sm+` (#198 parity). All
  states verified at 375px — no overflow.
- Tokenization Pass 4 clean. `screen-map.md` split into 3 QR rows.

**Node 24 LTS pin — resolved (implements D-049, refs [#170](https://github.com/fortegb/platform/issues/170))**
- `pages:sync` failed twice at close-out: the shell's default **Node 26.5.0** (Current, non-LTS)
  breaks `nuxt generate` with `vite-node: NUXT_VITE_NODE_OPTIONS.socketPath is not defined`.
  `nuxt build` works — only the static docs export (`nuxt generate`) breaks. Homebrew's plain
  `node` formula tracks latest, so any `brew upgrade` silently drifts onto bleeding-edge Node.
- Fix committed (`98d29b1`): **`.nvmrc` → `24`** + **`engines.node` → `24.x`** in `package.json`.
  Verified clean on Node 24.18.0 (Krypton): `npm install`, `nuxt build`, `pages:sync` all pass.
  Switcher is **fnm** (installed via brew); user added `eval "$(fnm env --use-on-cd)"` to
  `~/.zshrc` and confirmed auto-switch works.
- **Trap for next agent:** if a doc/site build fails with a `socketPath`/vite-node error, check
  `node -v` FIRST — it must be `v24.x`. If the shell integration didn't load, `cd` out and back
  in, or run `fnm use`. Do **not** re-diagnose as a corrupt `.nuxt` (that's a *different*
  RollupError trap, fixed by `rm -rf .nuxt`). Both can look similar; the tell is `socketPath` =
  wrong Node, `RollupError`/`client.manifest.mjs` = stale `.nuxt`.
- `node@22` was also installed earlier (keg-only) as a first workaround before settling on 24 —
  harmless, can be `brew uninstall node@22` if tidying.

## Artifacts

- Archived change: `openspec/changes/archive/2026-07-21-design-visita-qr/`
- Spec extended: `openspec/specs/journey-instant-visit/` (+8 requirements, Purpose written)
- Tokenization report: `openspec/specs/design-tokens/tokenization-report.md` (Pass 4 appended)
- Node pin: `.nvmrc`, `package.json` `engines` — commit `98d29b1`
- #170 comments carry the concrete Node-26 symptom + the pin status.

## Next session

**First action:** `rbo-catch-up`, then start
[#200 — Design e tokenização: Gerenciar visita](https://github.com/fortegb/platform/issues/200)
with `rbo-create-change`.

Fourth of the 11 design leaves. Routes `/visita/gerenciar/[token]` + aviso condomínio. Journey
basis [#188](https://github.com/fortegb/platform/issues/188)/**D-061** (greenfield:
cancel/reschedule self-service via magic link; new status `cancelled`; `revoke()` gets its first
real caller). Per scope rule 2, `/visita/gerenciar/[token]` is its **own** screen — distinct from
#198's `/visita/[token]` even though both are token-keyed and show the same visit. Inherits the
#197 token foundation and the #198/#199 screen patterns. `v0 — Definição` (gate G2): 15 open.

## Suggested skills

- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-ui-standards` — prime tokens before touching UI
- `rbo-create-change` — to start #200
