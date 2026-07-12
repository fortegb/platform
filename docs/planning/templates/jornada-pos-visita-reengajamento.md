# Jornada: pós-visita e reengajamento (D-061 / #188)

> Quinta leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Segunda leaf greenfield (depois de #192) — nenhum código existia para
> lembrete, cancelamento/reagendamento ou follow-up. Implementação real →
> Execução (#141, #81).

## Fluxo

```
Visita agendada (#186) → confirmação WhatsApp
    (data, endereço, senha + LINK DE GERENCIAMENTO — novo)
    → ~24h antes: lembrete WhatsApp (repete o mesmo link)

Visitante decide cancelar/remarcar a qualquer momento:
    → abre o link (`/visita/gerenciar/[token]`, sem login)
    → vê a visita (casa, data/hora, status)
    → CANCELAR → visit.status = cancelled (novo status, distinto de declined)
                → se access_provisioned: revoke(credential) no adapter Tuya
                → alerta Telegram a staff
    → REMARCAR → cancela a atual (mesmo caminho acima)
                → entra no formulário de agendamento normal (#186),
                  pré-preenchido
                → alerta Telegram a staff

Após a visita:
    → mesmo dia / +24h: "como foi sua visita?" — transacional, sem opt-in
    → +3 dias ou conteúdo promocional: marketing — exige opt-in explícito,
      off por padrão (conteúdo/cadência real → Execução #141 ou v2+)
```

**Papel:** `Cliente`. Consome D-052 (adapter Tuya, `revoke`), D-053 (modelo
de visita), D-054 (mensageria + consentimento), sem modificar nenhum.

## Por que magic link, não WhatsApp-mediado

Cogitado e rejeitado: reaproveitar o padrão de escape hatch já usado em
#186/#187/#192 (visitante contata staff via WhatsApp, staff resolve
manualmente) — zero UI nova, mas staff gasta tempo em todo cancelamento,
por mais raro que seja. Self-service resolve sem staff, sem ida-e-volta —
custo é construir uma página sem autenticação uma vez, não repetido a cada
cancelamento.

## Novo status `cancelled`

Distinto de `declined` (que significa "falha de verificação" — sinal de
segurança). Misturar os dois diluiria esse sinal com um evento operacional
não relacionado (visitante mudou de ideia). Aditivo ao ciclo de vida da
visita — não modifica `visit-identity-verification`, que nunca reivindicou
enumerar todos os status terminais.

## Consentimento de follow-up — tabela

| Timing | Classificação | Consentimento |
|---|---|---|
| Mesmo dia / +24h ("como foi sua visita?") | Transacional | Nenhum extra — campo WhatsApp obrigatório + ação já tomada (D-054) |
| +3 dias ou conteúdo promocional (imóveis similares, "ainda interessado?") | Marketing | Opt-in explícito, off por padrão (D-054) |

**Escopo desta leaf:** só a regra de classificação. Conteúdo, cadência e
ferramenta da sequência de nutrição real ficam com Execução (#141) ou v2+
(D-018). Sem canal novo — e-mail permanece adiado (D-020).

## Relação

[`decisions.md`](../decisions.md) D-061 · `tuya-access` (D-052, primeiro
caller real de `revoke`) · `visit-identity-verification` (D-053, não
modificada) · `messaging-channel-policy` (D-054, framework de consentimento
reaproveitado) · `openspec/specs/journey-post-visit-reengagement/`
(capability) · implementação → #141, #81 · fora de escopo → #191 (visão do
corretor sobre cancelamento/reagendamento)
