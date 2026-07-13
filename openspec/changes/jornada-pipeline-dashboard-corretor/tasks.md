# Tasks — Jornada: pipeline e dashboard do corretor (#191)

## 1. Docs

- [x] 1.1 D-064 + `DECISIONS.md` mirror — `registro.status` defined as a
      deal-focused 4-value enum (not the stub's 7-stage list), visit
      progress derived via join (not duplicated), `contacted` moved to
      `historico`, per-corretor RLS scoping, auth correction
- [x] 1.2 `docs/planning/templates/jornada-pipeline-dashboard-corretor.md`
      — enum definition, join-vs-duplicate rationale, HubSpot boundary
- [x] 1.3 Update `docs/planning/jornadas-plataforma.md` §4.4 — mark
      validated, replace with corrected flow/model detail
- [x] 1.4 Update `docs/planning/screen-map.md` — mark
      `/corretor/dashboard`, `/corretor/clientes` validated
- [ ] 1.5 Sync `journey-corretor-pipeline` spec; `openspec validate`;
      archive; merge `Closes #191`
