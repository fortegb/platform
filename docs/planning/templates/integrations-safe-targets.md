# Integrações — alvos de teste seguros (D-039 / #160)

> Contrato do safe-target **concreto**: must / must-not + slots TBD. Classes: [`integrations-map.md`](./integrations-map.md). Posturas: [`integrations-tiers.md`](./integrations-tiers.md).  
> **Docs only** — não inventar IDs; não commitar secrets. Provisionar = setup depois.

## Regras gerais

- Slots começam **TBD**; preencher quando a conta/dispositivo existir.
- Preferir nomes `fortegb-staging-*` quando o vendor permitir.
- **Owner:** ForteGB tech. Ao preencher um slot, anotar data.
- **Secrets** (keys/tokens): Vercel env (Preview = staging-class; Production = prod) + `.env` local gitignored — **nunca** git / HTML público.
- Labels não-secretos (ex. nome do portal de teste) podem ficar neste template.
- Nomes exactos de env vars → #162 · política de acesso → #164 · runbook credenciais → #165.

## Slots por vendor

| Vendor | Must be | Must NOT be | Slot (TBD) | Last filled |
|--------|---------|-------------|------------|-------------|
| **HubSpot** | Portal/conta de teste separado | Portal de vendas ForteGB ao vivo | Portal ID / nome: **TBD** | — |
| **Tuya** | Dispositivo/fechadura de teste dedicado | Fechadura de casa à venda | Device ID: **TBD** | — |
| **WhatsApp** | Sandbox Meta/Twilio ou número só de teste | Número Business de clientes | Provider + número: **TBD** | — |
| **Telegram** | Bot de dev; só chats allowlisted | Token do bot de produção em staging | Bot username + allowlist: **TBD** | — |
| **Google Calendar** | Calendário de teste dedicado | Calendário ops/visitas de prod | Calendar ID: **TBD** | — |
| **QStash** | Credenciais dev/teste (conta separada ou token set non-prod) | Signing keys de prod em Preview | Abordagem + label do token: **TBD** | — |

## Relação

- [`integrations-map.md`](./integrations-map.md) · [`integrations-tiers.md`](./integrations-tiers.md) · [`integrations-webhooks.md`](./integrations-webhooks.md) · Ambientes · #162 env