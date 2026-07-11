## Why

Vendors that push events (WhatsApp, HubSpot, Telegram, QStash, later Tuya/Calendar) need **stable public HTTPS URLs**. Preview deployments are ephemeral, password-gated (D-027), and share staging-class backends — registering a webhook per `*.vercel.app` Preview is unsafe and impractical. Issue #161 locks the callback/tunnel contract so build and #170 (ngrok) do not reinvent rules.

## What Changes

Document (definition only — no tunnels provisioned, no vendor webhook registration in this leaf):

1. Canonical inbound bases: `prod` → `fortegb.com`; stable `staging` → `staging.fortegb.com`; `local` → tunnel when testing inbound, else mock.
2. Preview `feat/*` / `fix/*`: **no** per-deployment vendor webhook URLs; bypass / shared staging sink rules (password gate + ephemeral host).
3. Path convention + signature verification expectation; per-vendor inbound needs (v1 vs v2).
4. D-040 + `templates/integrations-webhooks.md` + pointers from Ambientes / map / tiers / safe-targets.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: webhook/callback URL rules per logical environment and Preview bypass.

## Impact

- Docs only. Tunnel tooling → #170; env var names → #162; mock strategy → #172; actual route handlers → build (passo 8).
