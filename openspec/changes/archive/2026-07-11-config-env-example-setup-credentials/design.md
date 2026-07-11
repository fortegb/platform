## Context

Config leaves D-041..D-043 are done. Existing `docs/SETUP-CREDENTIALS.md` predates Sanity/QStash/Telegram/APP_ENV and includes Contentful + JWT-looking placeholders. No `.env.example` in repo; `.gitignore` may not list `.env`.

## Goals / Non-Goals

**Goals:** D-044; committed `.env.example` matching D-041; rewritten SETUP-CREDENTIALS structure; `.env` gitignore; planning pointer template.

**Non-Goals:** Filling real credentials; creating vendor accounts; closing #47 (execution when provisioned); inventing a private password-manager vault path beyond “private note / local only.”

## Decisions

1. **`.env.example` is the machine-readable checklist** — all D-041 keys; values empty or obvious non-secret defaults (`APP_ENV=local`); comments mark v1/v2/optional.
2. **`SETUP-CREDENTIALS.md` is the human runbook** — per-vendor “how to get” + “put in local `.env` and/or Vercel Production/Preview” (D-042); link D-043; no secret values; no Contentful.
3. **Private rotation log:** SETUP-CREDENTIALS may say “record rotation dates in a private note (not this file / not Platform docs HTML)” — not a second committed secrets file.
4. **Gitignore:** add `.env`, `.env.local`, `.env.*.local` if missing.
5. **Planning template** `env-example.md` points at the two artifacts and DoD — keeps Ambientes consistent with other config leaves.
6. **#47** stays open for “fill when accounts exist”; this leaf only locks structure.

## Risks / Trade-offs

- **[Risk] `.env.example` drifts from `nuxt.config.ts`** → Mitigation: D-041 is source of names; build aligns config later.
- **[Risk] SETUP-CREDENTIALS becomes a dumping ground for secrets** → Mitigation: D-043 must-not restated at top of file.

## Open Questions

- None blocking; WhatsApp provider-specific steps stay generic until build picks Meta vs Twilio.
