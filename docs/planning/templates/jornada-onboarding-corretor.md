# Jornada: onboarding do corretor (D-062 / #189)

> Sexta leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Corrige onboarding de conta contra D-055 e incorpora associação por casa
> (§4.2, sem leaf própria antes desta). Implementação real → Execução
> (#86, #50).
>
> ✅ **CPF do corretor adicionado** ([#196](https://github.com/fortegb/platform/issues/196),
> D-068) — campo obrigatório no perfil, junto com WhatsApp. Lacuna
> encontrada durante a exploração de #190 (comissão exige CPF para
> pagamento a pessoa física), fechada como correção pontual a D-062.

## Fluxo — conta

```
Cadastro (e-mail/social) → aceitar termos → perfil
    (CRECI opcional, WhatsApp e CPF obrigatórios — D-054, D-068)
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

## CPF obrigatório (D-068 / #196)

Lacuna encontrada durante a exploração de #190: nenhuma leaf modelava como
o corretor é pago, mas pagamento a pessoa física no Brasil normalmente
exige CPF. Coletado no mesmo passo de perfil que já exige WhatsApp — sem
novo estado em `corretor.status`, sem mudança na fila de aprovação de
`/staff/corretores`; validação só de formato, mesmo rigor já aceito para
o CPF do cliente em D-063 (#190).

## Relação

[`decisions.md`](../decisions.md) D-062, D-068 · `rbac-role-model` (D-055,
não modificada) · `messaging-channel-policy` (D-054, WhatsApp para
corretor) · `crm-source-of-truth` (D-020, **reaberta**) · bucket privado
(D-016/D-030) · `openspec/specs/journey-corretor-onboarding/` (capability,
reaberta por D-068) · implementação → #86, #50 · fora de escopo → Gov.br
automatizado (já adiado), #190 (registro de cliente), #191 (pipeline),
mecanismo de pagamento de comissão em si
