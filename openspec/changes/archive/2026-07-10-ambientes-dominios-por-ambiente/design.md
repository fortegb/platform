## Context

D-025..D-027 defined tiers, git→env, and one Vercel project. Grilling A4 (2026-07-10) locked hostnames for ForteGB.

## Goals / Non-Goals

**Goals:**
- Written hostname map per logical environment + Preview mechanism.
- `.com.br` as redirect-to-canonical-`.com`, not dual app hosts.
- Sócios page + template updated.

**Non-Goals:**
- Buying/configuring DNS or Vercel domains.
- Choosing exact apex↔www redirect direction beyond “both serve prod.”
- Platform docs domain change.

## Decisions

1. Prod aliases: `fortegb.com` + `www.fortegb.com` on Production.
2. Staging bookmark: `staging.fortegb.com` only.
3. PR Previews: `*.vercel.app` only.
4. Local: localhost.
5. `.com.br` / `www.fortegb.com.br`: HTTP 301 → `https://fortegb.com` at registrar/CDN — not attached to the Nuxt app.
6. Spec-only leaf (same pattern as A1–A3).

## Risks / Trade-offs

- **[Risk] Registrar redirect vs Cloudflare** → Mitigation: either OK; document intent, pick tool at provision time.
- **[Trade-off] `.com.br` not in address bar after redirect** → Accepted; `.com` is canonical brand host for the app.
