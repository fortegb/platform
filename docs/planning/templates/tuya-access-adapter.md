# Tuya — adapter de acesso, mecanismo e modo de falha (D-052 / #181)

> Mecanismo/viabilidade do acesso via fechadura Tuya. **Docs only.** Jornada completa de visitas (agendada/instantânea, identidade, booking) → #180. Spike real da Tuya Cloud API + implementação → #77/#135 (Execução).

## Device

| Item | Valor |
|------|-------|
| Modelo | Intelar X2 (fechadura Tuya, WiFi) |
| Estado | Comprado e instalado — numa casa **atualmente à venda** |
| Capacidade confirmada (app consumidor) | Senha temporária com janela de horário (dia/hora) — via app Tuya |
| Acesso via Tuya Cloud API | **Não verificado** — depende de spike manual (Execução, #77/#135) |

## Adapter seam (D-017)

Interface estável, um módulo por vendor — o resto da jornada (identidade,
booking, CRM/HubSpot, WhatsApp) chama só esta interface e nunca sabe qual
implementação está ativa:

```
provisionAccess(visit) → credential
markUsed(credential)
revoke(credential)
```

| Implementação | Papel | Quando |
|----------------|-------|--------|
| `local-pool` | **Primária (v2)** — atribui um código de um pool pré-provisionado por casa, escrito na fechadura via app, sem chamada de API em tempo real no caminho crítico | Default até `tuya-live` ser validado |
| `tuya-live` | Upgrade futuro opcional — cria/revoga senha real via Tuya Cloud API | Só após spike confirmar viabilidade **e** volume de visitas justificar automação |

Troca de implementação = configuração (mesma convenção `INTEGRATION_TIER_<VENDOR>`
de D-041), não reescrita de jornada.

## Fallback / modo de falha

Aplica-se ao `local-pool` e continua válido mesmo depois de `tuya-live` estar
ativo (nenhuma dependência de nuvem é 100% confiável):

1. **Código de emergência estático por casa** — local, no keypad, sem
   dependência de rede/nuvem. Relayed por staff via WhatsApp/telefone.
2. **Reagendamento** — se staff não conseguir ser contatado a tempo.
3. **Nunca** deslocamento físico de staff como camada desenhada (só exceção
   genuína, fora do fluxo).

### Detecção de falha

Checagem **síncrona** no momento da emissão — erro, timeout ou device
reportado offline dispara alerta a staff via WhatsApp **imediatamente**,
antes de o visitante saber que o código está pronto. Nunca depende do
visitante reportar a falha.

- **Fluxo agendado:** janela de confirmação mais longa (a definir em build).
- **Fluxo instantâneo (QR):** timeout muito mais curto — visitante já está
  fisicamente à porta.

### Ciclo de vida do código de emergência

- **Escopo:** um código por casa — nunca um código único partilhado no
  portfólio.
- **Rotação:** mensal (backstop) **+** imediata após qualquer uso real.
- **Armazenamento:** tabela Supabase restrita (liga-se à epic LGPD #126–129).
- **Auditoria:** todo gatilho de fallback gera um log (casa, timestamp, staff
  que relayed o código).
- **Manutenção v1:** Supabase Studio (sem UI bespoke) — se a escala crescer a
  ponto de justificar uma tela própria, essa decisão pertence a #184 (admin),
  não a este leaf.

## Safe-target (conflito com D-039 resolvido)

A fechadura instalada é **prod-only** — nunca pode ser o default de
`safe-target` em staging/Previews (D-037). Um segundo device dedicado a
teste é **pré-requisito** antes de qualquer teste automatizado do fluxo de
escrita de senha (#77/#135):

- **Spec agora, provisiona depois** (mesmo padrão de D-039): modelo exato
  TBD, mas deve expor o mesmo Standard Instruction Set / DP de senha
  temporária do X2, para ser um substituto de teste válido.

## Relação

[`decisions.md`](../decisions.md) D-052 · [`open-questions.md`](../open-questions.md) Q-006 ·
[`integrations-tiers.md`](./integrations-tiers.md) (D-037) ·
[`integrations-safe-targets.md`](./integrations-safe-targets.md) (D-039) ·
adapter seam → D-017
