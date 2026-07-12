## Why

#182 is the third leaf of Epic #179 (Arquitetura de domínio). `D-017` set a generic "Telegram-first (free); WhatsApp paid-when-useful" preference, but every concrete decision made since then (`D-052`'s Tuya failure staff alert, `D-053`'s visitor-to-staff verification escape hatch) has quietly assumed WhatsApp for both staff and visitor communication without ever reconciling that with `D-017`. No prior `Q-XXX` tracked this gap — it surfaced in the post-#146 domain-architecture review. Deciding the channel split, consent model, and send mechanism now — before Passo 5 (#176) designs the actual message-trigger journey — prevents that journey from being built on an unresolved channel assumption.

## What Changes

Document (definition only — no vendor account, no adapter code, no trigger enumeration):

1. Channel split by **direction, not cost**: WhatsApp always for any externally-facing message (visitor, customer, or corretor); Telegram reserved for internal-only (staff/system, no external party) notifications — justified by a real technical asymmetry (Telegram Bot API needs no template approval, is free, and is fast to set up), not generic preference. Corrects `D-017`'s framing to its actual applicable scope.
2. Consent split into two scopes: transactional/operational messages are implicitly covered by `Cliente`'s mandatory WhatsApp field (`D-020`) plus the specific action taken — no separate opt-in; marketing/promotional messaging is a distinct, explicit opt-in scope, named now but not built (v2+ per `D-018`).
3. Provider selection (WhatsApp Business API vs. Twilio) deferred to `#75` (Execução) — same "spec now, provision later" pattern as Tuya's second test lock (`D-052`). This leaf documents selection criteria only.
4. All sends (WhatsApp or Telegram) route through QStash (`D-017`) — never a synchronous call inside the triggering request handler.
5. Messaging is another vendor behind the existing adapter seam (`D-017`), same shape as Tuya (`D-052`).
6. `D-054` + `templates/mensageria-provider-gatilhos.md`.

## Capabilities

### New Capabilities
- `messaging-channel-policy`: which channel (WhatsApp vs. Telegram) the platform uses for a given message based on whether an external party is involved, the consent basis for sending it, and how sends are dispatched (queued vs. synchronous).

### Modified Capabilities
<!-- none -->

## Impact

- Docs only. Vendor pick + adapter implementation → #75 (Execução). Trigger-by-trigger journey (which event sends which message) → Passo 5 (#176).
