# Deliverables — mapa produto ↔ plano

> Visão de negócio (confirmada) mapeada para epics. **Passos 1–2 validados (D-028).** Decisões técnicas de produto/stack fechadas (D-015..D-022); infra/ambientes fechada ([#146](https://github.com/fortegb/platform/issues/146)); arquitetura de domínio fechada ([#179](https://github.com/fortegb/platform/issues/179): visitas, mensageria, RBAC, admin). O que resta é `deferred` (tours/media/mobile v2/v3) ou o passo 5 (Jornadas, #176).  
> Stack **confirmada** em `platform-vision.md`. Jornadas/telas → passo 5 (#176).

---

## 1. Website — presença corporativa

| Deliverable | Epic / fase | Estado plano |
|-------------|-------------|--------------|
| Site institucional (UI, marca, valores) | P1 Public site UI + P1 Brand | ✅ |
| Portfólio de casas | P1 Public site UI | ✅ |
| Blog | P1 Public site UI | ✅ |
| Ponteiros para blog / redes (tráfego) | P1 Public site UI (sub-task) | ✅ |
| Privacidade, termos, cookies | P1 Public site UI | ✅ |
| WhatsApp / contato | P1 Public site UI | ✅ |

---

## 2. Jornadas de usuário (website + mobile web)

| Actor | Jornada | Define (Architecture) | Build |
|-------|---------|----------------------|-------|
| **Visitante / cliente** | Ver casas, agendar visita autoguiada | Q-003, Q-005–Q-006, journey map | P2 Visitas + Integrations |
| **Visitante** | QR na placa → identidade → acesso → cliente CRM | Q-013, Q-017 | P2 Visitas + P3 Physical-digital |
| **Corretor** | Login | Q-003 | P1 Identity |
| **Corretor** | **Assinar termos/contrato** com ForteGB | **Q-016** | P2 Portal corretor |
| **Corretor** | CRUD clientes + comissão | Q-007 | P2 Portal corretor |
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
| Cliente automático no CRM | P2 Visitas + Integrations | Q-018 |
| Lembretes / follow-up pós-visita | P2 Visitas ([#141](https://github.com/fortegb/platform/issues/141)) + Integrations/CRM | Ships with Visitas MVP |
| Aprovação manual se ID falhar | P2 Integrations ([#80](https://github.com/fortegb/platform/issues/80)) | Visitor visit queue; Q-005 |

*Escolhas de produto/stack **fechadas** (D-015..D-022); mecânica de tours/media/mobile **diferida** para o grilling da fase.*

---

## 4. CRM — capturar atenção em todos os canais

| Fonte (target) | Epic | Grilling |
|----------------|------|----------|
| Formulário site | P2 Integrations | Q-018 |
| Visita agendada / instantânea | P2 Visitas | Q-018 |
| Registro corretor | P2 Portal corretor | Q-007, Q-018 |
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

**Resolvido (Q-019):** v1 = **web responsive**; PWA/native reavaliado na Fase 4.

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

> **Nota (roteiro):** Architecture produto/stack está Done; o **portão G2** ainda exige fechar a Definição (passos 4–7) antes do build — ver [`roteiro.md`](./roteiro.md).

- [x] GitHub org + board ([#8](https://github.com/fortegb/platform/issues/8))
- [x] OpenSpec + workflow ([#20](https://github.com/fortegb/platform/issues/20))
- [x] Architecture & MVP fechado ([#1](https://github.com/fortegb/platform/issues/1) → [#38](https://github.com/fortegb/platform/issues/38))
- [ ] Brand assets — logo SVG + favicon ([#2](https://github.com/fortegb/platform/issues/2)) — paralelo, não bloqueia build (reescopado 2026-07-19: brand guide → #70, hero images → Etapa 8)
- [x] `architecture.md` + [`screen-map.md`](./screen-map.md) ([#32](https://github.com/fortegb/platform/issues/32) Done) — screen-map ainda rascunho passo 5
- [x] Q-003–Q-019 resolved ou deferred com rationale ([`open-questions.md`](./open-questions.md))
- [x] Epics Phase 1–4 no board ([#37](https://github.com/fortegb/platform/issues/37))
- [x] `ROADMAP.md` gerado
- [x] Passos 1–2 validados (D-028 / [#177](https://github.com/fortegb/platform/issues/177))
- [x] Passo 4a Infra & ambientes ([#146](https://github.com/fortegb/platform/issues/146)) — fechado
- [x] Passo 4b Arquitetura de domínio ([#179](https://github.com/fortegb/platform/issues/179)) — fechado
