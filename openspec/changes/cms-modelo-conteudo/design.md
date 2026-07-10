## Context

Grilling #157 locked four document types with v1/v3 depth, house CMS/DB split, video URLs, pt-BR only, docs-only DoD.

## Goals / Non-Goals

**Goals:** D-036 + content-model template.

**Non-Goals:** Sanity Studio schema code; seeding CMS fixtures; media-kit UI.

## Decisions

1. Four types; stub timeline/mediaKit.
2. Join via shared UUID `houseId`.
3. Status never in CMS as source of truth.

## Risks

- **[Risk] Duplicate title/slug in both stores** → Mitigation: slug primarily CMS; Supabase may keep slug for routing convenience until cutover — document as transitional in template.
