## Context

D-025..D-029 locked environments, branches, Vercel, domains. D-037..D-039 locked integration postures, map, and safe targets. D-027 already flagged that Preview password protection breaks vendor webhooks. #161 closes that gap as a docs-only Architecture leaf (same pattern as #158–#160).

## Goals / Non-Goals

**Goals:** D-040 + webhook/callback template: which hosts receive inbound events, Preview bypass, local tunnel vs mock, path/signature expectations, per-vendor inbound notes.

**Non-Goals:** Installing ngrok (#170); registering webhooks in vendor consoles; implementing Nitro routes; inventing exact env var names (#162); mock adapter code (#172).

## Decisions

1. **Only two stable public callback bases for vendor registration:** `https://fortegb.com` (`prod`) and `https://staging.fortegb.com` (stable staging branch). Prefer apex `fortegb.com` over `www` for webhook allowlists (www may 301).
2. **Preview `feat/*` / `fix/*`:** never register `*.vercel.app` (or any Preview URL) with vendors. Reasons: ephemeral host, Vercel password gate (D-027), shared staging backends. Inbound on Preview = **bypass** (mock / manual / no push). Outbound to safe-targets still allowed per D-037.
3. **Shared staging sink:** vendor sandboxes point at `staging.fortegb.com` only. Events land on the stable staging deployment — not on every Preview. Previews do not expect to receive those pushes.
4. **Local:** default inbound = mock (#172). Optional tunnel (ngrok or equivalent) only when deliberately testing a real vendor callback; tunnel URL is ephemeral and never committed. Tooling inventory → #170.
5. **Path convention (contract):** `/api/webhooks/<vendor>` (kebab vendor id: `hubspot`, `whatsapp`, `telegram`, `qstash`, `tuya`, `google-calendar`). Exact handlers at build.
6. **Verification:** every real inbound webhook SHALL verify vendor signature/secret before side effects. Secrets follow D-039 placement (Vercel scopes + local `.env`).
7. **QStash:** treat delivery URLs like other callbacks — prod/staging stable hosts only; local = mock or tunnel; never Preview URL as QStash destination in shared vendor config.
8. **v1 inbound priority:** HubSpot, WhatsApp, Telegram (if webhook mode), QStash. Tuya + Google Calendar documented for v2 (same host rules).

## Risks / Trade-offs

- **[Risk] Staging is a single sink — concurrent Preview work cannot each get distinct vendor pushes** → Mitigation: accept for free-first solo scale; use mock/manual on Preview; UAT inbound on `staging.fortegb.com`.
- **[Risk] Vercel Preview password blocks even accidental webhook hits** → Mitigation: by design; do not disable password for webhook convenience.
- **[Risk] Local tunnel URL leaks into vendor prod config** → Mitigation: template must-not; only sandbox vendor apps; never prod-live outside prod (D-037).

## Open Questions

- Exact signing env var names → #162.
- Whether WhatsApp uses Meta Cloud API vs Twilio shapes the path suffix — leave as `/api/webhooks/whatsapp` until build picks provider.
