## Why

A1–A3 locked environments, branches, and Vercel topology, but not **which hostnames** map to each. Without that, DNS, Vercel domain attach, OAuth redirects, and sócio bookmarks stay ambiguous. Issue #150 (A4) writes the hostname contract after grilling.

## What Changes

Document (definition only — no DNS purchase, registrar redirects, or Vercel domain attach in this change):

1. **Prod:** `fortegb.com` + `www.fortegb.com` → same Production deployment.
2. **Staging (stable):** `staging.fortegb.com` → Preview for branch `staging` (password per D-027).
3. **Feature Previews:** ephemeral `*.vercel.app` only — no custom subdomain per PR.
4. **Local:** `localhost` (no custom DNS).
5. **`.com.br`:** `fortegb.com.br` + `www.fortegb.com.br` → **301 to `https://fortegb.com`** (registrar/Cloudflare OK); not app hosts. No `staging.fortegb.com.br`.
6. **Platform docs:** remain on GitHub Pages (unchanged).
7. D-029 + template + Ambientes page + STATUS/CHANGELOG.

**Out of scope:** provisioning DNS/Vercel domains; canonical apex-vs-www 301 direction detail at setup time; OAuth allowlist wiring.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: add hostname map (prod, staging, preview, local, `.com.br` redirects).

## Impact

- **Docs:** `decisions.md` D-029, template, `ambientes.html`, `architecture.md` if needed, `STATUS.md`, `DECISIONS.md`, `CHANGELOG.md`.
- **No** registrar or Vercel clicks in this change.
