# Jornada: onboarding do corretor (D-062 / #189)

> Sexta leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Corrige onboarding de conta contra D-055 e incorpora associação por casa
> (§4.2, sem leaf própria antes desta). Implementação real → Execução
> (#86, #50).

## Fluxo — conta

```
Cadastro (e-mail/social) → aceitar termos → perfil
    (CRECI opcional, WhatsApp obrigatório — D-054)
    → role = corretor, corretor.status = pending_approval
    → aparece em /staff/corretores (sem notificação push)
    → staff APROVA → status = approved → portal ativo
    → staff REJEITA → status = rejected → WhatsApp ao corretor (D-054)
```

## Fluxo — associação por casa

```
Corretor (já aprovado) reclama uma casa
    → corretor_casa criado (status: pending)
    → minuta (contrato não-assinado, termos da casa) visível
      IMEDIATAMENTE — página do corretor E item de revisão de staff
    → assinatura acontece FORA da plataforma (staff + corretor coordenam)
    → staff faz upload do PDF assinado (bucket privado D-016/D-030)
      → upload = aprovação, uma única ação
      → corretor_casa.status = approved
    → OU staff REJEITA (sem upload necessário) → WhatsApp ao corretor
    → aprovado: contrato assinado visível para os dois lados;
      registro.corretor_id agora válido só para essa casa (crm-source-of-truth, D-062)
```

**Papéis:** `Corretor` + `Staff` — um fluxo, dois papéis (per o próprio issue).

## Por que sem notificação push (diferente de #192)

#192 justificava Telegram porque um visitante podia estar fisicamente
esperando na porta. Nada aqui tem essa urgência — nem uma aplicação de
conta nem uma solicitação de casa exige resposta imediata. Staff descobre
pendências checando `/staff/corretores`, não sendo avisado. Não é uma
versão menor do padrão de #192 — é a ausência corretamente escopada dele.

## Por que staff faz o upload, não o corretor

Mais seguro — staff controla o que vira o registro oficial em vez de
confiar num arquivo enviado pelo corretor sem verificação prévia. Como
staff já está com o documento assinado em mãos ao fazer upload, não há
razão para exigir uma segunda confirmação de "aprovar" — o upload já É a
decisão.

## Reabertura de `crm-source-of-truth`

O requirement "Per-house registration and audit" nunca condicionou
`registro.corretor_id` a aprovação por casa. Sem essa amarra, todo o
mecanismo desta leaf seria decorativo — corretor poderia registrar cliente
em qualquer casa, aprovado ou não, independente do que `/staff/corretores`
mostrasse. Corrigido: `registro.corretor_id` só é válido com um
`corretor_casa` `approved` para aquele par corretor×casa.

## Relação

[`decisions.md`](../decisions.md) D-062 · `rbac-role-model` (D-055, não
modificada) · `messaging-channel-policy` (D-054, WhatsApp para corretor) ·
`crm-source-of-truth` (D-020, **reaberta**) · bucket privado (D-016/D-030)
· `openspec/specs/journey-corretor-onboarding/` (capability) ·
implementação → #86, #50 · fora de escopo → Gov.br automatizado (já
adiado), #190 (registro de cliente), #191 (pipeline)
