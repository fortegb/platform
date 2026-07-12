## Context

D-037–D-040 already fixed posture rules, per-vendor mapping, safe-targets,
and webhook bases. This leaf closes the last deferred piece: how the
`mock` posture is actually implemented.

## Goals / Non-Goals

**Goals:**
- Decide mock fidelity (trivial vs. realistic vs. configurable).
- Decide the override mechanism for deliberately testing failure paths.

**Non-Goals:**
- Writing any mock implementation code — Etapa 8 build work.
- Redeciding posture rules, defaults, or overrides (D-037) — unchanged.
- Parameterized failure types (specific HTTP codes, timeout simulation,
  etc.) — considered and rejected as over-engineering for this scale.

## Decisions

- **Happy-path default + single boolean override per vendor**, not
  trivial-only and not elaborately parameterized. Trivial-only mocks never
  exercise error-handling code locally; elaborate failure-type simulation
  is more machinery than a solo/small team needs — that nuance is better
  validated against the real sandbox API at the safe-target tier.
- **Env var mechanism** (`MOCK_<VENDOR>_FORCE_ERROR`), consistent with
  D-041's naming convention — no new config file or mechanism to learn.
- **Mocks live inside each vendor's adapter module**, not a separate
  directory — follows D-017's one-adapter-per-vendor pattern directly, no
  new structural decision needed.

## Risks / Trade-offs

- **[Risk]** A single boolean per vendor can't simulate multiple distinct
  failure modes for the same vendor. → **Mitigation**: accepted — if a
  specific failure mode needs testing, the safe-target tier (real sandbox)
  is the right place for that, not an increasingly complex mock.
