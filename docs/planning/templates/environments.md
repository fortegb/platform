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

Ver **[`env-vars.md`](./env-vars.md)** (D-041 / #162) — convenção + tabela canónica. Scoping → [`env-scoping.md`](./env-scoping.md) (D-042); `.env.example` → #165.

## Branches → ambientes (D-026 / #148)

| Linha git | Ambiente lógico | Notas |
|-----------|-----------------|-------|
| laptop (sem branch de deploy) | `local` | `npm run dev` |
| `feat/*`, `fix/*` | `staging` (via Preview) | backends classe-staging; URL temporária |
| `staging` (longa duração) | `staging` | pré-prod / UAT sócio |
| `main` | `prod` | produção |

**Caminho normal:** `feat/*` ou `fix/*` → **stage** em `staging` → UAT → **close** (`staging` → `main`). A Vercel **não** promove sozinha.

**Stage vs close (D-045 / #166):**
| Passo | Skill | Git | OpenSpec | Issue |
|-------|-------|-----|----------|-------|
| Stage | `rbo-stage-change` | `feat/*` → `staging` | ativo | aberta (In Progress) |
| Close | `rbo-close-change` | archive + `staging` → `main` | arquivado | `Closes` + Done |

- Stage **não** corre `pages:sync`. Close sim (quando o repo tem Platform docs).
- Stage **falha** se `origin/staging` não existir (sem auto-criar) — bootstrap → #167.
- Hotfix / ceremony de release → #169; `rbo-product-release` não faz merge git.

## Lifecycle config — contrato opt-in (D-045 / #166)

Arquivo: **`.rbo/lifecycle.yml`**. O skill global **não** lê markdown de ambientes.

```yaml
# Opt-in only (e.g. ForteGB). Absent → close merges feat/* → main (default).
integrationBranch: staging
```

| Situação | Stage | Close |
|----------|-------|-------|
| Sem arquivo | n/a (não usar stage) | `feat/*` → `main` (default) |
| `integrationBranch: staging` | `feat/*` → `staging` | archive + `staging` → `main` (fail se não staged) |

**Lacuna skills:** contrato + ficheiro neste repo; código de `rbo-stage-change` / patch de `rbo-close-change` → ciclo em `ai-skills` (companheiro de #166).

## Vercel — topologia (D-027 / #149)

| Item | Decisão |
|------|---------|
| Projetos | **Um** projeto Vercel (app Nuxt) |
| Production | branch `main` → `APP_ENV=prod` + secrets/backends de produção |
| Preview | `staging`, `feat/*`, `fix/*` → `APP_ENV=staging` + backends classe-staging |
| Coexistência | Production e Previews ao mesmo tempo; cold start ≠ desligar prod |
| Proteção Preview | senha compartilhada (sócios sem conta Vercel); um desbloqueio → deployment inteiro |
| Auth da app | Camada separada (Supabase etc.), depois do gate da Vercel |

**Provisionamento** do projeto e toggles exatos na UI Vercel = passo de setup posterior (este arquivo é o contrato). Bypass de webhooks em Preview → D-040 / [`integrations-webhooks.md`](./integrations-webhooks.md).

## Pipeline de deploy (D-046 / #167)

Gatilho, gate de merge, rollback, notificações, e o timing de criação de
`origin/staging` → [`cicd-deploy-pipeline.md`](./cicd-deploy-pipeline.md).
Resumo: gatilho = integração git nativa da Vercel; gate de merge só em
`main`; rollback = dashboard Vercel; `origin/staging` criado no bootstrap de
Execução (#42/#46), não nesta Definição.


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

**Layout:** contrato = pasta `supabase/` no repo (init concreto → #171 bootstrap / #43 schema build).

**Gatilho de apply (D-047 / #168):** manual, não CI. Após `rbo-stage-change`
pousar em `staging` → aplicar contra staging. Após `rbo-close-change` fechar
para `main` (pós-smoke) → aplicar contra prod. Nome do arquivo referenciado
na mensagem de commit (rastreabilidade sem ferramenta). Sem detector
automático de migração pendente — esquecimento é auto-corretivo (erro
visível). Skills → ciclo companheiro em `ai-skills`.

## Supabase local — runbook (D-032 / #153)

## Dev local — toolchain (D-049 / #170)

Inventário completo (Node, Docker/OrbStack, Supabase CLI, ngrok) →
[`dev-local-toolchain.md`](./dev-local-toolchain.md). Resumo: Node com pin
duplo (`.nvmrc` + `engines`); as outras três sem pin (auto-atualização
própria); ngrok opcional, só para túnel de webhook real (D-040).

## Dev local — runbook de bootstrap (D-050 / #171)

Checklist ordenado clone→dev funcionando →
[`dev-local-bootstrap.md`](./dev-local-bootstrap.md). Só local — staging/prod
ficam para Execução (#42/#43/#46).

## Promoção / hotfix (D-048 / #169)

**Promoção:** uma change staged de cada vez — fechar uma promove tudo que
está em `staging`, então não fechar enquanto outra ainda está em validação
na mesma branch.

**Hotfix:** branch `hotfix/<nome>` a partir de `main`; `rbo-close-change`
(v0.5, `ai-skills`) reconhece o prefixo e faz bypass do requisito de
staging — merge direto para `main`, tracking normal de issue + OpenSpec
mantido. **Sync obrigatório:** `main`→`staging` imediatamente após o
hotfix aterrar. **Registro:** trilha normal de issue/OpenSpec basta — sem
entrada extra em `decisions.md` por uso individual.

Ver **[`supabase-local.md`](./supabase-local.md)** — OrbStack preferido no macOS; ciclo `start` / `status` / Studio+keys / `db reset` / `stop`; falhas comuns. **Docs only** neste leaf (sem `supabase init` aqui).

## Seed / LGPD não-prod (D-033 / #154)

Ver **[`seed-lgpd.md`](./seed-lgpd.md)** — pacote sintético partilhado local+staging; lookalike pt-BR; dummy RG/CNH; logins de teste; recreável; sem dump de prod. CMS fixtures → #157+; hardening → #126.

## CMS vendor (D-034 / #155)

Ver **[`cms-vendor.md`](./cms-vendor.md)** — **Sanity**; Contentful removido do stack instalado.

## Sanity — datasets por ambiente (D-035 / #156)

| Alvo do app | Dataset Sanity |
|-------------|----------------|
| `local` + `staging` + Previews Vercel | **`staging`** |
| `prod` (Production / `main`) | **`production`** |

**Regras:** 1 projeto Sanity; promoção de conteúdo `staging` → `production` **explícita** (não no deploy Vercel); Studio edita `staging` por padrão; vars exactas → [`env-vars.md`](./env-vars.md) (D-041).

## CMS — modelo de conteúdo (D-036 / #157)

Ver **[`cms-content-model.md`](./cms-content-model.md)** — types `house` / `blogPost` / stubs timeline+mediaKit; split marketing (Sanity) vs ops (Supabase) por `houseId`.

## Integrações — modelo 3-tiers (D-037 / #158)

Ver **[`integrations-tiers.md`](./integrations-tiers.md)** — posturas mock / safe-target / prod-live; defaults por `APP_ENV`; overrides; seleção de adaptadores.

## Integrações — mapa por vendor (D-038 / #159)

Ver **[`integrations-map.md`](./integrations-map.md)** — inventário, classe de safe-target e fase MVP.

## Integrações — alvos de teste seguros (D-039 / #160)

Ver **[`integrations-safe-targets.md`](./integrations-safe-targets.md)** — must/must-not + slots TBD; secrets só em Vercel/`.env`.

## Integrações — callbacks / webhooks (D-040 / #161)

Ver **[`integrations-webhooks.md`](./integrations-webhooks.md)** — bases `fortegb.com` / `staging.fortegb.com`; Preview = bypass; local mock/túnel; path `/api/webhooks/<vendor>`.

## Config — scoping de valores (D-042 / #163)

Ver **[`env-scoping.md`](./env-scoping.md)** — Production / Preview / `.env` local; mesmos nomes, valores por superfície.

## Config — secrets e acesso (D-043 / #164)

Ver **[`secrets-access.md`](./secrets-access.md)** — owner tech; sócios sem API keys; rotação em vazamento; sem vault pago no v1.

## Config — .env.example + SETUP (D-044 / #165)

Ver **[`env-example.md`](./env-example.md)** — `.env.example` na raiz + [`SETUP-CREDENTIALS.md`](../../SETUP-CREDENTIALS.md) sem secrets.
