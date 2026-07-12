# Dev local — toolchain (D-049 / #170)

> **Inventário, não bootstrap.** Este arquivo lista as ferramentas exigidas
> e como a única com risco real de drift (Node) é fixada. Instalação e
> passo a passo de bootstrap → #171. Runbook Supabase local → D-032 /
> [`supabase-local.md`](./supabase-local.md).

## Lista (exatamente quatro)

| Ferramenta | Propósito | Versão fixada? |
|------------|-----------|-----------------|
| **Node.js** | runtime da app (Nuxt/Nitro) | **Sim** — `.nvmrc` + `engines` (`package.json`) |
| **Docker ou OrbStack** | stack Supabase local (D-032; OrbStack preferido no macOS) | Não |
| **Supabase CLI** | migrações + stack local (D-031) | Não |
| **ngrok** | túnel **opcional** para testar webhook inbound real localmente (D-040) | Não |

## Node — pin duplo

- **`.nvmrc`** na raiz: `nvm use` seleciona a versão certa no dia a dia.
- **`engines`** em `package.json`: rede de segurança grátis — `npm install`
  avisa se a versão não bate, mesmo que `nvm use` tenha sido esquecido.
- Nenhum dos dois substitui o outro; ambos ficam.

## Por que sem pin nas outras três

Docker/OrbStack, Supabase CLI e ngrok são ferramentas CLI invocadas
diretamente por humano, com auto-atualização própria. Fixar uma versão
aqui seria uma referência que fica desatualizada, sem mecanismo grátis
(como `engines`) para detectar drift — "latest stable" já é o padrão são.

## ngrok — opcional, só para túnel

Dev local usa **mock por padrão** (D-037/D-040) — a maioria das sessões
nunca precisa de túnel algum. ngrok só entra quando alguém quer testar
deliberadamente que um webhook real de um vendor chega e é tratado
corretamente pelo código local, antes de subir para staging.

## Ver também

- D-030 — Supabase por ambiente
- D-031 — Migrações Supabase CLI
- D-032 — Runbook Supabase local (motor Docker/OrbStack)
- D-040 — Callbacks/webhooks (túnel opcional)
