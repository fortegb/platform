## Context

Epic #146 defines full-solution infra before build. A1 (#147) was **grilled** (2026-07-10): three environments, promotion rule, data/integration postures, `APP_ENV`, local isolation, private staging, hotfix preview, and deliverable = **spec + Platform docs page** (not delivery).

Constraints (D-015): solo dev, free-first, zero-ops. Hosting stance (D-017) may be re-checked later; **environment names stay valid either way**.

## Goals / Non-Goals

**Goals:**
- Shared vocabulary: `local` · `staging` · `prod`.
- Per-environment purpose, data posture, integration posture, promotion + hotfix preview.
- Canon decision + template + **sócios-facing Platform docs page**.

**Non-Goals:**
- Provisioning cloud, domains, CI, or seed data packs.
- Branch→environment map, Vercel shape, DNS (next leaves).
- Re-opening serverless vs persistent.

## Decisions (grilled)

### Exactly three logical environments
Preview/ephemeral deploys are a **delivery mechanism**, not a fourth name. Mapping comes later.

### Purpose and rules

| Environment | Purpose | Data | Integrations | Who |
|-------------|---------|------|--------------|-----|
| **local** | Build & debug on the laptop | Disposable / seed; **no real customer PII** | **Mock** / stubs; never live lock or paid WhatsApp to real numbers | Developers |
| **staging** | Shared pre-prod validation before promotion | Non-prod seed/anonymized; **no prod PII copy by default** | **Safe-target** only | Dev + optional sócio UAT (private, not public beta) |
| **prod** | Live customer-facing system | Real data under LGPD | **Prod-live** | End users, corretores, staff |

**Local runtime:** Nuxt/Node (`npm run dev`), not “running Vercel.” Local Supabase via Docker/OrbStack planned in later leaves. Local isolated by default; pointing at staging only as conscious override; never at prod.

**Promotion:** no local→prod as normal path; staging (or staging-class backends) required before prod. **Hotfix overrides** are previewed in architecture as exceptional, explicit, and logged; full procedure in the later promotion/release leaf.

**Identity:** `APP_ENV` ∈ `{local, staging, prod}`. `NODE_ENV` alone does not distinguish staging from prod.

**Seed contents:** policy only here; pack design in the later seed/LGPD leaf.

### Artifact layout at apply
1. Append **D-025** + root `DECISIONS.md` entry.
2. Point `architecture.md` at the three environments.
3. Create `docs/planning/templates/environments.md`.
4. Create **`docs/planning/ambientes.html`** (dedicated Platform docs page, pt-BR) + index card + link from `arquitetura-decisoes.html`.
5. Refresh `STATUS.md` next pointer to the next environments leaf (branch mapping).

## Risks / Trade-offs

- **Staging ≈ prod drift** → later leaves require mirroring within free/cheap limits.
- **Preview confused with a fourth environment** → docs state it is delivery, not a name.
- **No prod PII in staging** may make some UAT harder → accept; explicit exceptions later with seed leaf.
- **Hotfix without full procedure yet** → named in architecture so the escape hatch is visible; procedure not invented here.

## Open Questions

None blocking A1. Deferred: branch map, Vercel topology, domains, seed pack, concrete safe-targets, hotfix runbook.
