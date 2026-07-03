# Screen map MVP — ForteGB Platform

> **Status:** publicado (2026-07-03) — aceite sob Architecture #1 ([#32](https://github.com/fortegb/platform/issues/32) Done).  
> **Journeys:** [`architecture.md`](./architecture.md) §3 · [`jornadas-plataforma.md`](./jornadas-plataforma.md)  
> **Legenda Status:** `mock` = UI exists, no backend · `new` = route/screen not built · `phase` = target build phase

---

## Visitante / cliente (público + visita)

| Journey step | Route | Status | Phase | Epic |
|--------------|-------|--------|-------|------|
| Home (variantes Q-010) | `/`, `/v2`, `/v3`, `/v4` | mock | P1 | [#56](https://github.com/fortegb/platform/issues/56) Public site UI |
| Portfólio lista | `/portfolio` | mock | P1 | #56 |
| Portfólio detalhe | `/portfolio/[slug]` | mock | P1 | #56 |
| Blog lista / post | `/blog`, `/blog/[slug]` | mock | P1 | #56 |
| Sobre, Contato | `/sobre`, `/contato` | mock | P1 | #56 |
| Privacidade, Termos | `/privacidade`, `/termos` | mock | P1 | #56 |
| Agendar visita | `/visita/agendar/[houseId]` | mock | P2 | [#81](https://github.com/fortegb/platform/issues/81) Visitas |
| Visita QR (placa) | `/visita/qr/[code]` | mock | P2 | #81 |
| Aviso condomínio/portaria (Q-017) | TBD inline ou modal no fluxo visita | new | P2 | [#140](https://github.com/fortegb/platform/issues/140) |

**Fora MVP v1:** portal cliente logado (jornadas §8).

---

## Corretor

| Journey step | Route | Status | Phase | Epic |
|--------------|-------|--------|-------|------|
| Login | `/login` | mock | P1 | [#48](https://github.com/fortegb/platform/issues/48) Identity |
| Dashboard | `/corretor/dashboard` | mock | P2 | [#86](https://github.com/fortegb/platform/issues/86) Portal corretor |
| Casas / reclamar | `/corretor/casas` | mock | P2 | #86 |
| Leads lista / novo | `/corretor/leads`, `/corretor/leads/novo` | mock | P2 | #86 |
| Onboarding (termos, perfil, CRECI) | `/corretor/onboarding/*` | new | P2 | #86 |
| Contrato por casa + Gov.br (Q-016) | `/corretor/casas/[id]/contrato` | new | P2 | #86 |
| Bot WhatsApp (registo prospecto) | externo WhatsApp | new | P2 | [#142](https://github.com/fortegb/platform/issues/142) |

---

## Staff (operacional)

| Journey step | Route | Status | Phase | Epic |
|--------------|-------|--------|-------|------|
| Área staff (shell pós-login) | `/staff` ou redirect de `/login` | new | P1 shell / P2 features | #48 / TBD staff epic |
| Aprovar corretor | `/staff/corretores` | new | P2 | #86 |
| Aprovar casa associada | `/staff/casas-pendentes` | new | P2 | #86 |
| Fila excepção identidade (visita) | `/staff/visitas/excepcoes` | new | P2 | [#80](https://github.com/fortegb/platform/issues/80) |
| Calendário visitas do dia | `/staff/visitas` | new | P2 | #81 |
| Lead manual (WhatsApp telefónico) | `/staff/leads/novo` | new | P2 | Integrations / CRM |

---

## Admin (sócios)

| Journey step | Route | Status | Phase | Epic |
|--------------|-------|--------|-------|------|
| Config / dashboard admin | `/admin` | new | P2+ | [#119](https://github.com/fortegb/platform/issues/119) |
| Convites utilizador | `/admin/utilizadores` | new | P2+ | #119 |
| API keys (Tuya, HubSpot, WhatsApp) | `/admin/integracoes` | new | P2 | [#72](https://github.com/fortegb/platform/issues/72) |
| Flags (ocultar casa, manutenção) | `/admin/casas` | new | P2+ | #119 |
| Excepções comissão (audit) | `/admin/comissoes` | new | P3+ | TBD |

**Nota:** limites admin vs staff → [`architecture.md`](./architecture.md) §2.

---

## Journey gaps — resolução

| Gap (§3.1) | Decisão |
|------------|---------|
| Staff journeys | Passos acima; detalhe passo-a-passo → jornadas §5.1 (completar em grilling) |
| Admin vs staff UI | Rotas separadas `/staff/*` vs `/admin/*` |
| Condomínio / portaria | [#140](https://github.com/fortegb/platform/issues/140); screen TBD no fluxo visita |
| Aprovação manual ID | `/staff/visitas/excepcoes` · [#80](https://github.com/fortegb/platform/issues/80) |
| Pós-visita follow-up | [#141](https://github.com/fortegb/platform/issues/141) · sem screen MVP (automação/backend) |
| Bot WhatsApp corretor | [#142](https://github.com/fortegb/platform/issues/142) · canal externo |
| Portal cliente logado | Fora MVP v1 |
| Integrações | Backend; sem screen utilizador (jornadas §7) |

---

## Define → build

1. **#32 Done** quando este doc + jornadas alinhados e aceites sob Architecture #1.  
2. **Architecture Done (#38)** → Phase 1 build (#48 Identity shells, #56 Public site).  
3. Staff/admin **shells** mínimos em P1 Identity; **features** em P2+ conforme epics acima.
