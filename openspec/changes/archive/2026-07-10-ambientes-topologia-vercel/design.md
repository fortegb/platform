## Context

Grilling A3 (2026-07-10, #149). Builds on D-025 (tiers) and D-026 (branches). Clarified: Preview is not “powered off” vs Production — both coexist; “not always-on” ≈ serverless cold start.

## Goals / Non-Goals

**Goals:** One-project Vercel topology; Production vs Preview; password gate for Previews; env-var scopes aligned with `APP_ENV`.

**Non-Goals:** Domains, creating the project now, skill changes, webhook bypass design.

## Decisions (grilled)

| Topic | Decision |
|-------|----------|
| Projects | **One** Vercel project |
| Production branch | **`main` only** |
| Preview | `staging` + `feat/*` / `fix/*` |
| Coexistence | Production and Previews run side by side; no turn-off conflict |
| Preview protection | Shared **password**; no Vercel account for sócios; one entry → whole deployment (cookie) |
| App auth | Unchanged behind the gate (Supabase etc.) |
| Env vars | Production scope = prod; Preview scope = staging-class (shared by all Previews) |

### Artifact layout at apply
D-027 + template section “Vercel” + Ambientes page + architecture/STATUS/CHANGELOG.

## Risks / Trade-offs

- **[Risk] Password protection may require Pro** → Mitigation: lock intent now; confirm plan at provision time; fallback documented if Hobby lacks it.
- **[Risk] Webhooks to Preview URLs blocked by password** → Mitigation: integrations leaf (#161) designs bypass; not A3.
- **[Trade-off] All Previews share Preview env** → Accept; matches D-026 staging-class for feat + staging.

## Open Questions

None blocking. Domains → #150. Provision when ready after A-area docs.
