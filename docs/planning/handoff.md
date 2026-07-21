# Handoff — fortegb/platform — 2026-07-21

**Updated:** 2026-07-21T17:30:00-03:00
**Status:** active

> Advisory only. Board + STATUS.md win. Catch-up reads this until Status is
> `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use.

## Context

Closed out [#201 — Design e tokenização: Onboarding do corretor](https://github.com/fortegb/platform/issues/201),
the **fifth** of Passo 6's 11 design leaves and the **first of the Corretor
section** (persona switches from visitante/cliente to corretor). Next session
starts fresh on [#202 — Design e tokenização: Registro de cliente](https://github.com/fortegb/platform/issues/202).
Nothing in flight — branch merged and deleted (local; no remote copy existed),
tree clean, `main` pushed.

**Tool switch this handoff:** this session ran in Claude Code; the next one
continues in **Cursor**. `AGENTS.md` is the tool-agnostic project context file
both should read — Cursor has no global rules file for the machine-wide
`~/.claude/CLAUDE.md` conventions, so if `rbo-*` slash-command equivalents
aren't wired up there, drive the same lifecycle manually: `STATUS.md`
"Próxima sessão" + the board are the source of truth regardless of which tool
is issuing the commands.

## Control doc paths

- Decisions: **`docs/planning/decisions.md`** (pt-BR canon, D-0XX). New this
  session: **D-072**. Root **`DECISIONS.md`** (English mirror) updated in sync.
- Session compass: **`STATUS.md`** — 2026-07-21 block added; "PRÓXIMO" now
  points at #202; "Esta sessão" + "Próxima sessão" sections refreshed (the
  prior "Próxima sessão" note was stale, still pointing at #199 even though
  #199/#200/#201 had all since closed — fixed this session).
- Context: **`AGENTS.md`** (`@`-imported by `CLAUDE.md`, loads every session).
  Unchanged this session — its "Estágio atual" section stays high-level
  ("Passo atual: 6 Design system"), leaf-by-leaf detail lives in `STATUS.md`.
- Planning: `docs/planning/design-system-fluxo.md` (Passo 6 runbook + scope
  rules, unchanged).
- Handoff: `docs/planning/handoff.md` (this file).

## Current state

**Done this session — [#201](https://github.com/fortegb/platform/issues/201) closed**
- Prior session's work (self-registration pivot, done during a visual walkthrough
  with the user) was already complete in the working tree but uncommitted when
  this session started — committed first, then closed via `rbo-close-change`.
- Onboarding went from a card-based simulation to **real self-registration**:
  one form collects account (e-mail + password) and profile (nome, WhatsApp,
  CPF, CRECI opcional, termos) together. Status and contract pages went from
  cards to real routes. New public page `pages/corretor/index.vue`
  (partner-program hero, how-it-works, CTAs — commercial mechanics kept off
  the public page). `/login` trimmed to sign-in only (unknown e-mail → points
  to `/corretor`). `AppHeader.vue` gained a "Corretores" nav entry.
- **D-072** (new): corretor account-status notifications (approval **and**
  rejection) go out by **e-mail and WhatsApp**, uniformly — amends D-062
  (WhatsApp-only, rejection-only) and narrows D-020's deferred e-mail channel
  to this one notification class. Outside D-054's scope (WhatsApp/Telegram
  policy), additive to it.
- Archived `openspec/changes/design-onboarding-corretor` →
  `openspec/changes/archive/2026-07-21-design-onboarding-corretor/`;
  `journey-corretor-onboarding` spec +7 requirements.
- Merged `feat/design-onboarding-corretor` → `main` (`integrationBranchPending`
  still `true`, so default mode per D-046 — no `origin/staging` yet). Board
  Done, `ROADMAP.md` + Platform docs (`npm run pages:sync`) synced. Local
  branch deleted (no remote copy existed).

**Session-open recovery note (unrelated to #201 itself)**
- The Claude Code session that had been doing this work was accidentally
  *archived* (not deleted) from the app's session list mid-flow. Recovered by
  finding it under "Archived" (`RBO catch-up`, same repo/branch, last activity
  matching the on-disk transcript) — nothing was lost. Not a repo concern, just
  context for why this handoff exists after what looked like an interruption.

## Artifacts

- Archived change: `openspec/changes/archive/2026-07-21-design-onboarding-corretor/`
- Spec extended: `openspec/specs/journey-corretor-onboarding/` (+7 requirements)
- Tokenization report: `openspec/specs/design-tokens/tokenization-report.md` (Pass 6 appended)
- New files: `pages/corretor/index.vue`, `public/corretor-hero.jpg`
- CHANGELOG entry: `CHANGELOG.md`, 2026-07-21, "Onboarding do corretor: autocadastro + D-072"

## Next session

**First action:** `rbo-catch-up` (or, in Cursor without the skill wired up,
manually re-read `STATUS.md` + the board), then start
[#202 — Design e tokenização: Registro de cliente](https://github.com/fortegb/platform/issues/202)
with `rbo-create-change`.

Sixth of the 11 design leaves, second of the Corretor section, no
`Depends on:`. Journey basis [#190](https://github.com/fortegb/platform/issues/190)/**D-063**
(race-condition fix via DB uniqueness constraint on commission protection;
CPF mandatory at the `Cliente` level, not `Contato`). `v0 — Definição`
(gate G2): 12 open.

## Suggested skills

- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-ui-standards` — prime tokens before touching UI
- `rbo-create-change` — to start #202
