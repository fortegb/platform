## Context

Epic #179 (Arquitetura de domínio) leaf #181 — highest risk, grilled first per the prior session's handoff. The Intelar X2 (Tuya, WiFi smart lock) is already purchased and physically installed, on a house currently for sale — which surfaced a real conflict with `D-039`'s safe-target must-not rule (`Tuya ≠ fechadura de casa à venda`) mid-grill.

## Goals / Non-Goals

**Goals:** `D-052` + `templates/tuya-access-adapter.md`; resolve `Q-006`'s fallback question; an adapter-seam boundary so #180's visit journey isn't coupled to Tuya Cloud API confirmation.

**Non-Goals:** Running the Tuya Cloud API spike; adapter TypeScript implementation; the visit journey/data model (#180); resolving the admin build-vs-buy conflict (#184, only referenced).

## Decisions

1. Adapter seam (`provisionAccess`/`markUsed`/`revoke`, D-017) hides the access mechanism from the rest of the journey.
2. `local-pool` and `tuya-live` are both first-class mechanisms behind the same seam — equally part of architecture, journey, and grilling, neither shelved. `local-pool` is the launch default (no live API in the critical path); `tuya-live` becomes available once a near-term spike confirms viability — not gated on visit volume.
3. Fallback = static per-house emergency code + reschedule, never staff dispatch as a designed tier — applies to either mechanism.
4. Failure detection is synchronous at issuance; timeout is flow-dependent (scheduled vs. instant/QR).
5. Emergency code: per-house scope, monthly + on-use rotation, audited in a restricted Supabase table.
6. Installed X2 is prod-only; a second dedicated test lock is required before automated safe-target testing.

**Alternative considered and revised:** an earlier draft of this decision framed `tuya-live` as an optional future upgrade, gated on both spike confirmation *and* visitor-volume growth — effectively deferring the Tuya API track indefinitely. Revised per explicit owner correction: both mechanisms stay actively designed-in from the start; only the *launch default* is sequenced (`local-pool` first, because it doesn't wait on Cloud API confirmation), not which mechanism is considered part of the architecture.

## Risks

- **[Risk] Tuya Cloud API may not expose the temp-password DP set for this specific rebrand.** → Mitigation: the adapter seam means the journey ships on `local-pool` regardless; the spike result determines when `tuya-live` becomes available, not whether v2 ships.
- **[Risk] The static emergency code becomes a stale/leaked standing credential.** → Mitigation: monthly + on-use rotation, per-house scope, every fallback trigger logged.
- **[Risk] Automated staging tests could hit the lock on a live sale house.** → Mitigation: installed X2 declared prod-only; a dedicated test lock is a prerequisite before #77/#135 wire up automated safe-target testing.
- **[Risk] "Launch default" language quietly regresses into "the other one is deprioritized."** → Mitigation: this decision and `Q-006`/`D-052` explicitly record both mechanisms as active near-term scope; #77/#135 should scope the spike as near-term work, not volume-conditional.
