# Mensageria — WhatsApp/Telegram: provider + gatilhos + consentimento (D-054 / #182)

> Mecanismo/viabilidade da mensageria. **Docs only.** Enumeração exata de gatilhos (qual evento dispara qual mensagem) → Passo 5 / #176. Escolha de vendor + implementação → #75 (Execução).

## Split por direção (não por custo)

| Direção | Canal | Por quê |
|---------|-------|---------|
| **Externa** (visitante, cliente, **corretor** — qualquer parte fora da ForteGB) | **WhatsApp**, sempre | Forçar Telegram numa parte externa (instalar app, criar conta) não é aceitável — WhatsApp é o padrão de facto no Brasil |
| **Interna** (staff/sistema, sem parte externa envolvida) | **Telegram** | Justificado tecnicamente, não por preferência genérica: sem processo de aprovação de template, gratuito independente de volume, setup trivial (BotFather, minutos) |

Corrige `D-017` ("Telegram-first" genérico) para o escopo exato onde isso ainda
se aplica — nunca em mensagem que toca uma parte externa.

## Consentimento (LGPD)

| Categoria | Base legal | Mecanismo |
|-----------|------------|-----------|
| **Transacional/operacional** (confirmação de visita, código de acesso, escalonamento a staff, lembretes) | Execução de contrato / interesse legítimo | Implícito — campo WhatsApp obrigatório do `Cliente` (D-020) + a ação específica tomada. Sem checkbox extra. |
| **Marketing/promocional** (anúncios de imóveis, nutrição) | Consentimento explícito | Opt-in separado, off por padrão. Nomeado agora, **não construído** — mensageria promocional é v2+ (D-018). |

## Provider — spec agora, escolhe depois

Mesmo padrão do segundo lock de teste em `D-052`: não escolhido nesta leaf.

**Critérios de seleção** (para #75 avaliar):
- Suporte a mensagens transacionais via template.
- Preço razoável para o mercado BR.
- Compatível com runtime serverless (sem processo persistente).

**Candidatos conhecidos:** WhatsApp Business API (direto, Meta) vs. wrapper
Twilio (simplifica onboarding/templates, adiciona camada de vendor + markup).
Escolha real + conta viva → #75.

## Mecanismo de envio

Todo envio (WhatsApp ou Telegram) roteado via **QStash** (`D-017`) — nunca
chamada síncrona dentro do handler da requisição que dispara a mensagem.
Reaproveita o padrão de retry/delay já decidido.

## Adapter

Mensageria é mais um vendor atrás do adapter seam já existente (`D-017`) —
mesma forma do Tuya (`D-052`), não uma decisão nova.

## Relação

[`decisions.md`](../decisions.md) D-054 ·
[`tuya-access-adapter.md`](./tuya-access-adapter.md) (D-052, mesmo padrão de adapter) ·
Cliente/WhatsApp obrigatório → D-020 · implementação → #75 (Execução) ·
jornada/gatilhos → Passo 5 / #176
