## Why

D-041/D-042 locked **names** and **where values live**. Without an access/rotation policy, Production secrets can leak via chat, shared laptops, or overly broad Vercel/vendor access — especially in a small family business where “everyone helps.”

## What Changes

Document (definition only — no secret values, no account ACL changes in this leaf):

1. Ownership: ForteGB tech is accountable for all production and staging-class secrets.
2. Access: who may read/write Vercel env, vendor dashboards, and local `.env`; default least privilege.
3. Handling rules: never git/HTML/issues/chat; rotation triggers; leak response outline.
4. D-043 + `templates/secrets-access.md` + pointers. Materialize `.env.example` / SETUP-CREDENTIALS → #165.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: secrets ownership, access, and handling policy.

## Impact

- Docs only. Does not rotate keys or change Vercel team membership in this leaf.
