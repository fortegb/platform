# Tasks — Jornada: fila de exceção de verificação de identidade (#192)

## 1. Docs

- [ ] 1.1 D-060 + `DECISIONS.md` mirror — queue prioritization by flow type,
      reject-notifies-visitor (closes a gap D-053 left open, not a
      reopening — D-053's approve path is unchanged), approval reuses the
      existing `provisionAccess` call site, `/staff/*` RBAC consumption
- [ ] 1.2 `docs/planning/templates/jornada-fila-excecao-verificacao.md` —
      queue contract detail (ordering rule, approve/reject outcomes,
      boundary with #193/#194/#195)
- [ ] 1.3 Update `docs/planning/jornadas-plataforma.md` — add a staff-
      journey section for this screen (none existed before; the doc's
      jornadas were visitor/corretor-only until this leaf)
- [ ] 1.4 Update `docs/planning/screen-map.md` — clear rascunho/novo status
      for `Fila exceção identidade (visita)` (`/staff/visitas/excecoes`)
- [ ] 1.5 Sync `journey-staff-verification-review` spec; `openspec
      validate`; archive; merge `Closes #192`
