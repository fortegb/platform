# Config — modelo de scoping de env (D-042 / #163)

> Onde vivem os **valores** das variáveis (D-041 = nomes). **Docs only** — sem colar secrets. Política de acesso → [`secrets-access.md`](./secrets-access.md) (D-043); exemplo → [`env-example.md`](./env-example.md) (D-044).

## Superfícies (obrigatórias)

| Superfície | Onde | `APP_ENV` | Classe de backends |
|------------|------|-----------|-------------------|
| **Vercel Production** | scope Production (`main`) | `prod` | prod (`fortegb-prod`, Sanity `production`, prod-live) |
| **Vercel Preview** | scope Preview (`staging` + `feat/*` / `fix/*`) | `staging` | staging-class (`fortegb-staging`, Sanity `staging`, safe-target) |
| **Local** | `.env` e/ou `.env.local` (gitignored) | `local` | local/mock por default |

- **Mesmos nomes** em todas as superfícies (D-041); mudam só os **valores**.
- **Um** conjunto Preview — não há secrets por branch `feat/*`.
- Scope **Development** da Vercel: **não obrigatório**; se existir, só opcional para parity local — não é 4.º ambiente lógico.

## Regras

1. Production e Preview **coexistem** com conjuntos distintos (D-027).
2. Local **não** aponta a prod por default; override para staging-class só de propósito (D-025).
3. `INTEGRATION_TIER_*`: só em Preview/local quando houver override; omitir em Production (sempre prod-live).
4. `NUXT_PUBLIC_*` também é scoped (Preview = IDs/URLs staging; Production = prod).
5. Secrets **nunca** em git nem HTML das Platform docs (D-039).

## Must / must-not

| Must | Must NOT |
|------|----------|
| Colocar `APP_ENV=prod` só no scope Production | Copiar secrets de Production → Preview |
| Usar Preview scope para todos os Previews (incl. `staging.fortegb.com`) | Inventar nomes diferentes por superfície |
| Manter `.env` / `.env.local` fora do git | Tratar Development Vercel como ambiente lógico obrigatório |
| | Colocar credenciais prod no `.env` local por default |

## Relação com inventário

Lista de nomes: [`env-vars.md`](./env-vars.md). Este arquivo só diz **em qual superfície** cada valor deve viver.

## Relação

- [`env-vars.md`](./env-vars.md) (D-041) · [`environments.md`](./environments.md) · [`secrets-access.md`](./secrets-access.md) (D-043) · [`env-example.md`](./env-example.md) (D-044) · Ambientes
