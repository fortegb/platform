# Deliverables — mapa produto ↔ plano

> Visão de negócio (confirmada) mapeada para epics. **Decisões técnicas abertas** até epic Architecture (`open-questions.md`).  
> Stack em `platform-vision.md` = **proposta**, não fechada.

---

## 1. Website — presença corporativa

| Deliverable | Epic / fase | Estado plano |
|-------------|-------------|--------------|
| Site institucional (UI, marca, valores) | P1 Public site UI + P1 Brand | ✅ |
| Portfólio de casas | P1 Public site UI | ✅ |
| Blog | P1 Public site UI | ✅ |
| Ponteiros para blog / redes (tráfego) | P1 Public site UI (sub-task) | ✅ |
| Privacidade, termos, cookies | P1 Public site UI | ✅ |
| WhatsApp / contacto | P1 Public site UI | ✅ |

---

## 2. Jornadas de utilizador (website + mobile web)

| Actor | Jornada | Define (Architecture) | Build |
|-------|---------|----------------------|-------|
| **Visitante / cliente** | Ver casas, agendar visita autoguiada | Q-003, Q-005–Q-006, journey map | P2 Visitas + Integrations |
| **Visitante** | QR na placa → identidade → acesso → lead CRM | Q-013, Q-017 | P2 Visitas + P3 Physical-digital |
| **Corretor** | Login | Q-003 | P1 Identity |
| **Corretor** | **Assinar termos/contrato** com ForteGB | **Q-016** | P2 Portal corretor |
| **Corretor** | CRUD prospectos + comissão | Q-007 | P2 Portal corretor |
| **Staff ForteGB** | Admin (TBD) | Q-003 | P3 Admin + Content ops |

---

## 3. Backend — visitas & fechadura

| Deliverable | Epic / fase | Grilling |
|-------------|-------------|----------|
| Agendamento + calendário | P2 Integrations + Visitas | Q-006 |
| Visita instantânea (QR) | P2 Visitas + P3 Physical-digital | Q-006, Q-013 |
| Verificação identidade | P2 Integrations | Q-005 |
| Senha temporária + Tuya | P2 Integrations | Q-006 (fallback) |
| **Acesso condomínio / portaria (AI?)** | TBD | **Q-017** |
| Confirmação WhatsApp | P2 Integrations | — |
| Lead automático no CRM | P2 Visitas + Integrations | Q-018 |
| Lembretes / follow-up pós-visita | P2 Visitas ([#141](https://github.com/fortegb/platform/issues/141)) + Integrations/CRM | Ships with Visitas MVP |
| Aprovação manual se ID falhar | P2 Integrations ([#80](https://github.com/fortegb/platform/issues/80)) | Visitor visit queue; Q-005 |

*Todas as escolhas de implementação ficam abertas até grilling.*

---

## 4. CRM — capturar atenção em todos os canais

| Fonte (target) | Epic | Grilling |
|----------------|------|----------|
| Formulário site | P2 Integrations | Q-018 |
| Visita agendada / instantânea | P2 Visitas | Q-018 |
| Registo corretor | P2 Portal corretor | Q-007, Q-018 |
| WhatsApp | P2 Integrations | Q-018 |
| Redes / outros | Phase 3+ | Q-018 |
| HubSpot pipeline & propriedades | Architecture + P2 | Q-007 |

---

## 5. Media kit impresso (por casa)

| Deliverable | Epic / fase | Grilling |
|-------------|-------------|----------|
| Conteúdo portfólio (web) | P1 Public site | Q-004 |
| Templates print (placa, posters) | P1 Brand + P3 Media kit | Q-011, Q-012 |
| Kit PDF/impressão por imóvel | P3 Media kit | Q-011 |
| Timeline de obra | P3 Content ops | Q-009 |

---

## 6. Mobile

| Deliverable | Epic / fase | Grilling |
|-------------|-------------|----------|
| Site usable on phone (responsive) | P1 Public site UI | Q-008, Q-019 |
| App nativo / PWA instalável | Phase 4 (default) | Q-008, Q-019 |

**Default proposto para grilling:** MVP = **web responsive**; native/PWA só se decisão explícita.

---

## 7. Infra & processo (antes de build)

| Deliverable | Epic Phase 0 |
|-------------|--------------|
| GitHub org + board | GitHub org migration |
| OpenSpec + workflow | Bootstrap board |
| Architecture & MVP fechado | Architecture epic |
| Brand assets | Brand assets upload |

---

## 8. Checklist “pronto para Phase 1 build”

- [x] GitHub org + board ([#8](https://github.com/fortegb/platform/issues/8))
- [x] OpenSpec + workflow ([#20](https://github.com/fortegb/platform/issues/20))
- [ ] Architecture & MVP fechado ([#1](https://github.com/fortegb/platform/issues/1) → [#38](https://github.com/fortegb/platform/issues/38))
- [ ] Brand assets ([#2](https://github.com/fortegb/platform/issues/2)) — paralelo, não bloqueia build
- [ ] `architecture.md` completo + [`screen-map.md`](./screen-map.md) aceite ([#32](https://github.com/fortegb/platform/issues/32))
- [ ] Q-003–Q-019 resolved ou deferred com rationale
- [x] Epics Phase 1–4 no board ([#37](https://github.com/fortegb/platform/issues/37))
- [x] `ROADMAP.md` gerado
