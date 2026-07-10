## Why

D-022 called for a Supabase project per environment; A1–A4 locked tiers, branches, Vercel, and domains. Without an explicit project map, free-tier limits (2 active projects), Preview sharing, and PII isolation stay ambiguous. Issue #151 locks that contract after grilling.

## What Changes

Document (definition only — no Supabase project creation in this change):

1. **2 cloud projects:** `fortegb-staging` + `fortegb-prod` (fits Free: 2 active).
2. **Local:** Supabase via Docker/OrbStack (CLI) — not a third cloud project.
3. **All Vercel Previews** share the **staging** project (D-027 Preview scope).
4. **No prod PII** in staging/local — seed/fake only.
5. **One schema-as-code** applied to all three targets; data/secrets differ.
6. **Auth redirect allowlists** per project (prod hosts / staging + vercel.app / localhost).
7. **Secrets:** Vercel Production → prod keys; Preview → staging keys; local → `.env`/CLI. Exact var names → later config leaf.
8. D-030 + template + Ambientes page + STATUS/CHANGELOG/progress-focus.

**Out of scope:** creating projects, applying migrations, wiring Vercel secrets, seed pack contents (#154).

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: add Supabase project map, isolation, schema, auth redirects, secret scopes.

## Impact

- **Docs:** `decisions.md` D-030, template, `ambientes.html`, `architecture.md` pointer, `STATUS.md`, `DECISIONS.md`, `CHANGELOG.md`, `progress-focus.md`.
- **No** Supabase dashboard or Vercel secret clicks in this change.
