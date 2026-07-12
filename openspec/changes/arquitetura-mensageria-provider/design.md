## Context

Epic #179 (Arquitetura de domínio) leaf #182, third grilled after #181 (Tuya) and #180 (visits/identity). `D-017` set a generic Telegram-first preference; `D-052`/`D-053` already assumed WhatsApp informally for staff alerts and the visitor-to-staff escape hatch without reconciling that with `D-017`.

## Goals / Non-Goals

**Goals:** `D-054` + `templates/mensageria-provider-gatilhos.md`; a channel-split policy and consent model that Passo 5 (#176) and `#75` (Execução) can both build on without reopening architecture.

**Non-Goals:** Picking the actual WhatsApp provider/vendor; building the adapter; enumerating every message trigger (Passo 5's job); designing the marketing-consent UI (named, not built).

## Decisions

1. Channel split by direction: WhatsApp for any external party, Telegram for internal-only.
2. Consent split: transactional implicit (mandatory WhatsApp field + action taken), marketing explicit opt-in (named, not built).
3. Provider pick deferred to `#75`, same pattern as Tuya's second test lock.
4. All sends routed through QStash, never synchronous.
5. Messaging is a vendor behind the existing `D-017` adapter seam, not a new pattern.

**Alternative considered and rejected:** keeping `D-017`'s "Telegram-first" as a blanket default and only using WhatsApp "when it adds real value." Rejected because the actual value threshold was already crossed for every external-facing use case identified so far (`D-052`, `D-053`) — a blanket Telegram-first default would have kept forcing a re-justification of WhatsApp on a case-by-case basis instead of naming the real rule once: external party involved → WhatsApp, no exceptions.

## Risks

- **[Risk] Telegram scope shrinks to near-zero in practice**, since most real alerts identified so far (Tuya failure, verification escalation) turned out to involve an external party once actually designed. → Mitigation: this is an acceptable, even expected, outcome — the split is about correctness (never force an external party onto Telegram), not about preserving a target split ratio. Telegram remains available for genuinely internal-only cases if/when they arise.
- **[Risk] Deferring the provider pick delays discovering WhatsApp Business API's real template-approval friction.** → Mitigation: same accepted tradeoff as Tuya's Cloud API spike — verifying it needs a live account regardless of when the decision is made; deferring doesn't lose information, it just doesn't block this Definição leaf on Execução-phase work.
- **[Risk] Implicit transactional consent is read as insufficient by a future legal review.** → Mitigation: the split explicitly separates transactional (implicit, tied to a specific requested action) from marketing (explicit opt-in) — if legal review later requires more, only the transactional leg needs revisiting, not the whole messaging architecture.
