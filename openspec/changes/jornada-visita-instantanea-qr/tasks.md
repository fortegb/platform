# Tasks — Jornada: visita instantânea via QR (#187)

## 1. Docs

- [ ] 1.1 D-059 + `DECISIONS.md` mirror — same D-052/D-053 corrections as
      #186 (three-entity model, gated `provisionAccess`, no-silent-success,
      QStash); D-053's already-decided immediate-decline/no-sync-wait rule
      implemented for the first time; new phone-otp reuse gate for this
      flow only; **explicit reopening of D-053** — dual-timestamp
      (`last_client_match_at` + `identity_verified_at`) bounded-refresh
      mechanism, 24-month ceiling
- [ ] 1.2 `docs/planning/templates/jornada-visita-instantanea-qr.md` —
      journey contract detail (OTP flow, ceiling mechanism, boundary with
      #186/#192/#140)
- [ ] 1.3 Update `docs/planning/jornadas-plataforma.md` §3.3 — mark
      validated, replace the flat step table with the corrected flow
      (immediate decline, OTP reuse gate)
- [ ] 1.4 Update `docs/planning/screen-map.md` — clear the rascunho status
      for the `Visita QR (placa)` row
- [ ] 1.5 Sync `journey-instant-visit` (new) and `visit-identity-
      verification` (modified) specs; `openspec validate`; archive; merge
      `Closes #187`
