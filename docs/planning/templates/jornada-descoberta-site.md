# Jornada: descoberta e navegação do site (D-057 / #185)

> Primeira leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Re-validação da jornada pré-arquitetura contra D-052–D-056. Implementação
> real (beacon frontend, persistência no endpoint) → Execução (#56, #78,
> #73).

## Fluxo

```
Google / redes / indicação
    → Home (marca + CTA WhatsApp)
    → Portfólio (lista de casas)
    → Detalhe da casa (fotos, planta, bairro, status obra, CTA WhatsApp)
    → Blog (conteúdo educativo)
    → Contato (WhatsApp CTA ou formulário → cliente no CRM)
```

**Papel:** `Visitante` — sem autenticação, nada armazenado por-visitante além
dos dois leads abaixo (confirma D-055).

**Fora de escopo desta leaf:** `/sobre` (sem lead capture ou superfície de
arquitetura distinta); visita/identidade/Tuya (leaves #186/#187).

## Contrato de captura de lead

Dois pontos de entrada na jornada, ambos criando/atualizando o mesmo modelo
`cliente` nível Contato (`crm-source-of-truth`), reaproveitando
`POST /api/contact`:

| Entrada | `fonte` | Bloqueante? | Campos |
|---------|---------|-------------|--------|
| Clique em CTA WhatsApp (home, portfólio detalhe, contato) | `cta-whatsapp` | Não — fire-and-forget, nunca atrasa a abertura do `wa.me` | mínimo: `fonte` + contexto de origem (página/casa) |
| Envio do formulário de contato | `form-site` | Sim — é o próprio submit do form | nome, e-mail, telefone, mensagem (já obrigatórios hoje) |

**Falha do beacon é silenciosa e não-bloqueante** — perder um beacon
ocasional é aceitável (sinal de marketing, não transação); sem retry/outbox
construído preventivamente.

## Por que `wa.me` não é um "envio" da plataforma

`messaging-channel-policy`'s regra de roteamento via QStash aplica-se a
mensagens que a **plataforma** origina (confirmação de visita, código de
acesso, etc.). Um link `wa.me` abre o WhatsApp do próprio visitante com um
rascunho que ele decide enviar — a plataforma nunca chama a API de um
provedor de mensageria nessa interação. Sem alteração a
`messaging-channel-policy`; distinção documentada aqui para que `#75` não
confunda esta CTA com um envio roteado por provedor.

## Relação

[`decisions.md`](../decisions.md) D-057 · `crm-source-of-truth` (modelo
`cliente`/`fonte`) · `rbac-role-model` (D-055, `Visitante` não armazenado) ·
`messaging-channel-policy` (D-054, não aplicável a `wa.me`) ·
`openspec/specs/journey-site-discovery/` (capability) · implementação →
#56 (UI), #78 (form → HubSpot), #73 (HubSpot service) · próximas jornadas de
Passo 5 → #186–#195
