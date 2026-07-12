# Tasks — Jornada: registro de cliente e proteção de comissão (#190)

## 1. Docs

- [ ] 1.1 D-063 + `DECISIONS.md` mirror — CPF-required broker registration
      (Cliente tier, not Contato), database-enforced uniqueness replacing
      the stub's check-then-insert race, `corretor_casa` gate consumption,
      role/status auth correction, idempotent re-registration, `fonte:
      portal-corretor`
- [ ] 1.2 `docs/planning/templates/jornada-registro-cliente-comissao.md` —
      data model detail, uniqueness mechanism, boundary with #185/#191
- [ ] 1.3 Update `docs/planning/jornadas-plataforma.md` §4.3 — mark
      validated, replace with corrected flow detail
- [ ] 1.4 Update `docs/planning/screen-map.md` — mark
      `/corretor/leads/novo` (or equivalent) validated
- [ ] 1.5 Sync `journey-corretor-client-registration` spec; `openspec
      validate`; archive; merge `Closes #190`
