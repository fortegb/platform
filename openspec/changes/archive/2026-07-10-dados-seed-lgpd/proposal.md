## Why

A1/B1 locked “no prod PII outside prod,” but the **seed pack contract** (what to load, fake-identity rules, dummy docs, test logins, recreatability) was still open. Issue #154 closes that after grilling so local/staging stay LGPD-safe and reproducible.

## What Changes

Document (definition only — **no** `seed.sql` or fixture binaries in this change):

1. **One shared base pack** for local + staging (staging may add demo rows later; base is shared).
2. **Supabase operational seed** (corretores, leads, visitas, stable `house_id`s); CMS content fixtures → #156/#157.
3. **Synthetic people:** realistic pt-BR lookalikes; never real customers; no prod dumps.
4. **Dummy RG/CNH fixtures** in repo; load only into local/staging storage — never prod buckets.
5. **Known test auth accounts** (corretor + staff) with documented passwords for non-prod only.
6. **Disposable + one-command recreatable** (e.g. `db reset` / documented reseed).
7. **D-033** + `templates/seed-lgpd.md` + Ambientes; full LGPD hardening → #126.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `environment-tiers`: add seed/LGPD non-prod data contract.

## Impact

- **Docs:** `decisions.md` D-033, `templates/seed-lgpd.md`, environments/Ambientes/STATUS/CHANGELOG.
- **No** seed SQL, PNG fixtures, or auth user creation in this change.
