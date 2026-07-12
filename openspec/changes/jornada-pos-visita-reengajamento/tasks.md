# Tasks — Jornada: pós-visita e reengajamento (#188)

## 1. Docs

- [x] 1.1 D-061 + `DECISIONS.md` mirror — magic-link self-service
      cancel/reschedule (chosen over WhatsApp-mediated during exploration),
      new `cancelled` terminal status distinct from `declined` (additive,
      not a modification to `visit-identity-verification`), first concrete
      caller of `tuya-access`'s `revoke`, reschedule-as-cancel-plus-rebook,
      post-visit follow-up transactional/marketing split resolving #141's
      open consent question
- [x] 1.2 `docs/planning/templates/jornada-pos-visita-reengajamento.md` —
      link mechanism detail, status lifecycle addition, consent
      classification table
- [x] 1.3 Update `docs/planning/jornadas-plataforma.md` §3.2 — replace
      step 10 ("follow-up automático ou manual") with the validated
      reminder/cancel/reschedule/follow-up detail; note the new terminal
      status
- [x] 1.4 Update `docs/planning/screen-map.md` — add the new
      `/visita/gerenciar/[token]` route; update the "Lacunas de jornada"
      table's "Follow-up pós-visita" row to point at this leaf instead of
      only #141
- [ ] 1.5 Sync `journey-post-visit-reengagement` spec; `openspec validate`;
      archive; merge `Closes #188`
