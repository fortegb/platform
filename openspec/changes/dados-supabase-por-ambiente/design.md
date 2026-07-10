## Context

Grilling #151 (2026-07-10) locked the Supabase map on free tier: 2 cloud projects + local Docker; Previews share staging; no prod PII copy; one schema; auth redirects; Vercel Production vs Preview secret scopes.

## Goals / Non-Goals

**Goals:** D-030 + template + sócios page; formalize D-022 “project per env” with free-tier-honest detail.

**Non-Goals:** Provision projects; migration tool choice; seed contents; keep-alive cron for free-tier pause.

## Decisions

1. **2 + local Docker** — Free allows 2 active; local doesn’t consume a slot; Previews don’t need a 3rd project.
2. **Pause risk accepted** — staging may pause after ~7d inactivity; restore from dashboard; document as known free-tier caveat.
3. **Secrets map only** — which project each Vercel scope points at; var inventory → #162+.

## Risks / Trade-offs

- **[Risk] Staging pause** → Mitigation: document; optional keep-alive later; Pro when needed.
- **[Risk] Storage caps (ID docs)** → Mitigation: known; revisit at tours v2 / Pro.
- **[Trade-off] Shared staging DB across all Previews** → Accepted (D-027); concurrent feat branches share data — seed carefully.
