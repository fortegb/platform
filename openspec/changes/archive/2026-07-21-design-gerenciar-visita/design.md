## Context

`/visita/gerenciar/[token]` is the self-service page a visitor opens from the management link that ships in their booking confirmation and pre-visit reminder (D-061). It is greenfield — the route does not exist, though `pages/visita/[token].vue:111` already links to it. D-061 fixes the mechanism (no-auth token page, cancel → `cancelled` + conditional `revoke()`, reschedule = cancel + rebook, staff Telegram alert, timing-based follow-up consent); the capability `journey-post-visit-reengagement` carries those behavioural requirements. This leaf designs the **screen** — its full state set per Passo 6 scope rule 3 — and stays simulated (`?estado=` driven) until Execução (#141/#81) wires the backend. This is a design/mock leaf: no `server/api/**` changes.

## Goals / Non-Goals

**Goals:**
- Build `pages/visita/gerenciar/[token].vue` covering every branch of the journey (manageable × provisioning state, plus all read-only terminal states, plus invalid token).
- Settle the two design tensions the journey creates on a no-auth destructive surface: reschedule ordering and cancel confirmation.
- Land the condominium notice as an inline, universal element.
- Align to the #197/#198 design system; run tokenization Pass 5; write the capability Purpose.

**Non-Goals:**
- No backend: no token lookup, no real `revoke()`, no cancel/rebook transaction, no Telegram alert, no consent gating — all Execução (#141/#81).
- Not designing the follow-up nurture sequence itself (D-061 scopes only the consent rule; content/cadence is Execução/v2+).
- Not resolving condominium access **strategy** (#140, Q-017) — only the informational notice.
- Not touching `/visita/[token]` (#198) — separate screen per scope rule 2.

## Decisions

### D1 — Reschedule cancels only on confirmation of the new slot (amends D-061)

**Choice:** "Remarcar" routes into the standard booking flow pre-filled; the **original visit stays active** and is cancelled only when the new booking is confirmed.

**Alternatives considered:**
- *Cancel-then-rebook, D-061's literal ordering* — cancel the current visit the instant Remarcar is clicked, then open the form. Rejected: a visitor who abandons the form has silently lost their visit with nothing in its place. On a no-auth page reached from a WhatsApp link, mid-flow abandonment is common, so this fails the exact users the feature serves.
- *Edit date/time in place* — explicitly rejected in D-061 (would reopen a closed decision; loses the verification-reuse routing that going through the booking flow gives for free).

**Why it amends D-061:** D-061's prose specifies cancel-before-rebook. This reverses the order. The **intent** of D-061 (reschedule via the normal flow, reuse verification, don't hand-edit) is preserved; only the cancellation moment moves from "on click" to "on new-slot confirmation." Registered as an amendment in `decisions.md`, cross-referenced both ways, following the established pattern (#187→D-053, #189→`crm-source-of-truth`, #196→D-062). No new mechanism — the booking flow already exists; this only defers one state transition.

*Consequence to note for Execução:* between clicking Remarcar and confirming the new slot, the visitor conceptually has one active visit (the old one) plus an in-progress booking. The old visit's `revoke()` (if provisioned) fires at the same confirmation moment, not before — Execução implements the two transitions as one commit.

### D2 — Cancel is always confirmed, and the confirmation is state-aware

**Choice:** Cancel opens a confirmation step. When the visit has reached `access_provisioned`, the confirmation states explicitly that the access code will be **deactivated immediately**; otherwise it is a plain "are you sure." Only on confirmation does the visit move to `cancelled`.

**Alternatives considered:**
- *One-click cancel, no confirmation* — rejected: too easy to trigger by accident on a no-auth page for an action that revokes a live door credential and frees a slot.
- *One generic confirmation for all states* — rejected by scope rule 3: the provisioned branch is the one where `revoke()` fires and the code stops working the moment they confirm; the pre-provisioned branch has no code to lose. A single message either over-warns (pre-provisioned) or under-warns (provisioned). Two variants of the confirmation, one branch each.

### D3 — Condominium notice: inline and universal

**Choice:** A fixed inline box beside the address on every actionable variant, generic copy ("ao chegar, identifique-se na portaria"), no per-house conditional, no click-to-reveal.

**Rationale:** Every ForteGB house today is inside a condomínio (user, walkthrough), so there is no non-condomínio branch to build — a per-house flag would be speculative (YAGNI). Access-critical arrival information must not sit behind a modal that a visitor can skip. A `ponytail:` comment records that a future non-condomínio house reintroduces the conditional. The notice is not house-strategy (#140 stays deferred); it is a heads-up.

## Risks / Trade-offs

- **D1 diverges from D-061's written ordering** → Mitigated by registering the amendment in `decisions.md` with two-way cross-references, so the divergence is canon, not drift. Execução reads the amended decision, not the original prose.
- **Simulated screen can drift from the eventual backend** → Same risk #198/#199 carry; mitigated by deriving the variant set from `visit.status` names (`cancelled`, `completed`, `declined`, `access_provisioned`, `em-analise`) exactly as D-061 / the capability name them, so the mock's state contract matches what Execução will emit. Never derive a variant from the URL.
- **Condominium notice hard-codes "always condomínio"** → Accepted and marked with `ponytail:`; reintroducing the conditional is a bounded future change, cheaper than carrying an unused flag now.

## Open Questions

None blocking. If the walkthrough during apply surfaces a screen the journey never validated (e.g. a distinct "reschedule confirmed" landing versus reusing #198's result), follow the `design-system-fluxo.md` missing-screen playbook: finish this leaf, open a separate issue against the right epic, update `screen-map.md`, and register any decision reopened.
