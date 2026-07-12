## Why

#181 is the highest-risk leaf of Epic #179 (Arquitetura de domínio), never grilled before. The self-guided visit vision (AGENTS.md §3.1.2) assumed real-time Tuya Cloud API password creation, but that assumption was never verified against the actual purchased device (Intelar X2), and no failure-mode/fallback policy existed — `Q-006` flagged this gap unresolved. Deciding the mechanism now, before #180's visit journey builds on top of it, prevents coupling the whole journey to an unconfirmed real-time network dependency.

## What Changes

Document (definition only — no adapter code, no Tuya Cloud Project linking, no spike execution):

1. Adapter seam (`provisionAccess`/`markUsed`/`revoke`, per D-017) hides the access mechanism from the rest of the visit journey (identity, booking, CRM, WhatsApp).
2. `local-pool` (pre-provisioned per-house codes, no live API in the critical path) is the default v2 mechanism; `tuya-live` (real Cloud API calls) is a gated future upgrade, swapped in only once a spike confirms viability and visit volume justifies automation.
3. Fallback chain: static per-house emergency code (keypad-local) + reschedule — never staff dispatch as a designed tier. Failure detection is synchronous at issuance, never visitor-reported; the instant/QR flow needs a shorter timeout than the scheduled flow.
4. Emergency code lifecycle: scoped per house, rotates monthly + immediately after any real use, tracked and audited in a restricted Supabase table.
5. Safe-target isolation: the installed X2 (on a house currently for sale) is prod-only and must never be the default staging safe-target (resolves a real conflict with `D-039`); a second dedicated test lock is required before any automated safe-target testing of the write-password flow.
6. `D-052` + `templates/tuya-access-adapter.md`; resolves `Q-006` (fallback half — scheduled/instant ordering stays with #180).

## Capabilities

### New Capabilities
- `tuya-access`: how the platform provisions and revokes temporary physical house access via the Tuya smart lock for guided visits, and how it behaves when that mechanism is unavailable.

### Modified Capabilities
<!-- none -->

## Impact

- Docs only. Tuya Cloud API spike + adapter implementation → #77/#135 (Execução). Visit journey/data model → #180. Admin maintenance-UI conflict → #184 (only referenced here, not resolved).
