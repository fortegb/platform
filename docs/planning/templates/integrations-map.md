# Integrações — mapa por vendor (D-038 / #159)

> Inventário + classe de safe-target + fase MVP. Posturas: [`integrations-tiers.md`](./integrations-tiers.md) (D-037).  
> Alvos concretos (IDs, números, tokens) → **#160**. Docs only.

## Inventário

| Integração | mock | safe-target (classe) | prod-live | Fase |
|------------|------|----------------------|-----------|------|
| **HubSpot** | Fake CRM | Portal/conta **de teste** | Portal ForteGB ao vivo | **v1** |
| **Tuya** | Fake lock API | **Fechadura/dispositivo de teste** (nunca casa à venda) | Fechaduras do inventário | **v2** |
| **WhatsApp** | Não envia / só log | Número **sandbox/teste** (Meta ou Twilio) | Número Business → clientes | **v1** |
| **Telegram** | Fake bot API | **Bot de dev/teste** + chat privado | Bot(s) de produção | **v1 seam** / bots depois |
| **Google Calendar** | Fake events | **Calendário de teste** dedicado | Calendário ops/visitas | **v2** |
| **QStash** | No-op / in-process | Credenciais **dev/teste** Upstash | Credenciais prod | **v1** |
| **Gov.br** | — | — (manual) | Automação futura | **v1 manual** |

**Fora deste mapa:** Supabase (D-030) e Sanity (D-035) — já isolados por ambiente/dataset.

## Defaults

Postura efetiva segue D-037 (`APP_ENV` + override). Este mapa só diz **para onde** aponta o safe-target / prod-live.

## Relação

- [`integrations-tiers.md`](./integrations-tiers.md) · Ambientes · #160 alvos · #161 webhooks · #172 mocks
