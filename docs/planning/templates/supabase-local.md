# Runbook — Supabase local (D-032 / #153)

> Contrato técnico do dia a dia local. **Não** cria a pasta `supabase/` neste leaf — isso fica no bootstrap (#171) / schema build (#43).  
> Toolchain geral (Node, ngrok…) → [#170](https://github.com/fortegb/platform/issues/170). Bootstrap completo do laptop → [#171](https://github.com/fortegb/platform/issues/171).

## Pré-requisitos

1. **Motor de containers** (Docker-compatible)
   - **Preferido no macOS:** [OrbStack](https://orbstack.dev/)
   - **Alternativa OK:** Docker Desktop (ou outro engine compatível)
2. **Supabase CLI** instalada e no `PATH` (`supabase --version`)
3. Pasta `supabase/` no repo (após `supabase init` em #171/#43) — sem ela, `start`/`db reset` não aplicam

## Ciclo diário

```bash
# 1) Motor a correr (OrbStack / Docker Desktop aberto)

# 2) Subir o stack local (na raiz do repo, com supabase/ presente)
supabase start

# 3) Ver estado / URLs / chaves
supabase status

# 4) Studio (URL típica impressa pelo status — ex. http://127.0.0.1:54323)
# Copiar API URL + anon key + service_role (só local) para .env — nomes exactos → [`env-vars.md`](./env-vars.md) (D-041)

# 5) Aplicar migrações + seed SQL do CLI (se configurado)
supabase db reset

# 6) App Nuxt em paralelo
# APP_ENV=local  +  npm run dev

# 7) Parar quando terminar
supabase stop
```

## O que este runbook NÃO cobre

| Assunto | Onde |
|---------|------|
| `supabase init` / criar `supabase/` | #171 / #43 |
| Inventário completo de ferramentas | #170 |
| Conteúdo do seed / LGPD | [`seed-lgpd.md`](./seed-lgpd.md) (D-033) |
| `supabase link` / `db push` staging→prod | D-031 |
| Nomes finais das env vars | [`env-vars.md`](./env-vars.md) (D-041) |

## Falhas comuns

| Sintoma | Verificar |
|---------|-----------|
| CLI não sobe / “Cannot connect to Docker” | OrbStack/Docker Desktop a correr |
| Porta em uso (54321, 54322, 54323…) | Outro Postgres/Supabase local; `supabase stop` ou libertar a porta |
| `supabase/` em falta | Ainda não houve init — ver #171/#43 |
| `db reset` sem migrações | Pasta `migrations/` vazia — esperado até portar o schema |
| App aponta para staging/prod por engano | `APP_ENV=local` + chaves do `supabase status` (nunca chaves cloud no default local) |

## Relação com Ambientes

- Sócios: [`ambientes.html`](../ambientes.html)  
- Contrato geral: [`environments.md`](./environments.md) · D-025…D-032
