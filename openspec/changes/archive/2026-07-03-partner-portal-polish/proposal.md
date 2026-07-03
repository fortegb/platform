## Why

Partner portal work (modules page, mapa/jornadas UX, card hover fix, GitHub Pages deploy) was delivered on `main` without issue/change tracking. This retroactive change documents what was built and closes the audit trail under Epic #4 (Seed docs/planning).

## What Changes

- Rename mapa-fases label "Relatórios de Issues" → **Relatório de Progresso**; remove obsolete "Dois formatos de progresso" section
- Generate `docs/planning/modules.html` from `modules.md` via portal asset generator; add index card and mapa drill-down links
- Jornadas: pilares link to modules; role cards link to in-page journey anchors; only linked cards show hover lift
- `portal.css`: hover lift restricted to `a.card` and `.card-interactive`
- GitHub Pages: revert to legacy `/docs` publish; disable failing GHA auto-deploy workflow

## Capabilities

### New Capabilities

- `partner-portal`: Static partner-facing planning portal served from `docs/` on GitHub Pages — navigation, generated pages, card UX, and publish pipeline.

### Modified Capabilities

_(none — no prior OpenSpec specs exist)_

## Impact

- `docs/planning/*.html`, `docs/index.html`, `docs/assets/portal.css`
- `scripts/generate-portal-assets.mjs`
- `.github/workflows/deploy-pages.yml`, `.github/workflows/portal-build-info.yml`
- GitHub Pages configuration (legacy source: `main` / `/docs`)
