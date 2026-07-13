## Context

D-052 already decided Tuya emergency-code management stays on Supabase
Studio for v1 ("Manutenção v1: Supabase Studio (sem UI bespoke)"), and
D-056's three-part test for custom UI explicitly evaluated this exact
case and rejected it ("Rotação de código de emergência Tuya (D-052) não
bate em nenhum [critério] → continua Supabase Studio, decisão original
mantida"). This leaf's job is to check whether anything has changed since
those decisions that would flip that verdict — nothing has.

## Goals / Non-Goals

**Goals:**
- Re-apply D-056's three-part test to confirm the verdict still holds.
- Clarify what "status do dispositivo" (device status) means in this
  issue's scope, since it could be misread as calling for a new
  monitoring capability.

**Non-Goals:**
- Building any UI — the conclusion is that none is needed.
- Revisiting D-052's fallback/rotation mechanics — unchanged, only
  consumed here for context.

## Decisions

**Re-applying D-056's three-part test:**
1. *Multi-step workflow with side effects?* No — rotating an emergency
   code is a single field update. Contrast with corretor approval
   (#189, unlocks portal access) or verification review (#192, triggers
   `provisionAccess`) — both of which D-056 correctly flagged as needing
   custom UI for this exact reason.
2. *Domain-specific rendering a generic dashboard can't do?* No — a text/
   numeric field, nothing Supabase Studio doesn't already handle.
3. *Must be safe for non-technical staff without touching a table
   directly?* D-056 already weighed this for the identical case and
   rejected it. Nothing about ForteGB's operating scale has changed in
   the time since — same solo/family operation, same visit volume.

All three still say no. Verdict unchanged: Supabase Studio.

**"Device status" is the existing record's fields, not a new monitoring
screen.** D-052 already decided failure handling is reactive — a
synchronous check at the moment of provisioning triggers an immediate
WhatsApp alert to staff if something's wrong (offline, timeout, error).
It never called for a persistent, proactive device-status dashboard.
Reading this issue's "status do dispositivo" as requiring one would be
inventing scope D-052 never asked for; it's satisfied by whatever
Supabase Studio already shows on the emergency-code record (last
rotated, currently in use, etc.).

## Risks / Trade-offs

None — this leaf changes nothing.

## Open Questions

None.
