## Context

Solo tech owner (VP Technology) runs ForteGB platform; partners are non-technical. D-039 already said owner = ForteGB tech and secrets never in git/HTML. #164 makes access and rotation explicit so #165 can point at a safe credentials doc structure.

## Goals / Non-Goals

**Goals:** D-043 + secrets-access template: ownership, who can access what, handling must/must-not, rotation triggers, leak outline.

**Non-Goals:** Actually rotating keys; writing SETUP-CREDENTIALS.md body (#165); inventing a paid secrets manager; sharing prod keys with sócios for “visibility.”

## Decisions

1. **Accountable owner:** ForteGB tech (current: platform maintainer). Only this role writes Production Vercel env and prod vendor API keys.
2. **Staging-class:** same owner; Preview secrets may be used on the tech laptop for deliberate staging-class local overrides — still not committed.
3. **Sócios / non-tech:** no Vercel project env access; no vendor API key access. They use product UIs and password-gated Preview (D-027), not secret stores.
4. **Local `.env`:** only on the tech machine(s); gitignored; not synced via iCloud/Dropbox/email; not pasted into Cursor chats or GitHub issues.
5. **Channels forbidden for secrets:** git, Platform docs HTML, GitHub issues/PRs/OpenSpec, WhatsApp/Telegram/email to partners, screenshots of Vercel env UI in shared albums.
6. **Rotation triggers:** known/suspected leak; contractor/device loss; vendor compromise notice; optional periodic when convenient (free-first — no mandatory calendar).
7. **Leak response (outline):** revoke/rotate affected keys → update Vercel scopes + local `.env` → note date in private runbook (#165) — not in public docs.
8. **Vendor dashboards:** prefer single owner login; if a partner needs a vendor UI, use role with no API-key export when the vendor allows; otherwise tech-mediated.
9. **No second secrets vault required** for v1 (Vercel + local `.env` + vendor dashboards). Revisit if team grows.

## Risks / Trade-offs

- **[Risk] Bus factor = 1** → Mitigation: accepted for family solo-tech; document recovery via vendor “forgot password” + Vercel owner email; #165 private checklist.
- **[Risk] AI tools / chat paste** → Mitigation: explicit must-not; prefer pointing agents at names (D-041) not values.

## Open Questions

- Exact private path for SETUP-CREDENTIALS (gitignored vs 1Password note) → decide in #165.
