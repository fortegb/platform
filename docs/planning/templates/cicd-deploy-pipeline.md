# CI/CD — pipeline de deploy branch→Vercel (D-046 / #167)

> **Decisão, não provisionamento.** Este arquivo documenta o contrato. Criar
> `origin/staging` e configurar branch protection no GitHub são ações de
> Execução (#42/#46) — ver `roteiro.md` (G2 gateia Execução até Definição
> fechar).

## Gatilho de deploy

Integração git nativa da Vercel (push-to-deploy) é o pipeline — já fixada em
D-027 (Production ← `main`, Preview ← `staging`/`feat/*`/`fix/*`). Sem GitHub
Actions custom agora. Hooks de build custom podem ser adicionados depois, se
surgir necessidade concreta (não é uma porta fechada).

## Gate de merge

| Branch | Exige deploy Vercel com sucesso antes do merge? |
|--------|--------------------------------------------------|
| `main` | **Sim** |
| `staging` | Não — seu papel é integração/validação (D-045), não gatekeeping |

## Rollback

Rollback nativo do dashboard Vercel (redeploy de um deployment anterior bem
sucedido). Sem procedimento custom — não é necessário na escala atual
(solo/família, zero-ops, D-018).

## Notificações

E-mails default de falha de deploy da Vercel bastam. Sem integração custom
(Telegram/Slack) para status de deploy.

## `origin/staging` — timing de criação

Decisão travada agora: branch long-lived, criada a partir de `main` (ver
`environments.md` → Branches → ambientes). **Criação real adiada para o
bootstrap de Execução** (#42/#46) — não é ação deste leaf de Definição.

**Gap temporário:** enquanto `origin/staging` não existir, leaves de
Definição que fecharem fazem merge `feat/*`→`main` direto, mesmo com
`.rbo/lifecycle.yml` presente — o mesmo padrão usado para fechar o próprio
#166 (que introduziu o arquivo). `rbo-stage-change` falha de propósito nesse
período (fail-closed, D-045); isso não é um bug a corrigir agora.

## Ver também

- D-026 — mapeamento branch→ambiente
- D-027 — topologia Vercel
- D-029 — domínios por ambiente
- D-045 — stage vs close + `.rbo/lifecycle.yml`
