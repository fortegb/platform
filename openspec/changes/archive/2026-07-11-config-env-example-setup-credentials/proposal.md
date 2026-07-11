## Why

D-041..D-043 locked names, scoping, and access — but the repo still lacks a committed `.env.example`, and `docs/SETUP-CREDENTIALS.md` is outdated (Contentful leftovers, fake JWT-shaped examples, incomplete inventory). Issue #165 closes the config area E with safe templates developers can copy without pasting real secrets.

## What Changes

1. Add root `.env.example` listing every D-041 name with empty/placeholder values and phase comments (no real secrets).
2. Restructure `docs/SETUP-CREDENTIALS.md`: how to obtain each credential, where to put it (local vs Vercel scopes per D-042), pointers to D-043; remove Contentful and fake token samples.
3. Ensure `.env` / `.env.local` are gitignored.
4. D-044 + short planning pointer `templates/env-example.md`; Ambientes/STATUS updates.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: `.env.example` + SETUP-CREDENTIALS structure contract.

## Impact

- Creates/rewrites committed docs and `.env.example` only. Does not provision vendor accounts or fill real values (#47 remains for setup execution).
