# Tasks — Jornada: descoberta e navegação do site (#185)

## 1. Docs

- [x] 1.1 D-057 + `DECISIONS.md` mirror — lead capture on both WhatsApp CTA
      (fire-and-forget beacon, `fonte: cta-whatsapp`) and contact form
      (`fonte: form-site`), reusing `POST /api/contact`; `wa.me` links exempt
      from `messaging-channel-policy` queuing
- [x] 1.2 `docs/planning/templates/jornada-descoberta-site.md` — lead-capture
      contract detail (beacon payload shape, `fonte` values, fire-and-forget
      rationale)
- [x] 1.3 Update `docs/planning/jornadas-plataforma.md` §3.1 — mark
      validated (remove implicit rascunho status), add the lead-capture
      contract note
- [x] 1.4 Update `docs/planning/screen-map.md` — clear the
      `RASCUNHO — re-validar no passo 5` flag for this journey's rows (Home,
      Portfólio lista/detalhe, Blog, Contato)
- [x] 1.5 Sync `journey-site-discovery` spec; `openspec validate`; archive;
      merge `Closes #185`
