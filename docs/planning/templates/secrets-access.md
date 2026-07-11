# Config — gestão de secrets e política de acesso (D-043 / #164)

> Quem pode ver/editar secrets e como lidar com vazamento/rotação. **Docs only** — sem valores. Nomes → [`env-vars.md`](./env-vars.md); superfícies → [`env-scoping.md`](./env-scoping.md). Estrutura SETUP-CREDENTIALS / `.env.example` → #165.

## Ownership

| Papel | Responsabilidade |
|-------|------------------|
| **ForteGB tech** (mantenedor da platform) | Conta responsável por secrets de **Production** e **staging-class**; escreve scopes Vercel; gira chaves; dashboards de vendor com API keys |
| **Sócios (não tech)** | Sem acesso a env Vercel nem API keys; usam o produto e Preview com **senha** (D-027) |

Bus factor = 1 (aceito no free-first familiar). Recuperação: e-mail owner Vercel + “esqueci a senha” nos vendors.

## Acesso

| Recurso | Tech | Sócios |
|---------|------|--------|
| Vercel env Production / Preview | sim | não |
| `.env` / `.env.local` na máquina | só máquinas autorizadas do tech | não |
| API keys / tokens de vendor | sim | não |
| UI do vendor sem exportar keys (se o vendor permitir role limitada) | preferir tech; sócio só se role sem export | caso a caso, mediado pelo tech |
| Preview password (D-027) | sim | sim (UAT) |

## Handling — must / must-not

| Must | Must NOT |
|------|----------|
| Guardar valores só em Vercel scopes + `.env` local gitignored | Commitar secrets no git |
| Usar **nomes** (D-041) em docs/issues/OpenSpec/chat com IA | Colar **valores** em issues, PRs, OpenSpec, Platform docs HTML, WhatsApp/Telegram/e-mail com sócios |
| Revogar/rodar chave ao suspeitar vazamento | Partilhar screenshot da UI de env Vercel em álbuns/chats |
| | Sincronizar `.env` via iCloud/Dropbox/e-mail |

## Rotação

**Disparadores:** vazamento conhecido/suspeito; perda de dispositivo; aviso de compromisso do vendor; saída de alguém com acesso (hoje: N/A além do tech).

**Calendário periódico:** opcional (free-first) — não obrigatório.

**Após rotação:** atualizar Vercel (Production e/ou Preview conforme afetado) + `.env` local; anotar data só em runbook **privado** (#165) — não nas Platform docs públicas.

## Resposta a vazamento (outline)

1. Revogar/rodar a chave no vendor.
2. Atualizar superfícies afetadas (D-042).
3. Verificar se Preview/local ainda usavam a chave antiga.
4. Nota privada (data, o quê) — fora do HTML público.

## Vault

v1: **sem** gestor de secrets pago obrigatório (Vercel + `.env` + dashboards). Reavaliar se a equipe crescer.

## Relação

- [`env-vars.md`](./env-vars.md) · [`env-scoping.md`](./env-scoping.md) · Ambientes · #165 `.env.example` / SETUP-CREDENTIALS
