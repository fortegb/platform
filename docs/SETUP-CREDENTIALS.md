# SETUP-CREDENTIALS — estrutura e runbook (D-044 / #165)

> **Sem valores secretos neste arquivo.** Nomes: [`env-vars.md`](./planning/templates/env-vars.md) · Superfícies: [`env-scoping.md`](./planning/templates/env-scoping.md) · Acesso: [`secrets-access.md`](./planning/templates/secrets-access.md).  
> Preencher contas reais = setup (#47 e provisionamento). Rotação: anotar data só em nota **privada** (não aqui, não no HTML das Platform docs).

## Arranque local

```bash
cp .env.example .env
# editar .env com valores locais / mock / staging-class (nunca prod por default)
npm run dev
```

| Superfície | Onde colar valores |
|------------|-------------------|
| Local | `.env` / `.env.local` (gitignored) |
| Staging-class (Previews + `staging`) | Vercel → Environment Variables → **Preview** |
| Produção | Vercel → Environment Variables → **Production** |

`APP_ENV`: `local` no `.env`; `staging` no Preview; `prod` no Production.

## Por família de credencial

### Runtime
| Var | Onde obter | Notas |
|-----|------------|-------|
| `APP_ENV` | — | `local` \| `staging` \| `prod` |

### Supabase (v1)
| Var | Onde obter |
|-----|------------|
| `NUXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL` | Project Settings → API → Project URL |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | API → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | API → `service_role` (**secret**; só server) |

Projetos: `fortegb-staging` / `fortegb-prod` (D-030). Local: Docker/OrbStack (D-032).

### Sanity (v1)
| Var | Onde obter |
|-----|------------|
| `NUXT_PUBLIC_SANITY_PROJECT_ID` / `SANITY_PROJECT_ID` | sanity.io → projeto |
| `NUXT_PUBLIC_SANITY_DATASET` / `SANITY_DATASET` | `staging` ou `production` (D-035) |
| `SANITY_API_TOKEN` | API token com escopo mínimo (**secret** se write) |

### HubSpot (v1)
| Var | Onde obter |
|-----|------------|
| `HUBSPOT_API_KEY` | Private App → access token |
| `HUBSPOT_WEBHOOK_SECRET` | Quando configurar webhooks |

Safe-target = portal de teste (D-039).

### WhatsApp (v1)
| Var | Onde obter |
|-----|------------|
| `WHATSAPP_API_KEY` / `WHATSAPP_API_URL` | Meta Cloud API ou Twilio (provider no build) |
| `NUXT_PUBLIC_WHATSAPP_NUMBER` | Número CTA (público) |
| `WHATSAPP_WEBHOOK_SECRET` | Se o provider exigir |

### Telegram (v1 seam)
| Var | Onde obter |
|-----|------------|
| `TELEGRAM_BOT_TOKEN` | @BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | Opcional |

### QStash (v1)
| Var | Onde obter |
|-----|------------|
| `QSTASH_TOKEN` | Upstash console |
| `QSTASH_CURRENT_SIGNING_KEY` / `QSTASH_NEXT_SIGNING_KEY` | Upstash → QStash keys |

### Tuya (v2)
| Var | Onde obter |
|-----|------------|
| `TUYA_ACCESS_ID` / `TUYA_ACCESS_SECRET` | iot.tuya.com cloud project |
| `TUYA_WEBHOOK_SECRET` | Opcional |

Dispositivo = teste, nunca fechadura de casa à venda (D-039).

### Google Calendar (v2)
| Var | Onde obter |
|-----|------------|
| `GOOGLE_CALENDAR_CLIENT_ID` / `_CLIENT_SECRET` / `_REFRESH_TOKEN` | Google Cloud OAuth (reavaliar no grilling v2) |

### Overrides de postura (opcional)
`INTEGRATION_TIER_<VENDOR>` — só local/Preview; ver D-037. Deixados comentados no `.env.example`.

## Checklist (sem colar secrets)

- [ ] `.env` criado a partir de `.env.example`
- [ ] Vercel Preview preenchido (staging-class)
- [ ] Vercel Production preenchido (prod) — só quando for ao ar
- [ ] Nenhum secret em git / issues / chat (D-043)
- [ ] Slots safe-target TBD preenchidos no setup ([`integrations-safe-targets.md`](./planning/templates/integrations-safe-targets.md))

## Relação

- Inventário: [`planning/templates/env-vars.md`](./planning/templates/env-vars.md)  
- Scoping: [`planning/templates/env-scoping.md`](./planning/templates/env-scoping.md)  
- Acesso: [`planning/templates/secrets-access.md`](./planning/templates/secrets-access.md)  
- Template machine-readable: [`.env.example`](../.env.example) na raiz do repo
