## Context

Grilling #154 (2026-07-10) locked the non-prod seed contract: shared pack, operational Supabase + house IDs, realistic pt-BR fakes, dummy RG/CNH fixtures, test logins, recreatable wipe. Docs only until `supabase/` + schema exist (#171/#43).

## Goals / Non-Goals

**Goals:** D-033 + template + sócios note; clear boundary vs CMS leaves and #126.

**Non-Goals:** Writing seed SQL; generating document images; CMS dataset content; retention jobs / privacy page hardening (#126).

## Decisions (grilled)

1. Shared base pack local+staging.
2. Supabase operational rows + stable house IDs; CMS fixtures later.
3. Realistic pt-BR synthetic PII; dummy RG/CNH allowed as fixtures; no prod dumps; wipe + recreate easy.
4. Test auth accounts in the contract (non-prod only).
5. Fixture path contract: `supabase/seed/fixtures/` (or `docs/fixtures/seed/` until scaffold).

## Risks / Trade-offs

- **[Risk] Realistic fakes mistaken for real** → Mitigation: document as synthetic; never use real customer data; passwords only in non-prod docs.
- **[Risk] Dummy docs look too real** → Mitigation: watermark/mark as teste in fixtures when created; never upload to prod.
- **[Trade-off] Docs before files** → Accepted; implement seed when bootstrap/schema land.

## Open Questions

None blocking. Exact account emails/passwords chosen at seed implementation time.
