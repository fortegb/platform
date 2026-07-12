# Jornada: fila de exceção de verificação de identidade (D-060 / #192)

> Quarta leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Primeira leaf **greenfield** de Passo 5 — nenhum stub pré-arquitetura
> existia para corrigir; #185/#186/#187 corrigiam código existente, esta
> constrói do zero. Implementação real → Execução (#80, #86, #50).

## Fluxo

```
verification_attempt entra em pending (D-053, automático — #186/#187)
    → Telegram alerta staff (link para a fila, não ação inline)
    → staff acessa /staff/visitas/excecoes
    → fila ordenada: instantâneo/QR primeiro, agendado depois
      (só instantâneo pode ter alguém esperando na porta)
    → staff abre item pendente → selfie + documento lado a lado
    → APROVAR → verification_attempt(method: staff-review, outcome: approved)
              → visit.status = verified → provisionAccess (mesmo call site
                de #186/#187, sem caminho novo)
    → REJEITAR → visit.status = declined → WhatsApp ao visitante explicando
                 (gap real de D-053 fechado aqui — antes, silêncio)
```

**Papel:** `Staff`. Consome D-052 (adapter), D-053 (modelo de verificação,
não alterado), D-054 (mensageria), D-055 (RBAC), D-056 (build-vs-buy —
esta tela é o exemplo canônico de UI custom justificada, critério 2).

## Por que esta leaf não corrige nada — só constrói

Diferente de #185/#186/#187, não havia código pré-arquitetura para esta
tela. `/staff/*` não existe; não há middleware equivalente a
`middleware/realtor-auth.ts` do lado staff. Esta é a primeira leaf de
Passo 5 puramente aditiva.

## Decisões desta leaf

| Decisão | Resolução |
|---|---|
| Ordem da fila | Instantâneo/QR primeiro, agendado depois (urgência por tipo de fluxo) |
| Rejeição | Notifica visitante via WhatsApp (D-053 nunca especificou — lacuna fechada, não reabertura) |
| Aprovação | Reaproveita `provisionAccess` de D-052 exatamente — sem caminho novo |
| Notificação a staff | Telegram (não WhatsApp) — mensagem interna, sem parte externa, cai do lado Telegram de D-054 |
| Split WhatsApp/Telegram | Reconsiderado (WhatsApp já é obrigatório para clientes — vale manter uma segunda ferramenta?) e **mantido** — ver abaixo |

## Split WhatsApp/Telegram — reconsiderado e mantido

Questão levantada durante a exploração: já que WhatsApp é obrigatório para
comunicação externa de qualquer forma, vale manter o Telegram só para uso
interno? Avaliado e mantido porque WhatsApp Business API exige aprovação de
template pela Meta **por tipo de mensagem**, não uma vez só — e mensagens
internas (staff/sistema) são a categoria com mais chance de crescer com o
tempo (esta leaf já soma uma; #193 e leaves futuras provavelmente somam
mais). Colapsar tudo para WhatsApp significaria repetir esse atrito de
aprovação a cada novo tipo de alerta interno; Telegram nunca tem esse
atrito. D-054 permanece sem reabertura.

## Fronteira com leaves vizinhas

- **#193** (operação diária do staff) — pode assumir que esta fila já tem
  tela própria; não precisa reconstruí-la.
- **#194** (gestão de acesso Tuya) — Supabase Studio, sem UI custom (D-052/
  D-056); tela separada.
- **#195** (config de plataforma, admin-only) — namespace `/staff/*`
  compartilhado, mas escopo admin, não staff.

## Relação

[`decisions.md`](../decisions.md) D-060 · `tuya-access` (D-052) ·
`visit-identity-verification` (D-053, não alterada) ·
`messaging-channel-policy` (D-054, não alterada — split reconsiderado e
confirmado) · `rbac-role-model` (D-055) · `platform-architecture` (D-056,
critério 2 do teste de três partes) ·
`openspec/specs/journey-staff-verification-review/` (capability) ·
implementação → #80, #86, #50 · leaves relacionadas → #186, #187, #193
