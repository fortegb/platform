# Handoff — fortegb/platform — 2026-07-19

**Updated:** 2026-07-19T21:20:00-03:00
**Status:** active

> Advisory only. Board + STATUS.md win. Catch-up reads this until Status is
> `consumed` (no expiration). L2 catch-up sets Status to `consumed` after use.

## Context

Closed out [#197 — Design e tokenização: Descoberta do site](https://github.com/fortegb/platform/issues/197),
the first of Passo 6's 11 design leaves, and then cleaned up two pieces of board
debt it exposed. Nothing is in flight — the branch is merged and deleted, both
repos are clean and pushed. Next session starts fresh on
[#198](https://github.com/fortegb/platform/issues/198).

Session opened by recovering uncommitted work sitting in the working tree from a
session the user had deleted (git keeps working-tree state regardless): a Pass 2
tokenization sweep plus a partially-applied WhatsApp dedupe refactor.

## Control doc paths

- Decisions: `docs/planning/decisions.md` — **D-069** added (mechanism for the
  pre-`staging` window, `integrationBranchPending`). Corrected mid-session: it had been
  called "no new D-number", but the flag **amends D-045's fail-closed clause**, and
  amending an accepted decision gets recorded here. D-045 and D-046 now cross-reference
  it. Everything else this session was implementation, process or board hygiene.
- Session compass: `STATUS.md` — 2026-07-19 block added, "Próxima sessão" points at #198
- Context: `AGENTS.md` — not touched (no rule/stack/convention change)
- Planning: `docs/planning/roteiro.md` (milestone hygiene rule added),
  `phases.md`, `design-system-fluxo.md`, `deliverables.md`, `progress-focus.md`
- Handoff: `docs/planning/handoff.md` (this file)

## Current state

**Done**
- **[#197](https://github.com/fortegb/platform/issues/197) closed.** Archived as
  `2026-07-19-design-descoberta-site`, new `design-tokens` capability promoted to
  `openspec/specs/` (23/23 specs validate strict), merged to `main`, board Done,
  ROADMAP + Platform docs synced, branch deleted local and remote.
- **WhatsApp dedupe completed.** A prior pass had migrated 5 of 8 files; `contato.vue`,
  `blog/[slug].vue` and `portfolio/[slug].vue` still carried the duplicated ~700-char
  SVG path and hand-built `wa.me` URL. All 8 CTAs now go through
  `components/WhatsAppIcon.vue` + `composables/useWhatsApp.ts`.
- **Tokenization verified independently** across all 26 in-scope files — zero hex,
  zero arbitrary colour utilities, zero raw Tailwind palette colours. Confirms the
  Pass 2 report.
- **Epic [#2](https://github.com/fortegb/platform/issues/2) closed**, scope dissolved:
  [#40](https://github.com/fortegb/platform/issues/40) superseded by
  [#70](https://github.com/fortegb/platform/issues/70);
  [#41](https://github.com/fortegb/platform/issues/41) → Etapa 8 under
  [#56](https://github.com/fortegb/platform/issues/56);
  [#39 — Logo em SVG](https://github.com/fortegb/platform/issues/39) → Etapa 8 under
  [#98](https://github.com/fortegb/platform/issues/98), beside
  [#69](https://github.com/fortegb/platform/issues/69), its only real consumer.
- **Real favicon shipped** (`ff0492f`), derived from the header logo's mark on brand
  navy. The previous `favicon.ico` was 14 bytes of ASCII text.
- **Milestone `v0` hygiene — this unblocked the build gate.** See below.
- **Two bugs fixed in the `ai-skills` repo** (`18c84b3`). See below.

**Blocked / waiting on the user**
- [#39 — Logo em SVG](https://github.com/fortegb/platform/issues/39) needs the vector
  source file. It no longer blocks anything in Passo 6 — only large-format print
  ([#69](https://github.com/fortegb/platform/issues/69)). If the original file is lost,
  auto-tracing will work: analysis showed the mark is flat-colour geometry (~95% of
  opaque pixels in a single 16-level luminance band), not gradient artwork.

**Watch — two traps worth knowing**

1. **Milestone `v0 — Definição` is the G2 build gate and must hold Etapa 1–7 only.**
   Eight Etapa-8 items had drifted into it, so the entire build was gated on a vector
   logo file and designer work. Removed; `v0` went 24 → 16 open. Rule now recorded in
   `roteiro.md`. **Check this whenever an item's Etapa changes** — moving Etapa does not
   move the milestone, which is exactly how #41 drifted (mid-session, by me).
2. **`gh project item-list` defaults to 30 items.** Fixed in `ai-skills` (`18c84b3`)
   across `rbo-create-issue` (was overwriting a 211-row `ROADMAP.md` with 30 — silent
   and destructive), `rbo-close-change` (limit 200 vs 211), `rbo-create-change` (user
   could only see/pick 30 issues) and `rbo-catch-up`. Also fixed `.title` →
   `.content.title`: `.title` is the project item's cached snapshot and never follows
   issue renames. Symlink check done: `~/.claude/skills/rbo-*` point straight at the
   `ai-skills` working dir, so the fixes are already live on this machine — no
   `setup_ai` needed. Other machines still need a `dotfiles_update`.

**Also worth knowing**
- **Resolved this session:** `rbo-close-change` used to fail by design here — it saw
  `.rbo/lifecycle.yml` and demanded `origin/staging`, which does not exist yet
  (deferred to Execução bootstrap,
  [#42](https://github.com/fortegb/platform/issues/42)/[#46](https://github.com/fortegb/platform/issues/46)),
  while D-046 says Definition leaves close `feat/*` → `main` direct. The skill and the
  repo's own decision record contradicted each other. Fixed by separating *declared*
  from *provisioned*: `.rbo/lifecycle.yml` now carries `integrationBranchPending: true`,
  an explicit opt-in the skills read. `rbo-stage-change` stops with a clear "expected
  state" message; `rbo-close-change` merges `feat/*` → `main`. The flag must be
  **removed when `origin/staging` is created** (#42/#46), or the integration lifecycle
  stays a silent no-op. Deliberately explicit rather than inferred from the branch being
  absent — an accidentally deleted `staging` must still fail loudly.
  Note for context: the *behaviour* was never in doubt — **D-046 already agreed it** on
  2026-07-11 as a "gap temporário". What was missing was a mechanism; the skills only
  implemented D-045's opposing fail-closed clause, so every close needed a manual
  override. Recorded as **D-069**, amending D-045.
- GitHub's API threw intermittent 503s during the milestone work. All writes were
  retried and verified by count; nothing was left half-applied.

## Artifacts

- Archived change: `openspec/changes/archive/2026-07-19-design-descoberta-site/`
- New capability: `openspec/specs/design-tokens/` (+ `tokenization-report.md`, living doc)
- New this session: `components/WhatsAppIcon.vue`, `composables/useWhatsApp.ts`,
  `public/favicon.ico` + `favicon-16x16.png` + `favicon-32x32.png` + `apple-touch-icon.png`
- Runbook for Passo 6 sequencing: `docs/planning/design-system-fluxo.md`
- Skills repo: `~/Documents/GitHub/rbonon/ai-skills` @ `18c84b3`

## Next session

**First action:** `rbo-catch-up`, then start
[#198 — Design e tokenização: Agendar visita](https://github.com/fortegb/platform/issues/198)
with `rbo-create-change`.

Second of the 11 design leaves, no `Depends on:`, next in the screen-map order the
runbook defines. Route `/visita/agendar/[houseId]` is marked `simulado` in
`screen-map.md` and `pages/visita/agendar/[houseId].vue` already exists — so this is a
review-and-align pass like `/portfolio` was, not a build from scratch. Journey basis is
[#186](https://github.com/fortegb/platform/issues/186)/D-058. It inherits #197's token
foundation, so no setup.

Worth repeating from #197: that leaf grew far beyond its original scope because the user
drives these visually — they look, critique bluntly, and iterate. Expect several
design-check-adjust cycles per leaf, and expect the user to do the visual verification in
their own browser rather than trusting the preview pane.

## Suggested skills

- `rbo-catch-up` (session open) — will consume this handoff
- `rbo-ui-standards` — prime with existing tokens before touching UI
- `rbo-create-change` — to start #198
- `rbo-ui-tokenize` — during the leaf, for the tokenization half
