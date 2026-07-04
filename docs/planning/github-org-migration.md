# Runbook — Migração GitHub Organization (Opção A)

> **Status:** ✅ **Concluído** (2026-07-01). Repo principal: **`fortegb/platform`** (renomeado de `sandbox`).  
> **Epic:** GitHub org migration · **Phase:** 0 · **Module:** platform  
> **Decisões:** D-003, D-007, D-008, D-012  
> **Estado alvo:** `https://github.com/fortegb/platform` na Organization `fortegb`

---

## Visão geral

| Antes | Depois |
|-------|--------|
| User `fortegb` (personal) | User `fortegb-admin` (personal) |
| Repo `fortegb/sandbox` (user) | Repo `fortegb/sandbox` (org) |
| Sem issue types org | Issue types + Project na org |
| Keychain/PAT conta `fortegb` | PAT de `fortegb-admin`; namespace local `fortegb/` |

**URL pública do repo não muda** (`github.com/fortegb/sandbox`) — só muda o *tipo* de owner.

---

## Pré-requisitos

- [ ] Acesso admin à conta personal `fortegb` hoje
- [ ] Conta `rbonon` disponível como co-owner
- [ ] Email `contato@fortegb.com` verificado na conta que será renomeada
- [ ] Janela ~30–60 min (sem deploys críticos)
- [ ] Ler seção **Dotfiles** abaixo e repo `~/Documents/GitHub/rbonon/dotfiles` antes do rename

---

## Fase A — Preparação (antes de renomear)

### A1. PAT novo (conta atual `fortegb`, antes ou logo após rename)

GitHub → Settings → Developer settings → PAT (classic):

- Scopes: **`repo`**, **`project`**, **`read:org`**, **`workflow`** (se CI)
- Guardar em local seguro — será o PAT de `fortegb-admin`

### A2. Inventário local

```bash
# Repos sob ~/Documents/GitHub/fortegb/
ls ~/Documents/GitHub/fortegb/

# Remote atual
git -C ~/Documents/GitHub/fortegb/sandbox remote -v

# Verificar gh
gh auth status
gh api users/fortegb --jq .type   # deve ser "User" hoje
```

### A3. Vercel / integrações

- Anotar project Vercel ligado a `fortegb/sandbox`
- Planear reconexão pós-transferência (Settings → Git)

---

## Fase B — GitHub (rename + org + transfer)

### B1. Renomear personal account

1. Login como **`fortegb`**
2. Settings → Account → Change username → **`fortegb-admin`**
3. Confirmar redirects (GitHub cria redirects temporários)

### B2. Criar Organization

1. Profile → **Your organizations** → New organization
2. Nome: **`fortegb`**
3. Plan: **Free**
4. Owner inicial: conta **`fortegb-admin`**

### B3. Co-owners

1. Org `fortegb` → **Settings** → **Member privileges**
2. **Invite** `rbonon` → role **Owner**
3. Exigir **2FA** para owners (recomendado)

### B4. Transferir repositório

**Método preferido (2026):** Move work to organization

1. Login `fortegb-admin` → Settings → **Organizations**
2. **Move work to an organization**
3. Seleccionar **`sandbox`**
4. Destino: org **`fortegb`**

Alternativa: repo Settings → General → Transfer ownership → org `fortegb`

### B5. Issue types (org)

1. Org **fortegb** → Settings → **Planning** → **Issue types**
2. Confirmar defaults: Task, Bug, Feature
3. **Create new type:** Epic (se não existir)
4. Docs: [Managing issue types](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-types-in-an-organization)

### B6. Verificação GitHub

```bash
gh api orgs/fortegb --jq .login
gh api repos/fortegb/sandbox --jq .full_name
gh api orgs/fortegb/issue-types --jq '.[].name'
```

---

## Fase C — Dotfiles

> Repo: `~/Documents/GitHub/rbonon/dotfiles` · Conta atual: `account fortegb` em `dotfiles.conf`

### C1. Modelo acordado (D-008)

| Concepto | Valor |
|----------|-------|
| Namespace / pasta / `repo_clone` | **`fortegb`** (org slug) |
| Login GitHub / PAT | **`fortegb-admin`** |
| Email commits ForteGB | **`contato@fortegb.com`** |
| Pasta local | **`~/Documents/GitHub/fortegb/sandbox`** (sem mover) |

### C2. Atualizar `dotfiles.conf`

Manter bloco com chave **`fortegb`** (namespace org):

```
account fortegb contato@fortegb.com "ForteGB"
pat ghp_<NOVO_TOKEN_fortegb-admin>
```

Opcional futuro: campo `auth=fortegb-admin` no dotfiles — ver issue de enhancement.

### C3. Keychain e env

```bash
cd ~/Documents/GitHub/rbonon/dotfiles
./scripts/setup/setup_pats      # ou dotfiles_install
./scripts/setup/setup_check
```

Keychain: entrada `-a fortegb-admin` + `-s github.com` (ou manter `-a fortegb` se URL usar `fortegb@` — preferir **`fortegb-admin@`** na URL para match correto).

### C4. Remote URL recomendada

```bash
cd ~/Documents/GitHub/fortegb/sandbox
git remote set-url origin https://fortegb-admin@github.com/fortegb/sandbox.git
git fetch
git push   # smoke test
```

### C5. `setup_migrate`

Só converte SSH→HTTPS. **Não** corrige username — fazer remotes manualmente ou script dedicado.

### C6. Documentar em dotfiles

Entrada em `dotfiles/DECISIONS.md`: org namespace `fortegb` vs auth login `fortegb-admin`.

---

## Fase D — Repo sandbox (este projeto)

```bash
cd ~/Documents/GitHub/fortegb/sandbox
git remote set-url origin https://fortegb-admin@github.com/fortegb/sandbox.git
# Atualizar referências em docs se ainda apontarem user vs org
```

### OpenSpec / skills

- `gh project list --owner fortegb` — board na **org**
- Skills `rbo-*` parseiam owner do remote → **`fortegb`**

---

## Fase E — Vercel

1. Dashboard Vercel → Project → Settings → Git
2. Reconnect **`fortegb/sandbox`** (org)
3. Confirmar env vars intactas
4. Trigger deploy de teste

---

## Fase F — Bootstrap board (sub-epic)

Seguir [phases.md](./phases.md) epic *Bootstrap board & OpenSpec*:

1. `gh project create --owner fortegb --title sandbox`
2. Campos Phase + Module
3. Primeiro epic issue: este runbook → sub-issues com checklist acima
4. Regenerar `ROADMAP.md`

---

## Rollback (se algo correr mal)

- GitHub support para transferências problemáticas
- Manter PAT antigo até smoke test passar
- Não apagar user `fortegb-admin` — é a identidade business

---

## Done when

- [ ] `github.com/fortegb/sandbox` mostra Organization owner
- [ ] `git push` / `git pull` funcionam
- [ ] `setup_check` verde para remotes `fortegb/*`
- [ ] Vercel deploy OK
- [ ] `gh project list --owner fortegb` lista project `platform`
- [ ] Issue types visíveis ao criar issue
- [ ] `STATUS.md` atualizado com IDs de issues

**Outras máquinas:** ver [setup-mac-mini.md](../setup-mac-mini.md).

---

## Referências

- [Move work to organization](https://docs.github.com/en/account-and-profile/how-tos/account-management/moving-your-work-to-an-organization)
- [Deprecation user→org transform (Jan 2026)](https://github.blog/changelog/2026-01-12-deprecation-of-user-to-organization-account-transformation/)
- [Sub-issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues)
- Dotfiles multi-account: `rbonon/dotfiles/AGENTS.md`
