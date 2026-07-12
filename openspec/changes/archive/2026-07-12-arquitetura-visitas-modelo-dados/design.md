## Context

Epic #179 (Arquitetura de domínio) leaf #180, grilled right after #181 (Tuya). The legacy `visits` table (`docs/database-schema.sql`) conflates visit, verification, and credential into one denormalized row with raw base64/URL image fields — it predates `D-052`'s adapter model and never resolved `Q-005`.

## Goals / Non-Goals

**Goals:** `D-053` + `templates/visitas-identidade-modelo-dados.md`; resolve `Q-005`; a three-entity data model with a hard gate to `provisionAccess`, so #80 (Execução) and Passo 5 (#176) both build on decided ground.

**Non-Goals:** Choosing a specific face-match library or confidence threshold; the actual staff-review queue UI; the visit journey/screens (Passo 5); re-deciding the Tuya access mechanism itself (`D-052`, only referenced here via the hard-gate boundary).

## Decisions

1. `client-match` primary for both flows — no split by flow type, no KYC SaaS.
2. `staff-review` shared exception queue — automatic (low confidence) or visitor-initiated via WhatsApp; either path is a normal recorded `verification_attempt`, never an ad hoc access bypass.
3. Instant-flow failure: immediate decline, no synchronous staff wait, WhatsApp escape hatch instead.
4. Reuse via `Cliente.identity_verified_at`, 12-month freshness window.
5. Retention split by artifact: selfie ephemeral, document tied to the 12-month verification window.
6. Three-entity model (`Cliente`, `verification_attempt`, `visit`) with a hard gate before `provisionAccess`.

**Alternatives considered and rejected:**
- **Split verification mechanism by flow** (staff-review default for scheduled, client-match for instant) — rejected because `client-match` has to be built for the instant flow regardless, and reusing it for scheduled avoids maintaining two different pipelines/data shapes for what is fundamentally the same decision (is this person who they claim to be).
- **KYC SaaS** — rejected on the same free-first/zero-ops/low-volume grounds that drove `local-pool` over live Tuya API in `D-052`; disproportionate cost and vendor-integration effort for expected visit volume.
- **Staff hands out a code directly over WhatsApp on manual approval** — rejected because it would make the access-provisioning adapter's audit trail (D-052) bypassable; the resolution keeps `provisionAccess()` as the only path to a real credential, regardless of which verification method approved the visit.

## Risks

- **[Risk] Client-side face-match accuracy is weaker than a dedicated KYC vendor.** → Mitigation: `staff-review` is a first-class, always-available exception path, not a rare edge case; low-confidence results route there automatically rather than being force-approved.
- **[Risk] 12-month reuse window becomes stale (lost/reissued document, visible appearance change).** → Mitigation: window is a deliberate tradeoff, not indefinite trust; expires and re-triggers full verification automatically.
- **[Risk] Document retention tied to verification window could be read as excessive by a data subject.** → Mitigation: retention is purpose-bound and expiring (not indefinite), and must be disclosed in privacy policy copy (`#61`/`#96`) — flagged as a dependency, not silently done.
- **[Risk] WhatsApp-initiated staff-review becomes an informal bypass in practice** (staff verifies verbally and never records it). → Mitigation: this decision explicitly requires the `verification_attempt` record before `provisionAccess()` runs — a process/discipline risk to watch during #80 implementation, not something architecture alone can force.
