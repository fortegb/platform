## Why

D-016/D-034/D-035 placed content in Sanity with datasets, but the **document types and CMS↔Supabase field split** were still open. Issue #157 locks the content model after grilling so Studio/#45 and portfolio wiring (#63) share one contract.

## What Changes

Document (definition only — no Sanity schema TS files):

1. Types: `house`, `blogPost`, `constructionTimeline`, `mediaKit` (timeline/media stub depth for v3).
2. House field split: marketing in Sanity + `houseId`; status/lock/QR in Supabase; Nuxt merge.
3. Video = URL embed fields; locale = pt-BR only.
4. D-036 + `templates/cms-content-model.md` + Ambientes/architecture pointers.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: CMS document types and house join/split rules.

## Impact

- Docs only. Schema implementation → Studio build (#45).
