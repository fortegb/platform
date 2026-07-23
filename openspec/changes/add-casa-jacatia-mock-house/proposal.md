## Why

Casa 03 (Q-21, commercial name "Casa Jacatiá") is on the market now, ahead of the platform's own CMS/DB existing (Sanity, #45, gated behind Etapa 8). The real content (photos, videos, long-form description, and a feature list already split into buyer-facing highlights vs. engineering differentiators) was produced and approved in a dedicated content session (`fortegb/casa-assets` repo). The portfolio page currently has no way to render two labeled feature groups — it only supports one flat checklist — so adding this house as-is would either lose the destaque/engenharia distinction or require a template change. This change does both: adds the house and adds the missing display capability.

## What Changes

- Add Casa Jacatiá as a sixth entry in `mockHouses` (`data/mock.ts`), `status: 'disponivel'`, using the approved long-form content (Descrição + Características) from `casa-assets/casa03/conteudo-publicacao.md`.
- Commit real photos (9 arquitetônico + 27 decoração, ordered arquitetônico-first) into `public/images/`, following the existing local-file precedent already used for `floorplans`.
- Add 2 real video URLs (YouTube, Unlisted, per the closed video-hosting decision) to `videoUrls`.
- Extend the `features` field to optionally carry a `grupo` tag (`'destaque' | 'engenharia'`) per entry, and render two labeled sections in `pages/portfolio/[slug].vue` when present — **backward-compatible**: the other 5 mock houses keep plain string features and continue rendering as a single flat list, unchanged.
- Add a code comment on `mockHouses` noting it is no longer 100% fictional (Casa Jacatiá is real content behind a mock-data placeholder), per the accepted exception in issue #218.

No **BREAKING** changes — existing mock houses and their rendering are untouched.

## Capabilities

### New Capabilities
- `house-feature-display`: how a house's `features` are grouped and rendered on the portfolio detail page — a flat single-section checklist by default, or two labeled sections (buyer-facing highlights vs. engineering differentiators) when entries carry a `grupo` tag.

### Modified Capabilities
(none — no existing spec's requirements change; this only adds new display behavior alongside the existing default)

## Impact

- `data/mock.ts` — one new house entry; `features` field shape extended (backward-compatible, no changes to the other 5 entries)
- `public/images/` — new real photo assets for Casa Jacatiá
- `pages/portfolio/[slug].vue` — feature-rendering block updated to support grouped display
- Issue: [#218](https://github.com/fortegb/platform/issues/218)
- Source content: `fortegb/casa-assets` repo, `casa03/conteudo-publicacao.md` (long version), `casa03/projetos/arquitetonico` + `casa03/projetos/decoracao` (photos/videos)
