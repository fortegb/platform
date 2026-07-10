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

Ficheiro pequeno e explícito → arquivo:

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
