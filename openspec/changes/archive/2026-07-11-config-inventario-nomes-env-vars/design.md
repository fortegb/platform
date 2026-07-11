## Context

D-025 locked `APP_ENV`. D-027/D-030/D-035/D-037–D-040 deferred exact names to #162. Existing `nuxt.config.ts` already uses a partial set (Supabase, HubSpot, Tuya, WhatsApp, Google Calendar) — inventory must absorb those and add Sanity, Telegram, QStash, webhook secrets, and posture overrides.

## Goals / Non-Goals

**Goals:** D-041 + env-vars template with convention + full name inventory (purpose, public vs secret, phase).

**Non-Goals:** Filling values; creating `.env.example` (#165); Vercel scope matrix detail (#163); access policy (#164); changing runtime code in this leaf (code align at build / later config apply).

## Decisions

1. **Convention:** `SCREAMING_SNAKE_CASE`. Client-exposed only via `NUXT_PUBLIC_*`. Server secrets never use that prefix.
2. **Identity:** `APP_ENV` ∈ `{local,staging,prod}` remains the sole logical-env key (D-025).
3. **Vendor prefixes:** `SUPABASE_`, `SANITY_`, `HUBSPOT_`, `WHATSAPP_`, `TELEGRAM_`, `TUYA_`, `GOOGLE_CALENDAR_`, `QSTASH_`. Prefer one prefix family per vendor; do not invent parallel aliases in docs.
4. **Supabase public pair:** keep Nuxt module pattern — `NUXT_PUBLIC_SUPABASE_URL` + `NUXT_PUBLIC_SUPABASE_ANON_KEY` for client; `SUPABASE_SERVICE_ROLE_KEY` server-only. `SUPABASE_URL` may mirror URL server-side if needed; inventory documents both without requiring duplicate values in every file.
5. **Posture overrides (D-037):** `INTEGRATION_TIER_<VENDOR>` ∈ `{mock,safe-target,prod-live}` optional; only honored on local/staging per D-037. Vendor token = uppercase map id: `HUBSPOT`, `WHATSAPP`, `TELEGRAM`, `TUYA`, `GOOGLE_CALENDAR`, `QSTASH`.
6. **Webhook secrets:** `*_WEBHOOK_SECRET` (or vendor-standard name when fixed at build) listed as optional until handlers exist; placement rules stay D-039/D-040.
7. **Sanity:** `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` (token server-only if write); public read may use `NUXT_PUBLIC_SANITY_PROJECT_ID` + `NUXT_PUBLIC_SANITY_DATASET` when client fetches.
8. **QStash:** `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY` (Upstash standard names preferred).
9. **Telegram:** `TELEGRAM_BOT_TOKEN` (secret); optional `TELEGRAM_WEBHOOK_SECRET`.
10. **Inventory is the contract;** `.env.example` (#165) must match this list later. Scoping which value goes to Production vs Preview → #163.

## Risks / Trade-offs

- **[Risk] Drift from live `nuxt.config.ts`** → Mitigation: template notes “código atual”; build leaf updates config to match inventory.
- **[Risk] Over-listing v2 vars** → Mitigation: mark phase v1/v2; still name them so #163/#165 stay complete.

## Open Questions

- Exact Meta vs Twilio WhatsApp key shape — keep generic `WHATSAPP_API_KEY` / `WHATSAPP_API_URL` until provider pick at build.
- Google Calendar OAuth vs service account — keep current refresh-token trio until v2 grilling.
