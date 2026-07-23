## Context

`data/mock.ts` today holds 6 fully fictional houses, all photos/gallery images hosted externally (Unsplash URLs), one `floorplans` entry already committed as a local file (`public/images/floorplans/vila-verde-planta.png`), and `features` as a flat `string[]` rendered as one checklist in `pages/portfolio/[slug].vue`. The Sanity CMS this data model is meant to eventually mirror (`docs/planning/templates/cms-content-model.md`, D-036) was already amended to support `features` as `{ text, grupo }[]` (`grupo: 'destaque' | 'engenharia'`) during the Casa Jacatiá content session — this change brings the mock/app layer in line with that documented shape, for one real house.

## Goals / Non-Goals

**Goals:**
- Show Casa Jacatiá on the live mock portfolio with its real, approved content.
- Support two labeled feature groups without breaking the other 5 houses' single-list rendering.
- Follow existing precedents (local image files, YouTube for video) rather than inventing new hosting mechanisms.

**Non-Goals:**
- Building the real CMS (Sanity) or Supabase `status` model — this stays within the existing mock-data pattern.
- Migrating the other 5 houses' `features` to the grouped shape.
- Full video-orientation fix (source videos are portrait/Shorts-format) — accepted as-is per user decision earlier in this change's originating conversation.

## Decisions

- **Photos: commit locally to `public/images/`, not an external host.** The `floorplans` field already established this precedent for real (non-stock) images, and Casa Jacatiá's real photos are small enough in aggregate (~20MB for all 36) to follow it without meaningfully bloating the repo. Alternative considered: uploading to an external image host — rejected as unnecessary infrastructure for a single interim house before Sanity exists.
- **Videos: YouTube, Unlisted, per D-016 (closed).** Not new: `videoUrls` already requires an external URL, never a hosted file. Verified both URLs play correctly and are Unlisted (accessible without a Google account login). Portrait/Shorts orientation is a known, accepted cosmetic trade-off — not fixed in this change.
- **`features` shape: additive, not a migration.** `features` becomes `(string | { text: string; grupo: 'destaque' | 'engenharia' })[]`. The rendering component checks each entry's shape: a plain string renders in today's single flat list (all 5 existing houses, unchanged); an object with `grupo` renders under a "Destaques" or "Diferenciais de Engenharia" heading. This avoids touching the other 5 houses' data at all. Alternative considered: migrating all houses to the object shape now — rejected as unnecessary scope for this change; can happen later if/when it matters.
- **Gallery ordering/categories:** arquitetônico photos first (categories: Fachada, Piscina, etc.), decoração photos after (categories: Sala de Estar, Cozinha, Suíte, etc.) — reusing the room-based category vocabulary already documented in `casa-assets/casa03/CONTEXTO.md`, no new category taxonomy introduced.
- **`mockHouses` stays as one array, with a clarifying comment.** Not splitting into "real" vs. "mock" arrays — that's a larger refactor out of scope here. A code comment flags that this one entry is real content behind mock-data plumbing, so it isn't later assumed disposable.

## Risks / Trade-offs

- **[Risk]** Videos are portrait (Shorts format), will appear pillarboxed in a landscape video player → **Mitigation:** accepted trade-off per explicit user decision; can be replaced with landscape re-exports later without any data-shape change.
- **[Risk]** This is Etapa 8 (Execução) work landing while the roteiro's active step is Passo 6 (Design system), ahead of the G2 gate → **Mitigation:** explicitly logged as a deliberate, one-off exception in issue #218, not a precedent for skipping the gate generally.
- **[Risk]** Real commercial data (price, address, construction cost basis) now sits inside a data file whose name/array (`mockHouses`) implies "fake" → **Mitigation:** clarifying code comment; no rename/refactor of the array itself in this change.

## Migration Plan

No data migration needed — purely additive. Rollback is a single revert of this branch's commits before merge (nothing else depends on the new house entry or the `grupo` field yet).

## Open Questions

None outstanding — all flagged trade-offs above were already discussed and accepted by the user during this change's scoping conversation.
