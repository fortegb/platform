# Integrações — modelo 3-tiers (D-037 / #158)

> Posturas de integração (não ambientes). **Docs only** — mapa → D-038; alvos → D-039; webhooks → #161; mocks → #172; nomes de env → #162.

## Posturas

| Tier | Significado | Regra dura |
|------|-------------|------------|
| **mock** | Stub in-process; sem chamada real ao vendor | Nunca toca dispositivo real, mensagem paga a cliente, nem CRM ao vivo |
| **safe-target** | API real, mas conta/dispositivo/sandbox de **teste** | Pode chamar vendors; não pode afetar clientes reais nem fechaduras de produção |
| **prod-live** | API real → recursos de produção | Só com `APP_ENV=prod` |

## Default por ambiente

| `APP_ENV` | Tier default |
|-----------|--------------|
| `local` | **mock** |
| `staging` (+ todos os Previews Vercel) | **safe-target** |
| `prod` | **prod-live** |

## Overrides

- Só em `local` / `staging`, e só entre `{mock, safe-target}` — **nunca** `prod-live`.
- Em `prod`: sempre `prod-live`; sem override.
- Override **explícito** (config/env) — **não** inferir de “há credenciais”.

## Seleção (adaptadores)

`effectiveTier(integration) = override[integration] ?? default(APP_ENV)`

Factory do adaptador (D-017) escolhe mock vs cliente real conforme o tier efetivo. Diferença **safe-target vs prod-live** = sobretudo **quais credenciais / base URL** (classes → [`integrations-map.md`](./integrations-map.md); contrato/slots → [`integrations-safe-targets.md`](./integrations-safe-targets.md)), não um terceiro caminho de código salvo necessidade do vendor.

Nomes exactos das env vars → #162.

## Relação

- [`integrations-map.md`](./integrations-map.md) (D-038) · [`integrations-safe-targets.md`](./integrations-safe-targets.md) (D-039) · [`environments.md`](./environments.md) · Ambientes · #172 mocks locais
