# Tasks — Jornada: configuração de plataforma e papéis (#195)

## 1. Docs

- [ ] 1.1 D-067 + `DECISIONS.md` mirror — `/admin/*` → `/staff/*`
      correction (D-056), API-keys screen corrected to read-only
      reference per D-043's secrets-ownership restriction, hide-house
      deferred to Sanity's native publish workflow, maintenance mode as
      a live Supabase flag (deliberate exception to the vendor-native
      pattern), invite-based role assignment
- [ ] 1.2 `docs/planning/templates/jornada-configuracao-plataforma-papeis.md`
      — route correction detail, D-043 conflict resolution, vendor-native
      vs. live-flag reasoning
- [ ] 1.3 Update `docs/planning/jornadas-plataforma.md` §5.2 — mark
      validated, replace with corrected scope (drop reports/commission-
      void as out-of-scope gaps, not silently dropped)
- [ ] 1.4 Update `docs/planning/screen-map.md` — replace `/admin/*` rows
      with `/staff/*` equivalents; remove the hide-house row (deferred to
      Sanity, no platform route)
- [ ] 1.5 Sync `journey-platform-admin-config` spec; `openspec validate`;
      archive; merge `Closes #195`
