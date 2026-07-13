# Jornada: operação diária do staff (D-065 / #193)

> Nona leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Puramente consumidora — nenhuma decisão fechada reaberta. Implementação
> real → Execução (#86, #90, #81).

## Conteúdo da tela

```
/staff (landing)
    → Visitas do dia — TODAS as casas/corretores (staff-wide, D-055)
    → Clientes recentes — TODAS as fontes (direto #185, corretor #190)
    → Entrada manual de lead (telefone/WhatsApp)
        → nível Contato (só WhatsApp, CPF opcional) — fonte: staff-manual
        → dedup por WhatsApp reaproveita reconciliação de D-020
    → Resumo de pendências (link, não reimplementa)
        → N corretores/casas aguardando aprovação → /staff/corretores (#189)
        → N exceções de verificação pendentes → /staff/visitas/excecoes (#192)
```

## Por que staff-wide, não escopado (diferente de #191)

#191 escopa o pipeline do corretor a `registro.corretor_id` porque um
corretor só deve ver seus próprios clientes atribuídos. Staff tem papel de
supervisão operacional do negócio inteiro — consequência direta da
hierarquia RBAC de D-055 (staff/admin têm visão mais ampla que corretor),
não uma decisão de acesso nova.

## Por que entrada manual é nível Contato, não Cliente (diferente de #190)

| | #190 (corretor registra) | #193 (staff registra manualmente) |
|---|---|---|
| Nível | `Cliente` (CPF obrigatório) | `Contato` (só WhatsApp) |
| Por quê | Proteger atribuição de comissão a um corretor | Sem corretor envolvido (`corretor_id` nulo, registro direto) — nada a proteger |

Exigir CPF aqui adicionaria atrito sem o benefício correspondente que
justifica essa exigência em #190.

## Resumo de pendências — só link, nunca reimplementação

A tela mostra contagens das duas filas já existentes (#189, #192) com link
direto — nunca duplica a lógica de aprovar/rejeitar de nenhuma delas.
Mantém cada capability como dona única do próprio estado.

## Relação

[`decisions.md`](../decisions.md) D-065 · `crm-source-of-truth` (D-020,
não modificada — `fonte: staff-manual` é valor concreto para fonte já
nomeada genericamente) · `visit-identity-verification` (D-053, consumida) ·
`rbac-role-model` (D-055, escopo staff-wide) ·
`openspec/specs/journey-staff-daily-operations/` (capability) ·
implementação → #86, #90, #81 · leaves relacionadas → #189, #191, #192
