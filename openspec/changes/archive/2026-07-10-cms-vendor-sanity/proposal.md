## Why

D-016 left the CMS vendor open (Contentful in package.json vs Sanity free-tier). ForteGB is free-first (D-015); grilling #155 locked **Sanity**. Stale Contentful docs/code would keep pointing the team at the wrong stack.

## What Changes

1. **D-034:** CMS vendor = **Sanity** (not Contentful).
2. Update living docs (decisions D-016 note, AGENTS, architecture, vision, Ambientes/arquitetura pages, SETUP, README, phases, STATUS).
3. **Code hygiene:** remove `contentful` dependency; drop Contentful runtimeConfig; replace `useContentful` with mock-oriented `useCms` (Sanity wiring later).
4. Retitle board issues **#45** / **#63** to Sanity.
5. Template pointer for CMS vendor; datasets/model → #156/#157.

**Out:** Sanity Studio scaffold, live API, content schemas (later leaves).

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: CMS vendor is Sanity; Contentful is not the chosen stack.

## Impact

- Docs + `package.json` + `nuxt.config.ts` + composable rename.
- Board titles #45/#63.
- No live Sanity project created in this change.
