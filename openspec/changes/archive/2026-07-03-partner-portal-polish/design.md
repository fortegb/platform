## Context

The ForteGB partner portal lives in `docs/` and is published to `https://fortegb.github.io/platform/`. Planning canon (`modules.md`, phase maps, journeys) is maintained as markdown; HTML pages are generated for sócios-facing browsing. Session work improved navigation, UX consistency, and deploy reliability without a tracked change.

## Goals / Non-Goals

**Goals:**

- Expose module detail as a generated HTML page with stable anchors
- Improve cross-linking between mapa-fases, jornadas, and modules
- Fix misleading hover affordance on non-interactive cards
- Restore reliable GitHub Pages deploys

**Non-Goals:**

- Nuxt app or product UI changes
- CMS or dynamic content
- Automated GHA Pages deploy (deferred until GHA deploy issue is resolved)

## Decisions

1. **Generate `modules.html` from `modules.md`** — Same pipeline as other portal assets (`scripts/generate-portal-assets.mjs`) keeps a single source of truth and avoids hand-maintained HTML drift.

2. **CSS hover scoped to links** — Use `a.card` / `.card-interactive` for lift; explicit override on `div.card:not(.card-interactive)` so informational cards do not look clickable.

3. **Legacy GitHub Pages over GHA deploy** — GHA `deploy-pages` failed with platform errors; legacy publish from `/docs` on `main` succeeded immediately. Auto-trigger on GHA workflow disabled (`workflow_dispatch` only) to avoid false failures.

4. **Cache-bust portal.css** — Query param `?v=2` on jornadas page after CSS change to reduce stale CDN/browser cache during rollout.

## Risks / Trade-offs

- **[Manual legacy deploy]** → Document in workflow README; sócios see updates after push to `main` + Pages rebuild (acceptable for Phase 0).
- **[Generator drift]** → Regenerate portal assets in CI or pre-commit when markdown changes (existing `portal-build-info` workflow).
- **[build-info.json merge conflicts]** → Post-commit hook and CI both refresh; resolve keeping local HEAD hash when merging.
