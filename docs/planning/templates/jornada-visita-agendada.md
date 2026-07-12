# Jornada: visita agendada (D-058 / #186)

> Segunda leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Corrige a jornada pré-arquitetura contra D-052 (Tuya) e D-053
> (visitas/identidade). Implementação real (rewrite do endpoint/adapter/UI)
> → Execução (#81, #80, #77/#135).

## Fluxo

```
Portfólio detalhe → Agendar visita
    → nome, WhatsApp, data/hora (≥1 dia de antecedência)
    → Cliente já verificado (últimos 12 meses)?
        SIM → pula verificação → confirmação
        NÃO → selfie + documento (client-match)
              → aprovado automaticamente → confirmação (senha via WhatsApp)
              → falhou / baixa confiança → fila staff-review (assíncrono)
                  → confirmação pendente ("confirmaremos por WhatsApp
                    antes da sua visita")
                  → staff aprova (#192) → mesmo provisionAccess da
                    aprovação automática
```

**Papel:** `Cliente`. Constrói sobre D-052 (adapter Tuya) e D-053 (modelo de
dados, `client-match`, `staff-review`, reuso de 12 meses).

## Correções feitas nesta leaf (vs. stub pré-arquitetura)

| Antes (stub) | Depois (D-058) |
|---|---|
| Grava na tabela legada `visits` | Modelo de três entidades D-053 (`Cliente`/`verification_attempt`/`visit`) |
| `programSmartLock()` chamado direto, falha é engolida (log + "success") | `provisionAccess(visit)` do adapter D-052, única chamada gated; falha aciona fallback (código de emergência + alerta staff), nunca sucesso falso |
| Confia em `verificationData.verified` enviado pelo cliente | `visit.status = verified` derivado e persistido no servidor |
| WhatsApp enviado de forma síncrona no handler | Enfileirado via QStash (D-054) |
| Sem checagem de reuso — verificação sempre roda | `Cliente.identity_verified_at` dentro de 12 meses pula verificação inteiramente |
| Falha de verificação = erro, sem fila | `staff-review` assíncrono — booking completa, fila resolve depois |

## Por que assíncrono (não síncrono como o fluxo instantâneo)

D-053 só especificou "sem espera síncrona" para o fluxo **instantâneo**
(visitante já está na porta). Visita agendada exige ≥1 dia de antecedência —
há folga real antes da visita. Fazer o visitante esperar uma resposta
síncrona da fila de exceção não tem justificativa quando staff tem horas/dias
para revisar antes do horário marcado.

## Retenção de selfie — considerada e mantida (D-053)

Cogitou-se reter a selfie indefinidamente para "simplificar o fluxo" durante
a exploração desta leaf. Não reduz complexidade real: a captura é idêntica
em ambos os casos — o split de retenção é só um delete pós-aprovação, não um
branch de fluxo. D-053 permanece sem reabertura: selfie efêmera (apaga na
aprovação), documento retido só durante a janela de 12 meses ativa.

## Fronteira com leaves vizinhas

- **#192** (fila de exceção de verificação) — dono da tela de staff-review
  (selfie vs. documento lado a lado, aprovar/rejeitar). Esta leaf só
  especifica a entrada na fila e que a resolução libera o `provisionAccess`.
- **#187** (visita instantânea via QR) — fluxo separado, mesmo mecanismo de
  verificação (D-053) mas sem espera assíncrona (justificado pela ausência
  de folga de tempo).

## Relação

[`decisions.md`](../decisions.md) D-058 · `tuya-access` (D-052, adapter
seam + fallback) · `visit-identity-verification` (D-053, modelo de dados +
reuso 12 meses) · `messaging-channel-policy` (D-054, QStash) ·
`openspec/specs/journey-scheduled-visit/` (capability) · implementação →
#81 (visitas end-to-end), #80 (verificação de identidade), #77/#135 (Tuya) ·
leaves relacionadas → #187, #192
