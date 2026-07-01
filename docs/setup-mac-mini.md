# Setup Mac Mini — org ForteGB + dotfiles

> Checklist para alinhar o **Mac Mini** após a migração feita na máquina principal (2026-07-01).  
> **Decisões:** D-012, D-013 · **Dotfiles:** ≥ 0.8.1 (`auth` / `commit_as`)

---

## Estado alvo

| Item | Valor |
|------|--------|
| Org | `fortegb` |
| Repos org | `platform`, `app-despesas`, `ai-assets` |
| Pasta local | `~/Documents/GitHub/fortegb/<repo>/` |
| Remote | `https://rbonon@github.com/fortegb/<repo>.git` |
| Commits | `rbonon` / `ricardobonon@gmail.com` |
| Admin GitHub | `fortegb-admin` (PAT no conf; sem repos) |

---

## 1. Dotfiles (conf + scripts)

```bash
cd ~/Documents/GitHub/rbonon/dotfiles
git pull
```

Copiar **`dotfiles.conf`** do 1Password (entrada pós-migração) para:

- `~/Documents/GitHub/rbonon/dotfiles/dotfiles.conf`
- `~/.config/dotfiles/dotfiles.conf`

```bash
./scripts/setup/update_scripts
dotfiles_update          # ou mínimo: update_scripts + setup_pats
./scripts/setup/setup_pats
source ~/.zshrc
```

**Esperado em `setup_pats`:** `rbonon`, `akamlibehsafe`, `fortegb-admin` validados; **`fortegb`** skipped (org namespace → auth rbonon).

---

## 2. Remover clones antigos (se existirem)

```bash
rm -rf ~/Documents/GitHub/fortegb/sandbox
rm -rf ~/Documents/GitHub/fortegb/fortegb-despesas
rm -rf ~/Documents/GitHub/fortegb/Resources_IA
```

*(Nomes antigos antes dos renames no GitHub.)*

---

## 3. Clonar repos da org

```bash
repo_clone fortegb/platform
repo_clone fortegb/app-despesas
repo_clone fortegb/ai-assets
```

`repo_clone` define remote + identidade git automaticamente.

---

## 4. Verificar

```bash
for r in platform app-despesas ai-assets; do
  echo "=== $r ==="
  git -C ~/Documents/GitHub/fortegb/$r remote -v
  git -C ~/Documents/GitHub/fortegb/$r config user.email
  git -C ~/Documents/GitHub/fortegb/$r status -sb
  echo
done
```

**Esperado:**

- Remote: `https://rbonon@github.com/fortegb/<repo>.git`
- Email: `ricardobonon@gmail.com`
- Branch sincronizada com `origin` (push se `repo_clone` criou commits de scaffold)

---

## 5. GitHub CLI

```bash
gh auth status    # conta rbonon
gh repo list fortegb
```

Deve listar: `platform`, `app-despesas`, `ai-assets`.

---

## 6. Cursor / OpenSpec

- Abrir workspace: `~/Documents/GitHub/fortegb/platform`
- Reiniciar Cursor se slash commands OpenSpec não aparecerem (após `openspec init` no clone)

---

## Problemas comuns

| Sintoma | Causa | Fix |
|---------|--------|-----|
| `setup_pats` pede PAT para `fortegb` | Dotfiles < 0.8.1 | `git pull` em dotfiles |
| Remote `fortegb@…/fortegb/…` | conf antiga | Copiar conf 1Password + re-clone |
| `export GH_TOKEN_fortegb-admin` error | Dotfiles < 0.8.1 | Atualizar dotfiles (hyphen fix 0.8.1) |
| Push 403 | `rbonon` não na org | Aceitar invite Owner em `fortegb` |

---

## Referências

- [github-org-migration.md](./planning/github-org-migration.md) — runbook completo (já executado)
- [decisions.md](./planning/decisions.md) — D-012 (platform), D-013 (dotfiles auth)
- Dotfiles: `rbonon/dotfiles` — `dotfiles.conf.example`, `DECISIONS.md` (2026-07-01)
