# Mapa de telas MVP — Plataforma ForteGB

> **Estado:** ⚠️ **RASCUNHO — re-validar no passo 5** (Jornadas/telas), agora que o passo 4 (Arquitetura) fechou. Infra/ambientes ([#146](https://github.com/fortegb/platform/issues/146)) e arquitetura de domínio ([#179](https://github.com/fortegb/platform/issues/179)) ambas concluídas. Publicado em 2026-07-03 sob Architecture #1, mas mock-first; rotas/telas podem mudar na re-validação do passo 5. Ver [`roteiro.md`](./roteiro.md).  
> **Jornadas:** [`architecture.md`](./architecture.md) §3 · [`jornadas-plataforma.md`](./jornadas-plataforma.md)  
> **Legenda:** `simulado` = UI existe, sem back-end · `novo` = tela/rota por construir · **Fase** = fase no plano

---

## Visitante / cliente (público + visita)

> Home, Portfólio, Blog e Contato (descoberta) ✅ **re-validadas** —
> [#185](https://github.com/fortegb/platform/issues/185), D-057. Agendar
> visita ✅ **re-validada** — [#186](https://github.com/fortegb/platform/issues/186),
> D-058. Visita QR ✅ **re-validada** —
> [#187](https://github.com/fortegb/platform/issues/187), D-059 (reabre
> D-053 para o mecanismo de renovação limitada). Fronteira compartilhada:
> staff-review = #192 (ainda rascunho); condomínio/portaria = #140 (já
> deferido a Execução). Sobre segue rascunho (fora do escopo de #185).
> Demais linhas seguem `RASCUNHO` até suas leaves de Passo 5 fecharem.

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Home (variantes hero — Q-010) | `/`, `/classico`, `/slate`, `/azul` | simulado — validado #185 | 1 | [#56](https://github.com/fortegb/platform/issues/56) Site público UI |
| Portfólio lista | `/portfolio` | simulado — validado #185 | 1 | #56 |
| Portfólio detalhe | `/portfolio/[slug]` | simulado — validado #185 | 1 | #56 |
| Blog lista / post | `/blog`, `/blog/[slug]` | simulado — validado #185 | 1 | #56 |
| Sobre | `/sobre` | simulado | 1 | #56 |
| Contato | `/contato` | simulado — validado #185 | 1 | #56 |
| Privacidade, Termos | `/privacidade`, `/termos` | simulado | 1 | #56 |
| Agendar visita | `/visita/agendar/[houseId]` | simulado — validado #186 | 2 | [#81](https://github.com/fortegb/platform/issues/81) Visitas |
| Visita QR (placa) | `/visita/qr/[code]` | simulado — validado #187 | 2 | #81 |
| Aviso condomínio/portaria (Q-017) | TBD inline ou modal no fluxo visita | novo | 2 | [#140](https://github.com/fortegb/platform/issues/140) |

**Fora MVP v1:** portal cliente logado (jornadas §8).

---

## Corretor

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Login | `/login` | simulado | 1 | [#48](https://github.com/fortegb/platform/issues/48) Identidade |
| Painel | `/corretor/dashboard` | simulado | 2 | [#86](https://github.com/fortegb/platform/issues/86) Portal corretor |
| Casas / reclamar | `/corretor/casas` | simulado | 2 | #86 |
| Clientes lista / novo | `/corretor/clientes`, `/corretor/clientes/novo` | simulado | 2 | #86 |
| Onboarding (termos, perfil, CRECI) | `/corretor/onboarding/*` | novo | 2 | #86 |
| Contrato por casa + Gov.br (Q-016) | `/corretor/casas/[id]/contrato` | novo | 2 | #86 |
| Bot WhatsApp (registro cliente) | externo WhatsApp | novo | 2 | [#142](https://github.com/fortegb/platform/issues/142) |

---

## Staff (operacional)

> Fila de exceção de verificação ✅ **re-validada** —
> [#192](https://github.com/fortegb/platform/issues/192), D-060. Primeira
> tela staff a fechar; demais linhas seguem `RASCUNHO`/`novo` até suas
> leaves (#189, #193) fecharem.

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Área staff (estrutura pós-login) | `/staff` ou redirect de `/login` | novo | 1 estrutura / 2 funcionalidades | #48 / epic staff TBD |
| Aprovar corretor | `/staff/corretores` | novo | 2 | #86 |
| Aprovar casa associada | `/staff/casas-pendentes` | novo | 2 | #86 |
| Fila exceção identidade (visita) | `/staff/visitas/excecoes` | novo — validado #192 | 2 | [#80](https://github.com/fortegb/platform/issues/80) |
| Calendário visitas do dia | `/staff/visitas` | novo | 2 | #81 |
| Cliente manual (WhatsApp telefônico) | `/staff/clientes/novo` | novo | 2 | Integrações / CRM |

---

## Admin (sócios)

| Passo da jornada | Rota | Estado | Fase | Epic |
|------------------|------|--------|------|------|
| Config / painel admin | `/admin` | novo | 2+ | [#119](https://github.com/fortegb/platform/issues/119) |
| Convites usuário | `/admin/usuários` | novo | 2+ | #119 |
| Chaves API (Tuya, HubSpot, WhatsApp) | `/admin/integracoes` | novo | 2 | [#72](https://github.com/fortegb/platform/issues/72) |
| Flags (ocultar casa, manutenção) | `/admin/casas` | novo | 2+ | #119 |
| Registro de Cliente / histórico (auditoria, exceções) | `/staff/registros` | novo | 2 | [#86](https://github.com/fortegb/platform/issues/86) |

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
