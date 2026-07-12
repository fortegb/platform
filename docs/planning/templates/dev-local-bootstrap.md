# Dev local — runbook de bootstrap (D-050 / #171)

> **Local apenas.** Staging/prod não estão aqui — provisionamento real
> desses ambientes é trabalho de Execução (#42/#43/#46), não desta
> Definição. Este runbook é documentação — nenhum comando foi corrido por
> este leaf.

## Passo a passo

1. **Clonar o repo.**
   ```bash
   git clone https://github.com/fortegb/platform.git
   cd platform
   ```

2. **Toolchain** — instalar as quatro ferramentas de
   [`dev-local-toolchain.md`](./dev-local-toolchain.md) (D-049): Node.js
   (via `.nvmrc`), Docker ou OrbStack, Supabase CLI, e ngrok (opcional, só
   se for testar webhook inbound real).
   ```bash
   nvm use
   npm install
   ```

3. **Supabase local** — seguir
   [`supabase-local.md`](./supabase-local.md) (D-032): motor Docker/OrbStack
   a correr, `supabase start`, Studio + chaves.

4. **Env vars** — copiar `.env.example` para `.env` (D-044); preencher
   valores locais conforme `docs/SETUP-CREDENTIALS.md`. `APP_ENV=local`
   por padrão.

5. **Rodar a app.**
   ```bash
   npm run dev
   ```

## Fora de escopo

- Bootstrap de `staging` / `prod` — Execução, #42/#43/#46.
- `supabase init` real / primeira migração — #43 (schema em build).
- Seed de dados — pacote descrito em D-033, implementação após #171/#43.

## Ver também

- D-049 — toolchain
- D-032 — Supabase local
- D-044 — `.env.example` + SETUP-CREDENTIALS
