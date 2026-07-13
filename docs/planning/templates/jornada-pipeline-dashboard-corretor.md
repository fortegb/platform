# Jornada: pipeline e dashboard do corretor (D-064 / #191)

> Oitava leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Define `registro.status` pela primeira vez — nenhuma decisão fechada
> jamais o enumerou. Implementação real → Execução (#86, #90).

## `registro.status` — enum definido nesta leaf

```
registrado → negociando → fechado_ganho
                        → fechado_perdido
```

**Não** os 7 estágios do stub pré-arquitetura (`new`, `contacted`,
`visit_scheduled`, `visit_completed`, `negotiating`, `closed_won`,
`closed_lost`) — dois deles duplicavam `visit.status` (D-053).

## Por que não duplicar estado de visita

| Onde vive | O que rastreia |
|---|---|
| `visit.status` (D-053) | Ciclo de vida da visita: `pending_verification → verified → access_provisioned → completed / cancelled / declined` |
| `registro.status` (D-064, esta leaf) | Ciclo de vida do negócio: `registrado → negociando → fechado_ganho / fechado_perdido` |

Progresso de visita (agendada? realizada?) é **lido via join** no(s)
registro(s) de `visit` ligado(s) ao cliente/casa — nunca guardado como uma
segunda cópia em `registro`. Manter os dois em sincronia manual seria o
mesmo risco de dessincronização que #188 (status `cancelled` isolado de
`declined`) e #190 (dedup por CPF, não telefone) já corrigiram nesta
sessão.

## "Contatado" vira `historico`, não estágio

Um toque de contato é um evento a registrar (D-020 já tem `historico`
append-only para isso) — não uma transição de estágio formal. Evita a
pergunta "contato reseta o estágio ou só um deles conta?".

## HubSpot pode ser mais rico

D-020 já estabeleceu Supabase como autoridade de status comissionável e
HubSpot como espelho a jusante. Nada aqui impede o HubSpot de mostrar mais
estágios (visita agendada, contatado, etc.) para o fluxo de trabalho do
corretor — é escolha de exibição do vendor, não muda o que o Supabase
guarda como verdade.

## Relação

[`decisions.md`](../decisions.md) D-064 · `crm-source-of-truth` (D-020,
não modificada — enum estava em aberto, agora completo) ·
`visit-identity-verification` (D-053, consumida via join) · `rbac-role-model`
(D-055, escopo por corretor + RLS) · `openspec/specs/journey-corretor-pipeline/`
(capability) · implementação → #86, #90 · fora de escopo → config de
pipeline no HubSpot (vendor), visão de staff sobre pipeline de corretor
(#193, se necessário)
