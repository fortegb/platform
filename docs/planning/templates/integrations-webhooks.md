# Integrações — callbacks / webhooks por ambiente (D-040 / #161)

> Onde vendors **empurram** eventos (HTTPS público). Posturas: [`integrations-tiers.md`](./integrations-tiers.md). Alvos: [`integrations-safe-targets.md`](./integrations-safe-targets.md).  
> **Docs only** — não registrar webhooks nos consoles neste leaf; túnel local → #170; mocks → #172; nomes de env → #162.

## Bases canônicas (registro no vendor)

| Ambiente lógico | Host de callback | Notas |
|-----------------|------------------|-------|
| `prod` | `https://fortegb.com` | Preferir apex (não `www`) em allowlists de vendor |
| `staging` (branch `staging`) | `https://staging.fortegb.com` | **Único** sink estável de teste |
| `local` | mock por default; túnel efêmero opcional | URL de túnel **nunca** no git; tooling → #170 |
| Preview `feat/*` / `fix/*` | **nenhum** | Não registrar `*.vercel.app` |

## Preview = bypass

- Previews são efêmeros + protegidos por senha Vercel (D-027) — vendors não passam o gate.
- **Não** apontar HubSpot / WA / Telegram / QStash / etc. para URL de Preview.
- Inbound em Preview: mock, disparo manual, ou simplesmente sem push.
- Outbound safe-target continua permitido (D-037).

## Sink compartilhado de staging

Sandboxes de vendor apontam só para `staging.fortegb.com`. Eventos chegam no deployment estável de staging — **não** em cada Preview. UAT de inbound = staging estável.

## Convenção de path

`/api/webhooks/<vendor>` com `<vendor>` em kebab: `hubspot`, `whatsapp`, `telegram`, `qstash`, `tuya`, `google-calendar`.

Handlers concretos = build (passo 8).

## Assinatura / segredo

Todo webhook **real** (safe-target ou prod-live) **deve** verificar assinatura/segredo do vendor antes de side effects. Secrets: Vercel (Preview=staging-class; Production=prod) + `.env` local — nunca git/HTML (D-039).

## Inbound por vendor (notas)

| Vendor | Fase | Inbound? | Nota |
|--------|------|----------|------|
| **HubSpot** | v1 | Sim (CRM events) | Sandbox → staging host |
| **WhatsApp** | v1 | Sim (status/mensagens, conforme provider) | Sandbox → staging; path `/api/webhooks/whatsapp` |
| **Telegram** | v1 seam | Sim se webhook mode | Bot de teste → staging; local = mock ou túnel |
| **QStash** | v1 | Sim (delivery URL) | Destino = prod ou staging estável; nunca Preview |
| **Tuya** | v2 | Sim (device events) | Mesmas regras de host |
| **Google Calendar** | v2 | Sim (push) | Mesmas regras de host |
| **Gov.br** | manual v1 | Não (neste desenho) | — |

## Must / must-not

| Must | Must NOT |
|------|----------|
| Registrar callbacks só em `fortegb.com` ou `staging.fortegb.com` | Registrar URL de Preview ou túnel local em app **prod** do vendor |
| Verificar assinatura em handlers reais | Desligar senha de Preview “para o webhook funcionar” |
| Local: mock default | Commitar URL de ngrok/túnel |

## Relação

- [`integrations-tiers.md`](./integrations-tiers.md) · [`integrations-map.md`](./integrations-map.md) · [`integrations-safe-targets.md`](./integrations-safe-targets.md) · [`environments.md`](./environments.md) · Ambientes · #162 env · #170 túnel · #172 mocks
