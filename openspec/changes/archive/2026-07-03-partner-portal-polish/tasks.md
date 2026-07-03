## 1. Portal content and navigation

- [x] 1.1 Rename mapa-fases label to "Relatório de Progresso"; remove "Dois formatos de progresso" section
- [x] 1.2 Extend `generate-portal-assets.mjs` to emit `modules.html` from `modules.md`
- [x] 1.3 Add "Módulos da plataforma" card on `docs/index.html`
- [x] 1.4 Link module titles on mapa-fases to `modules.html#<slug>`

## 2. Jornadas UX

- [x] 2.1 Link pilares cards to `modules.html`
- [x] 2.2 Link role cards to in-page journey anchors
- [x] 2.3 Restrict card hover lift to `a.card` / `.card-interactive` in `portal.css`

## 3. Deploy and CI

- [x] 3.1 Fix invalid `paths` + `paths-ignore` in `portal-build-info.yml`
- [x] 3.2 Disable GHA auto-trigger on `deploy-pages.yml`; document legacy `/docs` publish
- [x] 3.3 Verify live site reflects CSS and HTML fixes after legacy rebuild

## 4. Close-out

- [x] 4.1 Human validation on live jornadas and mapa-fases pages
- [x] 4.2 OpenSpec change artifacts (retroactive)
- [x] 4.3 Archive, merge, close issue #138
