# Config — inventário e convenção de env vars (D-041 / #162)

> Nomes canônicos das variáveis de ambiente. **Docs only** — sem valores; scoping → [`env-scoping.md`](./env-scoping.md) (D-042); `.env.example` → #165; política de acesso → #164.

## Convenção

| Regra | Detalhe |
|-------|---------|
| Forma | `SCREAMING_SNAKE_CASE` |
| Cliente (browser) | só `NUXT_PUBLIC_*` |
| Servidor / secret | **sem** prefixo `NUXT_PUBLIC_` |
| Identidade lógica | `APP_ENV` ∈ `{local, staging, prod}` (D-025) — `NODE_ENV` não basta |
| Prefixo por vendor | `SUPABASE_`, `SANITY_`, `HUBSPOT_`, `WHATSAPP_`, `TELEGRAM_`, `TUYA_`, `GOOGLE_CALENDAR_`, `QSTASH_` |
| Override de postura (D-037) | `INTEGRATION_TIER_<VENDOR>` ∈ `{mock, safe-target, prod-live}` — só honrado em local/staging |
| Sem aliases paralelos | um nome canônico por propósito; não documentar sinônimos extras |

**Código atual** (`nuxt.config.ts`) já usa parte desta lista; alinhar runtime no build. Este arquivo é o contrato.

## Inventário

| Nome | Propósito | Público? | Fase | Notas |
|------|-----------|----------|------|-------|
| `APP_ENV` | Ambiente lógico | não (server/config) | v1 | `local` \| `staging` \| `prod` |
| `NUXT_PUBLIC_SUPABASE_URL` | URL projeto Supabase (client) | sim | v1 | Módulo `@nuxtjs/supabase` |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (client) | sim | v1 | RLS; não é service role |
| `SUPABASE_URL` | URL (server / espelho) | não | v1 | Pode espelhar a public URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role | **secret** | v1 | Só server; nunca `NUXT_PUBLIC_` |
| `NUXT_PUBLIC_SANITY_PROJECT_ID` | Project id (client read) | sim | v1 | Quando o client busca CMS |
| `NUXT_PUBLIC_SANITY_DATASET` | Dataset name (client) | sim | v1 | `staging` ou `production` (D-035) |
| `SANITY_PROJECT_ID` | Project id (server) | não | v1 | Opcional se só public basta |
| `SANITY_DATASET` | Dataset (server) | não | v1 | |
| `SANITY_API_TOKEN` | Token API (write/read privado) | **secret** | v1 | Só se precisar write/server |
| `HUBSPOT_API_KEY` | Private app / API key | **secret** | v1 | Safe-target vs prod = valor por scope |
| `HUBSPOT_WEBHOOK_SECRET` | Verificação inbound | **secret** | v1 | Quando handlers existirem |
| `WHATSAPP_API_KEY` | Credencial API (Meta/Twilio/etc.) | **secret** | v1 | Forma exacta no pick do provider |
| `WHATSAPP_API_URL` | Base URL API | não | v1 | |
| `NUXT_PUBLIC_WHATSAPP_NUMBER` | Número CTA (E.164 ou display) | sim | v1 | Contato público |
| `WHATSAPP_WEBHOOK_SECRET` | Verificação inbound | **secret** | v1 | Se o provider exigir |
| `TELEGRAM_BOT_TOKEN` | Bot API token | **secret** | v1 seam | |
| `TELEGRAM_WEBHOOK_SECRET` | Verificação webhook | **secret** | v1 seam | Opcional |
| `QSTASH_TOKEN` | Token Upstash QStash | **secret** | v1 | Nomes alinhados ao Upstash |
| `QSTASH_CURRENT_SIGNING_KEY` | Verify delivery | **secret** | v1 | |
| `QSTASH_NEXT_SIGNING_KEY` | Rotate | **secret** | v1 | |
| `TUYA_ACCESS_ID` | Cloud access id | **secret** | v2 | |
| `TUYA_ACCESS_SECRET` | Cloud access secret | **secret** | v2 | |
| `TUYA_WEBHOOK_SECRET` | Verificação inbound | **secret** | v2 | Opcional |
| `GOOGLE_CALENDAR_CLIENT_ID` | OAuth client | não / sensível | v2 | Trio actual no `nuxt.config` |
| `GOOGLE_CALENDAR_CLIENT_SECRET` | OAuth secret | **secret** | v2 | |
| `GOOGLE_CALENDAR_REFRESH_TOKEN` | Refresh token | **secret** | v2 | Reavaliar no grilling v2 |
| `INTEGRATION_TIER_HUBSPOT` | Override postura | não | v1 | Opcional; D-037 |
| `INTEGRATION_TIER_WHATSAPP` | Override postura | não | v1 | |
| `INTEGRATION_TIER_TELEGRAM` | Override postura | não | v1 | |
| `INTEGRATION_TIER_QSTASH` | Override postura | não | v1 | |
| `INTEGRATION_TIER_TUYA` | Override postura | não | v2 | |
| `INTEGRATION_TIER_GOOGLE_CALENDAR` | Override postura | não | v2 | |

## O que este leaf **não** fecha

| Folha | Escopo |
|-------|--------|
| [`env-scoping.md`](./env-scoping.md) (D-042 / #163) | Qual valor em Production vs Preview vs `.env` local |
| [#164](https://github.com/fortegb/platform/issues/164) | Quem acessa secrets; rotação |
| [#165](https://github.com/fortegb/platform/issues/165) | `.env.example` + estrutura SETUP-CREDENTIALS |

## Relação

- [`env-scoping.md`](./env-scoping.md) (D-042) · [`environments.md`](./environments.md) · Ambientes · #164–#165
