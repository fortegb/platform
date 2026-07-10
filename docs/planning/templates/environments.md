# Ambientes — template de config (A1 / D-025)

> **Spec, não entrega.** Este arquivo documenta o contrato dos três ambientes lógicos.
> Provisionamento (projetos cloud, branches, domínios, seeds) fica nas folhas seguintes do epic #146.

## Identidade

| Variável | Valores | Notas |
|----------|---------|--------|
| `APP_ENV` | `local` \| `staging` \| `prod` | Identidade lógica do ambiente. **Obrigatória** em runtime e docs. |
| `NODE_ENV` | tipicamente `development` (local) ou `production` (staging e prod) | **Não** basta para distinguir staging de prod. |

```bash
# Exemplo — local
APP_ENV=local

# Exemplo — staging (build pode ter NODE_ENV=production)
APP_ENV=staging

# Exemplo — produção
APP_ENV=prod
```

## Contrato por ambiente

| Ambiente | Propósito | Dados | Integrações | Quem |
|----------|-----------|-------|-------------|------|
| `local` | Desenvolver e depurar na máquina | Seed / descartável; **sem PII real de clientes** | **Mock** / stubs; nunca fechadura real nem WhatsApp pago a cliente real | Desenvolvedor(es) |
| `staging` | Validar antes de promover | Seed / anonimizado; **sem cópia de PII de prod por padrão** | Só **safe-target** (sandbox / dispositivo de teste / CRM de teste) | Dev + UAT opcional de sócio (**privado**, não beta público) |
| `prod` | Sistema ao vivo | Dados reais sob LGPD | **Prod-live** | Clientes, corretores, staff |

## Regras transversais

1. **Promoção:** caminho normal = validar em `staging` (ou backends classe-staging) **antes** de `prod`. Não promover `local` → `prod` como padrão.
2. **Hotfix:** permitido como exceção **explícita, excepcional e registrada**; procedimento detalhado na folha de promoção/release (#169).
3. **Preview / ephemeral:** mecanismo de entrega na hospedagem — **não** é um quarto nome lógico; mapeamento → folhas de branch/Vercel (#148/#149).
4. **Local isolado por padrão:** Nuxt/Node (`npm run dev`) + DB/mocks locais. Apontar local → staging só como override consciente; nunca local → prod.
5. **Seed:** política aqui; conteúdo do pacote de seed → #154.

## Inventário completo de env vars

Diferido à área E do epic #146 (#162+). Este template só fixa `APP_ENV` e o contrato acima.

## Branches → ambientes (D-026 / #148)

| Linha git | Ambiente lógico | Notas |
|-----------|-----------------|-------|
| laptop (sem branch de deploy) | `local` | `npm run dev` |
| `feat/*`, `fix/*` | `staging` (via Preview) | backends classe-staging; URL temporária |
| `staging` (longa duração) | `staging` | pré-prod / UAT sócio |
| `main` | `prod` | produção |

**Caminho normal:** `feat/*` ou `fix/*` → merge em `staging` → promover `staging` → `main` (passo separado; não automático na Vercel).

**Close vs promote:** o close de um change **deve** aterrar na *integration branch* (ForteGB: `staging`). Promover para produção é outro passo (#169).

## Lifecycle config — contrato opt-in (implementação → #166)

Arquivo pequeno e explícito (caminho sugerido: `.rbo/lifecycle.yml`). O skill global **não** lê markdown de ambientes.

```yaml
# Presente só em repos que optam in (ex.: ForteGB).
# Ausente → close faz merge para main (comportamento atual; outros produtos intactos).
integrationBranch: staging
```

| Situação | Merge no close |
|----------|----------------|
| Sem arquivo | `main` (default) |
| `integrationBranch: staging` | `staging` |

**Lacuna até #166:** este contrato está especificado; o código do `rbo-close-change` ainda não o lê — close continua → `main`.

## Vercel — topologia (D-027 / #149)

| Item | Decisão |
|------|---------|
| Projetos | **Um** projeto Vercel (app Nuxt) |
| Production | branch `main` → `APP_ENV=prod` + secrets/backends de produção |
| Preview | `staging`, `feat/*`, `fix/*` → `APP_ENV=staging` + backends classe-staging |
| Coexistência | Production e Previews ao mesmo tempo; cold start ≠ desligar prod |
| Proteção Preview | senha compartilhada (sócios sem conta Vercel); um desbloqueio → deployment inteiro |
| Auth da app | Camada separada (Supabase etc.), depois do gate da Vercel |

**Provisionamento** do projeto e toggles exatos na UI Vercel = passo de setup posterior (este arquivo é o contrato). Bypass de webhooks em Preview → #161.

## Domínios (D-029 / #150)

| Uso | Hostnames | Notas |
|-----|-----------|-------|
| `local` | `localhost` | Sem DNS custom; Nuxt `npm run dev` |
| `staging` (branch `staging`) | `staging.fortegb.com` | Domínio custom no Preview; senha D-027 |
| Preview `feat/*` / `fix/*` | `*.vercel.app` | Sem subdomínio custom por PR |
| `prod` (`main`) | `fortegb.com`, `www.fortegb.com` | Mesmo Deployment Production |
| TLD `.com.br` | `fortegb.com.br`, `www.fortegb.com.br` | **301** → `https://fortegb.com` (registrar/CDN); **não** hosts do app Nuxt |
| — | — | **Sem** `staging.fortegb.com.br` |
| Platform docs | `fortegb.github.io/platform` | Fora do mapa de app |

**Provisionamento** (DNS, attach Vercel, redirects) = setup posterior — este arquivo é o contrato.

## Supabase — projetos por ambiente (D-030 / #151)

| Alvo | Projeto / stack | Notas |
|------|-----------------|-------|
| `local` | Docker / OrbStack (Supabase CLI) | Não consome slot free cloud |
| `staging` + Previews Vercel | Cloud **`fortegb-staging`** | Partilhado por branch `staging` e `feat/*`/`fix/*` |
| `prod` | Cloud **`fortegb-prod`** | Só Production (`main`) |

**Regras:**
1. **Sem PII de prod** em staging/local por padrão — seed/fictício apenas.
2. **Schema-as-code** único (migrações) nos três alvos; dados e secrets diferem.
3. **Auth allowlist:** prod = `fortegb.com` + `www`; staging = `staging.fortegb.com` + Previews `*.vercel.app`; local = `http://localhost:3000`.
4. **Vercel env scopes:** Production → credenciais prod; Preview → credenciais staging; local → `.env` / CLI.
5. **Free tier:** 2 projetos activos; pause ~7 dias sem actividade na BD (staging pode pausar); ~500 MB DB / 1 GB storage por projeto.

**Provisionamento** (criar projetos, aplicar migrações, colar secrets) = setup posterior.

## Migrações — Supabase CLI (D-031 / #152)

| Item | Decisão |
|------|---------|
| Fonte da verdade | `supabase/migrations/*.sql` |
| Ferramenta | Supabase CLI (`db reset` / migrate local; `db push` nos projetos cloud) |
| Legado | `docs/database-schema.sql` — referência até portar; não segunda fonte viva |
| Vercel deploy | **Não** aplica migrações |
| Ordem cloud | staging → smoke → prod |
| Higiene | só forward; seed separado (#154); RLS nas migrações |
| Wrappers | npm scripts finos opcionais; sem motor custom |

**Layout:** contrato = pasta `supabase/` no repo (init concreto → setup / #153).
