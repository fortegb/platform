# Fluxo do Design System — Passo 6

> Runbook do epic [#67 — Brand & design system](https://github.com/fortegb/platform/issues/67), Etapa **6 Design** do [`roteiro.md`](./roteiro.md). Registrado em sessão de planejamento (2026-07-14). Complementa [`workflow.md`](./workflow.md) (convenções gerais) e [`screen-map.md`](./screen-map.md) (guia de todas as telas).

---

## Ordem

```
1. Fundação de tokens web (#68) — deriva do Home existente, não bloqueia em brand assets (#2)
     ↓ (paralelo: #39 Logo, #40 Brand guide, #41 Hero images — confirmam/ajustam depois)
2. Leaves de design, uma por jornada, na ordem do screen-map:
   Visitante/cliente → Corretor → Staff → Admin
     ↓
3. Varredura de tokenização, uma por seção de persona (4 no total)
     ↓
4. Gerar design system (#70) — roda uma única vez, ao final
```

**Prime uma vez** com `rbo-ui-standards` antes da primeira leaf. Cada leaf de design passa por quantos ciclos de design-check-adjust forem necessários — duração não é o critério de tamanho de uma leaf, coesão (uma jornada) é.

---

## Por que #68 não espera o brand guide

Os 3 de 4 componentes de hero (`HeroSplit`, `HeroSlate`, `HeroAzul`) já são estruturalmente idênticos — mesmo grid, mesmos botões, mudando só o gradiente. Isso permite derivar a base de tokens web (cores, tipografia, espaçamento, botões) diretamente do que já está implementado em Home, sem esperar #40 (brand guide formal). #68 roda primeiro; #39/#40/#41 (Brand assets, epic #2) seguem em paralelo e **confirmam/ajustam** os tokens depois, não os bloqueiam.

**Consolidação do Hero** (parte do escopo de #68, ainda não implementada): `HeroSplit`/`HeroSlate`/`HeroAzul` viram um componente único com prop de variante; `HeroClassic` permanece separado (único com layout genuinely diferente — full-bleed vs. split). A escolha do hero de produção segue diferida ao lançamento (D-021, Q-010) — a consolidação é limpeza de código, não resolve essa decisão.

---

## Granularidade das leaves de design

Uma leaf por **jornada**, não por seção de persona inteira (grande demais para um branch/change coeso) e não por tela individual (overhead de processo demais — sub-issues nativas do GitHub exigiriam branch + OpenSpec change por tela). A granularidade espelha as jornadas já fechadas no Passo 5 (#185–195).

| # | Leaf | Rotas | Jornada (Passo 5) |
|---|------|-------|--------------------|
| [#197](https://github.com/fortegb/platform/issues/197) | Descoberta do site | `/`, `/classico`, `/slate`, `/azul`, `/portfolio`, `/portfolio/[slug]`, `/blog`, `/blog/[slug]`, `/sobre`, `/contato`, `/privacidade`, `/termos` | #185, D-057 |
| [#198](https://github.com/fortegb/platform/issues/198) | Agendar visita | `/visita/agendar/[houseId]` | #186, D-058 |
| [#199](https://github.com/fortegb/platform/issues/199) | Visita QR | `/visita/qr/[code]` | #187, D-059 |
| [#200](https://github.com/fortegb/platform/issues/200) | Gerenciar visita | `/visita/gerenciar/[token]`, aviso condomínio | #188, D-061 |
| [#201](https://github.com/fortegb/platform/issues/201) | Onboarding do corretor | `/login`, `/corretor/onboarding/*`, `/corretor/casas/[id]/contrato` | #189, D-062 |
| [#202](https://github.com/fortegb/platform/issues/202) | Registro de cliente | `/corretor/clientes`, `/corretor/clientes/novo` | #190, D-063 |
| [#203](https://github.com/fortegb/platform/issues/203) | Painel e pipeline do corretor | `/corretor/dashboard`, `/corretor/casas` | #191, D-064 |
| [#204](https://github.com/fortegb/platform/issues/204) | Aprovação de corretor e casa | `/staff/corretores` | #189, D-062 (lado staff) |
| [#205](https://github.com/fortegb/platform/issues/205) | Fila de exceção de verificação | `/staff/visitas/excecoes` | #192, D-060 |
| [#206](https://github.com/fortegb/platform/issues/206) | Operação diária do staff | `/staff`, `/staff/visitas`, `/staff/clientes/novo` | #193, D-065 |
| [#207](https://github.com/fortegb/platform/issues/207) | Configuração de plataforma e papéis | `/staff/usuarios`, `/staff/integracoes`, `/staff/config` | #195, D-067 |

**Gap aberto:** `/staff/registros` (Registro de Cliente / histórico) está no `screen-map.md` sob Admin, ligado ao epic #86, mas sem jornada de Passo 5 que a tenha validado. Fica registrada em #207 para resolução durante o design dessa leaf — ver playbook abaixo.

**Não viram sub-issues:** telas individuais dentro de cada leaf são checklist/nota, não issues próprias — mesmo padrão dos checklists de sub-tarefa em `phases.md`.

---

## Baseline: existente vs. novo

`screen-map.md` já marca cada rota com **Estado**: `simulado` (UI existe, sem back-end) ou `novo` (a construir). Dentro de cada leaf, a ordem natural é revisar/alinhar as telas `simulado` ao design system primeiro, depois desenhar as `novo` do zero — não precisa de tracking novo, o campo já existe no mapa.

---

## Tokenização — varredura por seção de persona

4 varreduras (não por tela, não uma única no final) — cada uma roda depois que **todas** as leaves de design daquela seção fecharem, para pegar deriva de consistência visual dentro da seção sem misturar personas diferentes (ex.: hero público vs. tabela operacional de staff).

| # | Varredura | Depende de |
|---|-----------|------------|
| [#208](https://github.com/fortegb/platform/issues/208) | Visitante/cliente | #197–200 |
| [#209](https://github.com/fortegb/platform/issues/209) | Corretor | #201–203 |
| [#210](https://github.com/fortegb/platform/issues/210) | Staff | #204–206 |
| [#211](https://github.com/fortegb/platform/issues/211) | Admin | #207 |

Chore leve — sem OpenSpec pesado (`workflow.md`, regra 4).

---

## Fechamento: gerar design system (#70)

Roda **uma única vez**, só depois que as 4 varreduras acima fecharem — nunca antes, para não gerar contra um alvo em movimento. Executa `rbo-ui-design-system`: documentação, extração de componentes, pasta compartilhável, style guide vivo.

Inclui também um **guia leve de voz e tom** — como a ForteGB "soa" por escrito (confiança, transparência, proximidade — ver `AGENTS.md` §2.1) — para orientar conteúdo escrito em canais sem UI visual própria. Não inclui o desenho desses fluxos em si.

---

## Fora do escopo: jornadas conversacionais (WhatsApp/Telegram)

Fluxos como #142 (bot WhatsApp de registro de cliente), #75 (confirmações WhatsApp) e #141 (follow-up pós-visita) não são UI — a plataforma de mensageria (Meta/Telegram) controla a renderização, só o texto/sequência de interação é nosso. Não têm tokens, não entram no loop de design/tokenização acima. Ficam para os epics de Execução (Etapa 8) que já os possuem — #86, #72 — e seguem apenas o guia de voz e tom gerado por #70 quando forem construídos.

---

## Playbook: tela faltante descoberta durante o design

Já aconteceu uma vez no Passo 5 (exploração de #190 → gap do CPF do corretor → issue separada #196, reabrindo D-062). Esperado que aconteça de novo ao desenhar pixels em cima de jornadas que só descreviam comportamento.

1. **Não trava a leaf atual** — termina o que já está em andamento.
2. **Abre issue nova** via `rbo-create-issue`, presa ao epic certo (#67 se for questão de design system; #56/#86/etc. se for gap de Execução).
3. **Atualiza `screen-map.md`** com a linha nova.
4. **Registra se reabre alguma decisão** (`decisions.md`) — só se for revisão de algo já fechado.
5. **Decide se é urgente** (entra na leaf seguinte) **ou backlog** (não bloqueia o Passo 6 continuar) — precedente: #196 rodou depois de #190 fechar, não antes.

---

## Ligação com `phases.md`

Epic #67 (Brand & design system) — ver tabela **Epic | Doc / runbook** em [`phases.md`](./phases.md).
