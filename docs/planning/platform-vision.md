# Visão da plataforma — ForteGB

> Última atualização: 2026-07-10  
> **Stack confirmada** (grillings → `decisions.md` D-015..D-021). Passos 1–2 validados (**D-028**). O que resta de produto é `deferred` para o grilling da fase — ver [`open-questions.md`](./open-questions.md). Infra/ambientes em curso no passo 4 ([#146](https://github.com/fortegb/platform/issues/146)).

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
| Planning / board | Org `fortegb` + Project `platform` + OpenSpec; docs em `docs/planning/` |

Ver [`deliverables.md`](./deliverables.md) para mapa completo.

---

## Fronteira de MVP — v1 / v2 / v3 *(D-018)*

> Marcos de **lançamento** (não confundir com Fases de construção). Detalhe → [`architecture.md`](./architecture.md) §1.

- **v1** — site público + portfólio + CTA visita WhatsApp · auth + papéis · **portal do corretor** (registro de cliente + proteção de comissão + HubSpot) · contrato/Gov.br manual.
- **v2** — **visitas autoguiadas** (agendada + QR) + identidade + Tuya + calendário · Gov.br automatizado · bots.
- **v3** — media kit impresso, timeline da obra, motor social, portal do cliente, relatórios.

---

## Stack *(confirmada onde decidida)*

| Camada | Escolha | Estado |
|--------|---------|--------|
| App / runtime | Nuxt 3 · **serverless na Vercel** (Hobby→Pro), API-first, QStash | ✅ D-017 |
| Conteúdo (CMS) | **Sanity** (D-034) | ✅ D-016/D-034 |
| DB / Auth / Storage | **Supabase** (master de dados + PII) | ✅ D-016/D-019 |
| CRM | **HubSpot** (downstream, sync do Supabase) | ✅ D-019 |
| Mensageria | **Telegram-first** (grátis); WhatsApp pago-quando-útil | ✅ D-017 |
| UI | Tailwind, DaisyUI | ✅ |
| Locks | Tuya | proposta (grilling tours v2) |
| Calendar | Google | proposta (grilling tours v2) |

---

## Próximo passo operacional

**Passos 1–2 validados (D-028).** Produto/stack de Architecture (#1 → #38) fechados. **Em curso: passo 4 — Epic [#146](https://github.com/fortegb/platform/issues/146)** (arquitetura da solução & ambientes). Build (passo 8) permanece **gated por G2** até a Definição (passos 1–7) fechar — ver [`roteiro.md`](./roteiro.md).

Ver [`STATUS.md`](../../STATUS.md).
