# Jornada: registro de cliente e proteção de comissão (D-063 / #190)

> Sétima leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Corrige um bug real (condição de corrida) no stub pré-arquitetura, não só
> uma lacuna de conteúdo. Implementação real → Execução (#86, #90).

## Fluxo

```
Corretor (com corretor_casa approved para a casa) → registra cliente
    → nome + CPF (obrigatório) + telefone + casa
    → sistema resolve/cria cliente por CPF (nível Cliente, não Contato)
    → INSERT em registro(cliente_id, casa_id) com constraint de unicidade
        → sucesso: registro criado, fonte = portal-corretor, sync HubSpot
        → constraint violada: "já registrado" (por você ou outro corretor)
          — nunca um erro genérico, nunca uma segunda linha criada
    → mesmo corretor reenvia o mesmo par: idempotente, mostra status atual
```

## Bug corrigido: condição de corrida

O stub fazia `SELECT` (existe duplicata?) e depois `INSERT` — dois passos
separados, não atômicos. Dois corretores submetendo quase ao mesmo tempo
podiam **ambos** passar pela checagem e **ambos** inserir, quebrando a
garantia "primeiro-registro-ganha" que é a razão de existir desta jornada.
Corrigido: constraint de unicidade no banco em `registro(cliente_id,
casa_id)` — a segunda inserção concorrente falha na constraint, não numa
checagem de aplicação que nunca pode ser 100% livre de corrida.

## Por que CPF obrigatório (vs. Contato só-telefone de #185)

| | #185 (descoberta, visitante) | #190 (registro por corretor) |
|---|---|---|
| Nível | `Contato` (CPF-less) | `Cliente` (CPF obrigatório) |
| Compromisso | Baixo — clique em CTA, sem intenção confirmada | Alto — corretor confirma um lead qualificado |
| Chave de dedup | WhatsApp (fraca, pode mudar) | CPF (autoridade de dedup, D-020) |

Aceitar telefone-só aqui enfraqueceria exatamente a garantia que esta
jornada existe para proteger — comissão depende de saber, com certeza, que
é a mesma pessoa.

## Relação

[`decisions.md`](../decisions.md) D-063 · `crm-source-of-truth` (D-020,
não modificada — só consumida corretamente pela primeira vez) ·
`journey-corretor-onboarding` (D-062, amarra `corretor_casa` consumida) ·
`openspec/specs/journey-corretor-client-registration/` (capability) ·
implementação → #86, #90 · fora de escopo → #185 (leads diretos, já
fechada), reatribuição de comissão (staff/admin, sem leaf própria)
