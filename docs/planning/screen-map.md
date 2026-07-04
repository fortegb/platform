# Mapa de telas MVP — Plataforma ForteGB

> **Estado:** publicado (2026-07-03) — aceite sob Architecture #1 ([#32](https://github.com/fortegb/platform/issues/32) concluído).  
> **Jornadas:** [`architecture.md`](./architecture.md) §3 · [`jornadas-plataforma.md`](./jornadas-plataforma.md)  
> **Legenda:** `simulado` = UI existe, sem back-end · `novo` = tela/rota por construir · **Fase** = fase no plano

---

## Visitante / cliente (público + visita)

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Home (variantes Q-010) | `/`, `/v2`, `/v3`, `/v4` | simulado | 1 | [#56](https://github.com/fortegb/platform/issues/56) Site público UI |
| Portfólio lista | `/portfolio` | simulado | 1 | #56 |
| Portfólio detalhe | `/portfolio/[slug]` | simulado | 1 | #56 |
| Blog lista / post | `/blog`, `/blog/[slug]` | simulado | 1 | #56 |
| Sobre, Contato | `/sobre`, `/contato` | simulado | 1 | #56 |
| Privacidade, Termos | `/privacidade`, `/termos` | simulado | 1 | #56 |
| Agendar visita | `/visita/agendar/[houseId]` | simulado | 2 | [#81](https://github.com/fortegb/platform/issues/81) Visitas |
| Visita QR (placa) | `/visita/qr/[code]` | simulado | 2 | #81 |
| Aviso condomínio/portaria (Q-017) | TBD inline ou modal no fluxo visita | novo | 2 | [#140](https://github.com/fortegb/platform/issues/140) |

**Fora MVP v1:** portal cliente logado (jornadas §8).

---

## Corretor

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Login | `/login` | simulado | 1 | [#48](https://github.com/fortegb/platform/issues/48) Identidade |
| Painel | `/corretor/dashboard` | simulado | 2 | [#86](https://github.com/fortegb/platform/issues/86) Portal corretor |
| Casas / reclamar | `/corretor/casas` | simulado | 2 | #86 |
| Leads lista / novo | `/corretor/leads`, `/corretor/leads/novo` | simulado | 2 | #86 |
| Onboarding (termos, perfil, CRECI) | `/corretor/onboarding/*` | novo | 2 | #86 |
| Contrato por casa + Gov.br (Q-016) | `/corretor/casas/[id]/contrato` | novo | 2 | #86 |
| Bot WhatsApp (registro prospecto) | externo WhatsApp | novo | 2 | [#142](https://github.com/fortegb/platform/issues/142) |

---

## Staff (operacional)

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Área staff (estrutura pós-login) | `/staff` ou redirect de `/login` | novo | 1 estrutura / 2 funcionalidades | #48 / epic staff TBD |
| Aprovar corretor | `/staff/corretores` | novo | 2 | #86 |
| Aprovar casa associada | `/staff/casas-pendentes` | novo | 2 | #86 |
| Fila exceção identidade (visita) | `/staff/visitas/excecoes` | novo | 2 | [#80](https://github.com/fortegb/platform/issues/80) |
| Calendário visitas do dia | `/staff/visitas` | novo | 2 | #81 |
| Lead manual (WhatsApp telefónico) | `/staff/leads/novo` | novo | 2 | Integrações / CRM |

---

## Admin (sócios)

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Config / painel admin | `/admin` | novo | 2+ | [#119](https://github.com/fortegb/platform/issues/119) |
| Convites usuário | `/admin/usuários` | novo | 2+ | #119 |
| Chaves API (Tuya, HubSpot, WhatsApp) | `/admin/integracoes` | novo | 2 | [#72](https://github.com/fortegb/platform/issues/72) |
| Flags (ocultar casa, manutenção) | `/admin/casas` | novo | 2+ | #119 |
| Exceções comissão (auditoria) | `/admin/comissoes` | novo | 3+ | TBD |

**Nota:** limites admin vs staff → [`architecture.md`](./architecture.md) §2.

---

## Lacunas de jornada — resolução

| Lacuna (§3.1) | Decisão |
|---------------|---------|
| Jornadas staff | Passos acima; detalhe passo-a-passo → jornadas §5.1 (completar em grilling) |
| UI admin vs staff | Rotas separadas `/staff/*` vs `/admin/*` |
| Condomínio / portaria | [#140](https://github.com/fortegb/platform/issues/140); tela TBD no fluxo visita |
| Aprovação manual ID | `/staff/visitas/excecoes` · [#80](https://github.com/fortegb/platform/issues/80) |
| Follow-up pós-visita | [#141](https://github.com/fortegb/platform/issues/141) · sem tela MVP (automação/back-end) |
| Bot WhatsApp corretor | [#142](https://github.com/fortegb/platform/issues/142) · canal externo |
| Portal cliente logado | Fora MVP v1 |
| Integrações | Back-end; sem tela de usuário (jornadas §7) |

---

## Definição → construção

1. **#32 concluído** — este doc + jornadas alinhados sob Architecture #1.  
2. **Architecture concluído (#38)** → construção Fase 1 (#48 identidade, #56 site público).  
3. Staff/admin — **estruturas** mínimas na Fase 1 Identidade; **funcionalidades** na Fase 2+ conforme epics acima.
