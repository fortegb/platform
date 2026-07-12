## Why

#180 is the second leaf of Epic #179 (Arquitetura de domínio), grilled right after #181 (Tuya). The legacy schema (`docs/database-schema.sql`) has a denormalized `visits` table (password, verification data, and raw selfie/document images all on one row) that predates the adapter model from `D-052` and never resolved `Q-005` (identity verification mechanism). Deciding the mechanism and data model now, before Passo 5 (#176) designs the actual visit journey/screens on top of it, avoids the journey being designed against an undecided or legacy-shaped foundation.

## What Changes

Document (definition only — no library selection, no schema migration, no queue UI):

1. `client-match` (frontend library, selfie vs. document) is the primary verification mechanism for **both** the scheduled and instant/QR flows — no KYC SaaS, no split by flow type.
2. `staff-review` is the shared exception queue — triggered automatically (low confidence) or by the visitor messaging staff directly via WhatsApp. Either path records a normal `verification_attempt`; staff never hands out an ad hoc access code as a bypass.
3. Instant-flow failure: no engineered synchronous wait for staff — immediate decline with a WhatsApp escape hatch to staff, mirroring (inverted) the Tuya fallback shape from `D-052`.
4. Verification reuse: result lives on `Cliente` (`identity_verified_at`, reusing `D-020`'s CPF-keyed model) with a 12-month freshness window — a recurring visitor within the window skips re-verification.
5. Retention split by artifact: selfie ephemeral (delete on approval, 30-day hold on rejection/exception); document photo retained for the active 12-month verification window (covers damages/liability traceability), deleted on renewal/expiry.
6. Data model: three entities (`Cliente` + `identity_verified_at`, new `verification_attempt`, `visit` with a `pending_verification → verified → access_provisioned → completed/declined` status progression) replacing the legacy denormalized `visits` table, with a hard gate — `provisionAccess` (Tuya adapter, `D-052`) only fires once `visit.status = verified`.
7. `D-053` + `templates/visitas-identidade-modelo-dados.md`; resolves `Q-005`.

## Capabilities

### New Capabilities
- `visit-identity-verification`: how the platform verifies a guided-visit visitor's identity (mechanism, exception handling, reuse, retention) and how that gates physical access provisioning.

### Modified Capabilities
<!-- none -->

## Impact

- Docs only. Library/threshold/queue-UI implementation → #80 (Execução). Visit journey/screens → Passo 5 (#176). Physical access mechanism referenced, not modified → `tuya-access` (D-052, #181).
