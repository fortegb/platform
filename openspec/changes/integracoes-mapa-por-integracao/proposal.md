## Why

D-037 locked integration postures but not which vendors are in scope, what safe-target *class* each uses, or MVP phase. Issue #159 fills that map so #160 can provision concrete targets without reopening inventory.

## What Changes

Document (definition only):

1. Inventory: HubSpot, Tuya, WhatsApp, Telegram, Google Calendar, QStash + Gov.br deferred row; exclude Supabase/Sanity (already env-scoped).
2. Safe-target class per vendor.
3. MVP phase tags (D-018).
4. D-038 + `templates/integrations-map.md` + pointers.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `platform-architecture`: per-integration map of safe-target classes and phases.

## Impact

- Docs only. Concrete IDs/accounts → #160.
