## Context

Grilling #155 locked Sanity for free-tier longevity, 2 datasets (staging/prod), schema-as-code fit, and avoiding Contentful’s paid cliff. Cleanup of Contentful mentions/code is part of DoD.

## Goals / Non-Goals

**Goals:** D-034; living docs say Sanity; no Contentful package/client; `useCms` stub; retitle #45/#63.

**Non-Goals:** Provision Sanity cloud; Studio; schemas; wire portfolio/blog to live CMS.

## Decisions

1. Vendor = Sanity.
2. Service-layer / `useCms` keeps future swap possible but Contentful is not installed.
3. Historical archive OpenSpec text may still say Contentful/Sanity — leave archives alone.

## Risks

- **[Risk] Broken imports** → Mitigation: `useContentful` unused in pages; grep before delete.
- **[Risk] README/SETUP drift** → Mitigation: update in same change.
