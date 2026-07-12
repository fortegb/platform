# Jornada: visita instantânea via QR (D-059 / #187)

> Terceira leaf de Passo 5 (Jornadas, epic #176) grillada. **Docs only.**
> Corrige a jornada pré-arquitetura contra D-052 (Tuya) e D-053
> (visitas/identidade, **reaberta** por esta leaf). Implementação real
> (rewrite do endpoint/adapter/UI) → Execução (#81, #80, #77/#135, #75).

## Fluxo

```
Placa "à venda" → QR → micro-página
    → Cliente já verificado (12 meses) E last_client_match_at ≤ 24 meses?
        SIM → código único via WhatsApp → visitante digita o código
              → válido → acesso imediato
              → inválido/expirado → recusa imediata + escape hatch WhatsApp
        NÃO (fora da janela, sem registro, ou teto de 24m estourado)
              → selfie + documento (client-match)
              → aprovado → acesso imediato
              → falhou/baixa confiança → recusa imediata + escape hatch WhatsApp
                  → staff aprova via WhatsApp (staff-review, #192)
                    → mesmo provisionAccess da aprovação automática
```

**Papel:** `Cliente`. Constrói sobre D-052 (adapter Tuya, timeout mais curto
que o fluxo agendado) e D-053 (modelo de dados, reaberta nesta leaf).

## Correções feitas nesta leaf (vs. stub pré-arquitetura)

Mesmas de D-058 (#186) — tabela `visits` legada, Tuya chamado direto com
falha engolida, booleano de verificação confiado do cliente, WhatsApp
síncrono — corrigidas aqui também. Duas diferenças específicas deste fluxo:

| Aspecto | Agendada (#186) | Instantânea/QR (#187) |
|---|---|---|
| Falha de verificação | Assíncrona — booking completa, fila resolve depois | **Imediata** — recusa na hora + escape hatch WhatsApp (D-053, implementado pela primeira vez) |
| Reuso de 12 meses | `identity_verified_at` sozinho libera acesso | `identity_verified_at` **+ código WhatsApp** (posse do telefone) — sem revisão humana possível antes da porta destrancar |

## Mecanismo de renovação limitada (reabre D-053)

Dois campos no `Cliente`:
- **`last_client_match_at`** — só muda quando um `client-match` completo é aprovado (selfie + documento).
- **`identity_verified_at`** — âncora da janela de reuso de 12 meses; pode ser estendida por um código WhatsApp bem-sucedido neste fluxo.

Regra: um código válido estende `identity_verified_at` para agora, **mas nunca além de 24 meses de `last_client_match_at`**. Passado esse teto, o reuso via código para de ser oferecido — a visita roda `client-match` completo, resetando os dois campos.

```
last_client_match_at ─────────────────────────── +24 meses (teto)
        │                                              │
        ├─ identity_verified_at pode ser estendido ────┤
        │  por código WhatsApp dentro deste intervalo   │
        │                                              │
        └──────────────────── além do teto: client-match obrigatório
```

Por quê: sem teto, a mesma pessoa poderia nunca mais refazer verificação
biométrica só provando posse do telefone repetidamente — o teto garante
que uma re-verificação real aconteça eventualmente.

## Por que não afeta #186

A lógica de reuso da visita agendada lê só `identity_verified_at`,
incondicional — `last_client_match_at` é um campo aditivo que #186 nunca
lê. Nenhum comportamento já fechado em #186 muda.

## Fronteira com leaves vizinhas

- **#192** (fila de exceção de verificação) — tela de staff-review, mesma
  fronteira de #186.
- **#140** (condomínio/portaria, Q-017) — já deferido a Execução, fora
  desta leaf.
- **#98/#100** (media kit — placa física + QR) — esta jornada assume o QR
  já existe; não desenha a placa.

## Relação

[`decisions.md`](../decisions.md) D-059 · `tuya-access` (D-052) ·
`visit-identity-verification` (D-053, reaberta) · `messaging-channel-policy`
(D-054, QStash) · `openspec/specs/journey-instant-visit/` (capability) ·
implementação → #81, #80, #77/#135, #75 · leaves relacionadas → #186, #192
