# Visitas — modelo de dados + verificação de identidade (D-053 / #180)

> Mecanismo/viabilidade da verificação de identidade + modelo de dados de visitas. **Docs only.** Jornada completa (telas, fluxos) → Passo 5 / #176. Tuning de implementação (biblioteca, threshold, UI da fila) → #80 (Execução). Mecanismo de acesso físico (Tuya) → `tuya-access-adapter.md` (D-052).

## Mecanismo de verificação (resolve Q-005)

| Mecanismo | Papel | Fluxos |
|-----------|-------|--------|
| `client-match` | **Primário** — biblioteca frontend compara selfie a documento, retorna confiança | Agendado **e** instantâneo — sem split por fluxo |
| `staff-review` | **Fila de exceção compartilhada** — staff verifica manualmente | Acionada automaticamente (confiança baixa) **ou** pelo visitante via WhatsApp direto a staff |

Sem split de mecanismo por tipo de fluxo — `client-match` precisa existir para o
fluxo instantâneo de qualquer forma (visitante não pode esperar staff ao vivo),
e reusá-lo no agendado evita duplicar modelo/pipeline.

## Fluxo instantâneo em falha

- **Sem espera síncrona ao vivo** — sem polling/timer bloqueante no fluxo.
- Recusa automática imediata **+** link/número de WhatsApp para contato direto
  com staff (escape hatch, não obrigação).
- Visitante decide se espera resposta — sistema não o mantém em estado
  bloqueante.
- Espelha o fallback de Tuya (D-052), invertido: lá staff contata visitante;
  aqui visitante contata staff.

### Resolução via WhatsApp (= `staff-review` normal)

1. Staff pede selfie + RG/CNH por WhatsApp.
2. Staff verifica manualmente e aprova/rejeita.
3. Aprovação registrada como `verification_attempt` (`method: staff-review`,
   `outcome: approved`) — **não** verbal apenas.
4. **Só então** roda o `provisionAccess()` normal do adapter Tuya.
5. **Nunca** um código ad hoc (nem `local-pool`, nem código de emergência de
   D-052) como atalho contornando verificação. Acesso só sai por visita
   verificada e registrada.

## Reuso em visitas recorrentes

- Resultado de verificação vive no **`Cliente`** (`identity_verified_at`),
  não por visita — reaproveita D-020 (CPF como autoridade de identidade).
- **Janela de validade: 12 meses.**
- Dentro da janela: nova visita pula verificação inteiramente.
- Fora da janela: roda `client-match` → `staff-review` se necessário; timestamp
  renovado na aprovação.

## Retenção (LGPD) — diferenciada por artefato

| Artefato | Aprovado | Rejeitado / exceção |
|----------|----------|----------------------|
| Selfie | Apaga imediatamente | Retém 30 dias (auditoria) |
| Documento (RG/CNH) | Retém enquanto a verificação estiver **ativa** (mesma janela de 12 meses do `Cliente`); apaga e substitui na renovação/expiração | Retém 30 dias (auditoria) |

Retenção do documento cobre a necessidade de identificar o visitante em caso
de danos/incidentes durante qualquer visita coberta por essa verificação —
não é minimização pura, é minimização com um propósito ligado e expirável.
**Deve constar da política de privacidade** (`#61`/`#96` — copy, não desta leaf).

## Modelo de dados

Substitui a tabela `visits` legada e denormalizada
(`docs/database-schema.sql`) por três entidades:

- **`Cliente`** (D-020) — ganha `identity_verified_at`.
- **`verification_attempt`** (nova) — uma por visita, exceto quando reusada
  via `Cliente`; guarda refs de selfie/documento, confiança, outcome, method.
- **`visit`** (substitui `visits`) — progressão de status:

  ```
  pending_verification → verified → access_provisioned → completed
                                                          ↘ declined
  ```

### Sequenciamento (hard gate)

`provisionAccess` (adapter Tuya, D-052) só é chamado depois de
`visit.status = verified` — verificação de identidade nunca roda em paralelo
com, nem é contornável pelo, acesso físico.

## Relação

[`decisions.md`](../decisions.md) D-053 · [`open-questions.md`](../open-questions.md) Q-005 ·
[`tuya-access-adapter.md`](./tuya-access-adapter.md) (D-052, adapter de acesso) ·
Cliente/CPF → D-020 · implementação → #80 (Execução) · jornada → Passo 5 / #176
