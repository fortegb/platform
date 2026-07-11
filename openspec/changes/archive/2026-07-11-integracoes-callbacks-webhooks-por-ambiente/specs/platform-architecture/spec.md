## ADDED Requirements

### Requirement: Stable webhook bases by environment

The architecture SHALL document canonical public HTTPS bases for vendor-registered callbacks: production uses `https://fortegb.com`; stable staging uses `https://staging.fortegb.com`. Local development SHALL default to mock inbound callbacks and MAY use an ephemeral tunnel only for deliberate vendor callback tests. Exact route handlers are deferred to build; the documented path convention SHALL be `/api/webhooks/<vendor>`.

#### Scenario: Staging vendor webhook points at stable host

- **WHEN** a sandbox/test vendor app is configured with a callback URL
- **THEN** the host is `staging.fortegb.com`
- **AND** not a per-branch `*.vercel.app` Preview URL

### Requirement: Preview deployments bypass vendor webhooks

Vercel Preview deployments for `feat/*` and `fix/*` SHALL NOT be registered as vendor webhook targets. Inbound push events on those deployments are out of scope (bypass via mock, manual trigger, or no push). Preview password protection (D-027) SHALL remain enabled and SHALL NOT be disabled to accommodate webhooks.

#### Scenario: Feature Preview is not a HubSpot webhook target

- **WHEN** a `feat/*` Preview is deployed
- **THEN** HubSpot (or other vendors) are not updated to point at that Preview URL
- **AND** inbound CRM webhooks continue to target stable staging or remain untested on that Preview

### Requirement: Webhook signature verification

When the application receives a real vendor webhook (safe-target or prod-live), it SHALL verify the vendor signature or shared secret before performing side effects. Webhook secrets SHALL follow the same placement rules as other integration secrets (Vercel environment scopes and local gitignored `.env`; never committed to git or Platform docs HTML).

#### Scenario: Unverified webhook is rejected

- **WHEN** an inbound request to a webhook path fails signature verification
- **THEN** the handler does not apply business side effects
- **AND** the failure is observable in logs/monitoring appropriate to the environment
