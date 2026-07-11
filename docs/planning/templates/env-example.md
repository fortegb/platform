# Config — .env.example + SETUP-CREDENTIALS (D-044 / #165)

> Artefactos concretos do inventário (D-041), scoping (D-042) e acesso (D-043).

| Artefacto | Função |
|-----------|--------|
| [`.env.example`](../../../.env.example) (raiz do repo) | Lista canónica de nomes; valores vazios; seguro para commit |
| [`docs/SETUP-CREDENTIALS.md`](../../SETUP-CREDENTIALS.md) | Runbook humano: como obter / onde colar; **sem** secrets |
| `.env` / `.env.local` | Só máquina local; **gitignored** |

**Não** preencher valores reais nestes ficheiros públicos. Provisionar contas = setup (#47).

## Relação

- [`env-vars.md`](./env-vars.md) · [`env-scoping.md`](./env-scoping.md) · [`secrets-access.md`](./secrets-access.md) · Ambientes
