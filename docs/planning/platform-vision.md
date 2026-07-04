# Visão da plataforma — ForteGB

> Última atualização: 2026-07-01  
> **Stack abaixo = proposta (D-011).** Decisões finais no epic Architecture + [`open-questions.md`](./open-questions.md).

---

## O que é

Plataforma digital para operação real de construção e venda de imóveis em Campinas-SP — **não só um site**.

**Pilares (visão confirmada):**

1. **Website** — presença corporativa, UI alinhada à marca, portfólio, blog, ligação a conteúdo social.
2. **Jornadas** — corretor (termos + clientes/comissão); cliente (visitas autoguiadas); staff (admin TBD).
3. **Backend** — visitas agendadas e instantâneas (QR), identidade, Tuya, CRM.
4. **CRM** — capturar atenção/clientes de website, mobile e outros canais.
5. **Media kit impresso** por casa.
6. **Mobile** — uso completo via celular (responsive v1; app nativo TBD).

**Marca:** transparência, confiança, proximidade, abertura (família ForteGB).

---

## Estado atual do código

| Área | Hoje |
|------|------|
| Site público UI | Mock + variantes home |
| Login | UI/mock |
| Visitas / integrações | UI + stubs |
| Planning / board | Docs locais; org GitHub pendente |

Ver [`deliverables.md`](./deliverables.md) para mapa completo.

---

## Stack proposta *(não fechada)*

| Camada | Candidato |
|--------|-----------|
| App | Nuxt 3, Vue, Tailwind, DaisyUI |
| CMS | Contentful |
| DB / Auth | Supabase |
| CRM | HubSpot |
| Locks | Tuya |
| WhatsApp / Calendar | Business API / Google |
| Hosting | Vercel |

---

## Próximo passo operacional

**Phase 0:** GitHub org migration → bootstrap board → **Architecture epic (grilling)** → Phase 1 build.

Ver [`STATUS.md`](../../STATUS.md).
