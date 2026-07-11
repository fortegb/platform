## Context

D-027: one Vercel project; Production = `main`; Preview = staging-class for `staging` + `feat/*`/`fix/*`. D-030/D-035: Previews share staging Supabase/Sanity. D-041: canonical names. #163 answers **where each value lives**.

## Goals / Non-Goals

**Goals:** D-042 + scoping template: surfaces, APP_ENV per surface, backend-class rules, local file rules, what not to do.

**Non-Goals:** Who may edit secrets (#164); `.env.example` contents (#165); pasting real values; enabling Vercel “Development” env as a required third surface.

## Decisions

1. **Three surfaces only (required):** (a) Vercel Production scope, (b) Vercel Preview scope, (c) local `.env` / `.env.local` (gitignored). Same D-041 names on all; values differ.
2. **Production:** `APP_ENV=prod`; Supabase `fortegb-prod`; Sanity dataset `production`; integration secrets = prod-live targets (D-037/D-039).
3. **Preview:** `APP_ENV=staging`; Supabase `fortegb-staging`; Sanity `staging`; integration secrets = safe-target. Applies to branch `staging` **and** all `feat/*`/`fix/*` Previews — one Preview env set, not per-branch secrets.
4. **Local:** `APP_ENV=local`; prefer local Supabase Docker + mocks; may override to staging-class credentials only deliberately; never prod credentials in local files by default (D-025).
5. **Vercel Development scope:** not required for ForteGB. If present, treat as optional local-parity only — do not rely on it as a fourth logical env.
6. **No secrets in git / Platform docs HTML** (D-039). Scoping doc lists *which surface*, not values.
7. **`INTEGRATION_TIER_*`:** set only on Preview/local when overriding; omit on Production (always prod-live).
8. **Public `NUXT_PUBLIC_*`:** still scoped — Preview gets staging public IDs/URLs; Production gets prod; local gets local or staging-class as chosen.

## Risks / Trade-offs

- **[Risk] All Previews share one Preview secret set** → Mitigation: accepted (D-027/D-030); feat branches must not need distinct vendor accounts.
- **[Risk] Accidental prod key in Preview** → Mitigation: must-not in template; #164 access/review; never copy-paste Production → Preview.

## Open Questions

- Whether to use `.env` vs `.env.local` naming locally — both gitignored; prefer `.env` as primary, `.env.local` as optional override (Nuxt convention) — document both allowed.
