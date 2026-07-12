# platform-architecture Specification

## Purpose
TBD - created by archiving change grill-foundational-architecture. Update Purpose after archive.
## Requirements
### Requirement: Content placement taxonomy
The system SHALL store editorial/marketing content (house listing content, blog, timeline de obra, media assets) in a managed CMS, and operational state plus sensitive PII (house status, leads, visits, verification records, signed contracts, RG/CNH documents) in Supabase, joining the two by a shared house identifier. Video SHALL be hosted by an external provider (YouTube/Vimeo) and referenced by URL. Sensitive documents SHALL live in a private Storage bucket protected by row-level security with a retention policy. The chosen CMS vendor SHALL be Sanity. Contentful SHALL NOT remain a required project dependency; application code SHALL access CMS content through a service/composable boundary that MAY return mocks until Sanity is provisioned.

#### Scenario: House page composed from two sources
- **WHEN** a public house listing page is rendered
- **THEN** its content (photos, description, timeline) is read from the CMS and its live status is read from Supabase, merged by the shared house ID

#### Scenario: Vendor is Sanity
- **WHEN** documentation or dependencies describe the CMS vendor
- **THEN** the chosen vendor is Sanity
- **AND** the Contentful SDK is not a required project dependency

#### Scenario: Sensitive document stored privately
- **WHEN** a signed corretor contract or an identity document is stored
- **THEN** it is written to a private Supabase bucket with RLS, never to the public content store, git, or a video host

### Requirement: Sanity document types
The CMS content model SHALL define document types `house`, `blogPost`, `constructionTimeline`, and `mediaKit`. For MVP (v1), `house` and `blogPost` SHALL have full marketing fields; `constructionTimeline` and `mediaKit` MAY be stub schemas linked to a house, with UI deferred to later versions.

#### Scenario: Portfolio house content
- **WHEN** a public house listing is authored
- **THEN** it is stored as a Sanity `house` document with slug, copy, and media fields
- **AND** operational status is not treated as CMS source of truth

### Requirement: House CMS and Supabase field split
Sanity `house` documents SHALL hold marketing content and a shared `houseId` UUID used to join Supabase operational rows. Supabase SHALL own operational fields including status, smart-lock device id, and QR code. The application SHALL merge CMS and Supabase data by `houseId`.

#### Scenario: Sold house still has CMS copy
- **WHEN** a house status becomes sold in Supabase
- **THEN** CMS marketing content may still exist
- **AND** the live status shown to users comes from Supabase

### Requirement: Video and locale defaults
House (and related) content MAY include video as external embed URL fields (YouTube/Vimeo), not as binary video hosted in Sanity or Supabase. The content model SHALL assume Brazilian Portuguese (`pt-BR`) only until a later i18n decision.

#### Scenario: Video on a listing
- **WHEN** a house has a video
- **THEN** the CMS stores a provider URL/embed reference
- **AND** the application does not proxy live video through the backend

### Requirement: Integration tier postures
Third-party integrations SHALL operate under one of three postures: `mock` (in-process stub; no real vendor call), `safe-target` (real API aimed at a test/sandbox account or device), or `prod-live` (real API aimed at production resources). Postures are not environments; environments select a default posture.

#### Scenario: Local never opens a real lock by default
- **WHEN** the application runs with `APP_ENV=local` and no override
- **THEN** integrations use the `mock` posture
- **AND** no real smart-lock or paid customer messaging call is made

### Requirement: Default posture by environment
The default posture SHALL be: `local` → `mock`; `staging` and all Vercel Previews → `safe-target`; `prod` → `prod-live`. Non-production environments SHALL NOT default to `prod-live`. Production SHALL NOT default to `mock` or `safe-target`.

#### Scenario: Staging uses safe targets
- **WHEN** the application runs as staging or a Vercel Preview
- **THEN** the default integration posture is `safe-target`

### Requirement: Posture overrides and selection
Overrides SHALL be allowed only when `APP_ENV` is `local` or `staging`, and only among `{mock, safe-target}` — never `prod-live`. When `APP_ENV` is `prod`, the posture SHALL always be `prod-live` with no override. Posture SHALL NOT be inferred from credential presence. The effective posture per integration SHALL be `override[integration] ?? default(APP_ENV)`. The application SHALL select adapters via this effective posture; exact environment variable names are deferred to the config inventory leaf.

#### Scenario: Local opts into sandbox HubSpot
- **WHEN** local development sets an explicit per-integration override to `safe-target`
- **THEN** that integration may call a sandbox/test API
- **AND** it still MUST NOT use `prod-live`

### Requirement: Integration inventory and safe-target classes
The architecture SHALL document an integration map covering HubSpot, Tuya, WhatsApp, Telegram, Google Calendar, and Upstash QStash. Supabase and Sanity SHALL NOT be re-mapped here (already environment-scoped). Gov.br SHALL appear as a deferred/manual row until automated. For each mapped integration, the map SHALL name the safe-target *class* (kind of test resource), not concrete account or device identifiers.

#### Scenario: Staging HubSpot aims at a test portal class
- **WHEN** HubSpot runs under the safe-target posture
- **THEN** it targets a separate test/sandbox CRM portal class
- **AND** not the live ForteGB production portal

### Requirement: Integration MVP phases on the map
The integration map SHALL tag each integration with an MVP phase aligned to the product version boundary: HubSpot, WhatsApp, and QStash as v1; Telegram as v1 adapter seam with bots growing later; Tuya and Google Calendar as v2; Gov.br manual in v1 until automation.

#### Scenario: Tuya not required for v1 launch
- **WHEN** planning v1 safe-target provisioning
- **THEN** Tuya may be deferred to v2 while its safe-target class remains documented

### Requirement: Concrete safe-target contract with TBD slots
For each mapped integration, the architecture SHALL document a concrete safe-target contract: what the target must be, what it must not be, and named slots for identifiers to be filled when provisioned. The Architecture leaf SHALL NOT invent account IDs, phone numbers, or device serials. Secrets SHALL NOT be committed to git or published in Platform docs HTML.

#### Scenario: Tuya safe target excludes sale houses
- **WHEN** a Tuya safe-target is documented or provisioned
- **THEN** it is a dedicated test device
- **AND** it is not a lock installed on a house offered for sale

### Requirement: Safe-target secret placement
API keys and tokens for safe-targets SHALL live in Vercel environment scopes (Preview = staging-class; Production = prod) and local gitignored `.env` files. Non-secret labels (e.g. test portal display name) MAY be recorded in the safe-targets template when known. Exact environment variable names and full credential runbooks are deferred to later config leaves.

#### Scenario: Staging Preview uses staging-class secrets
- **WHEN** a Vercel Preview deployment needs HubSpot credentials
- **THEN** it uses Preview/staging-class secrets aimed at the test portal
- **AND** not Production portal credentials

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

### Requirement: Environment variable naming convention
The architecture SHALL document a naming convention for application environment variables: `SCREAMING_SNAKE_CASE`; client-exposed values MUST use the `NUXT_PUBLIC_` prefix; server-only secrets MUST NOT use that prefix; vendor-related keys MUST use a stable vendor prefix (`SUPABASE_`, `SANITY_`, `HUBSPOT_`, `WHATSAPP_`, `TELEGRAM_`, `TUYA_`, `GOOGLE_CALENDAR_`, `QSTASH_`). Logical environment identity SHALL remain `APP_ENV` with values `local`, `staging`, and `prod`.

#### Scenario: Public WhatsApp number is client-safe
- **WHEN** a value must be readable in the browser (e.g. contact WhatsApp number)
- **THEN** it is named with the `NUXT_PUBLIC_` prefix
- **AND** API tokens for the same vendor remain without that prefix

### Requirement: Environment variable inventory
The architecture SHALL maintain an inventory of required and planned environment variable names with purpose, public-vs-secret classification, and MVP phase (v1/v2). The inventory SHALL cover runtime identity, Supabase, Sanity, HubSpot, WhatsApp, Telegram, QStash, Tuya, Google Calendar, optional webhook secrets, and optional per-integration posture overrides. Exact Vercel Production/Preview placement rules are deferred to the scoping leaf; `.env.example` materialization is deferred to the credentials-template leaf.

#### Scenario: Inventory names posture overrides
- **WHEN** a non-prod environment needs an explicit integration posture override
- **THEN** the documented name follows `INTEGRATION_TIER_<VENDOR>`
- **AND** allowed values are `mock`, `safe-target`, or `prod-live` subject to D-037 rules

### Requirement: Environment value scoping surfaces
The architecture SHALL document exactly three required surfaces for environment variable **values**: Vercel Production scope, Vercel Preview scope, and local gitignored `.env` / `.env.local` files. Variable **names** SHALL follow the inventory convention; scopes SHALL NOT invent alternate names per surface. Vercel Development scope SHALL NOT be required as a fourth logical environment.

#### Scenario: Feature Preview uses Preview-scoped values
- **WHEN** a `feat/*` deployment runs on Vercel
- **THEN** it receives Preview-scoped environment values
- **AND** `APP_ENV` is `staging`
- **AND** it does not use Production-scoped secrets

### Requirement: Backend class per scope
Vercel Production SHALL carry production backends and `APP_ENV=prod`. Vercel Preview SHALL carry staging-class backends and `APP_ENV=staging` for both the long-lived `staging` branch and all feature/fix Previews. Local SHALL default to `APP_ENV=local` with local/mock backends; pointing local at staging-class credentials SHALL be an explicit override; local SHALL NOT default to production credentials.

#### Scenario: Production and Preview coexist with different secrets
- **WHEN** Production and a Preview deployment are both live
- **THEN** each uses its own scoped secret set
- **AND** Preview continues to use staging-class backends while Production uses production backends

### Requirement: Secrets ownership and access
The architecture SHALL document that ForteGB tech is the accountable owner of production and staging-class secrets. Non-technical partners SHALL NOT be granted access to Vercel environment variable scopes or vendor API keys by default. Local `.env` files SHALL remain on authorized developer machines only and SHALL stay gitignored.

#### Scenario: Partner uses Preview without env access
- **WHEN** a sócio needs to review a staging Preview
- **THEN** they use the password-gated Preview URL
- **AND** they are not given Vercel environment or API-key access

### Requirement: Secrets handling and rotation
Secrets SHALL NOT be committed to git, published in Platform docs HTML, or pasted into GitHub issues, pull requests, OpenSpec artifacts, or partner chat channels. The architecture SHALL document rotation triggers (leak, device loss, vendor compromise) and an outline leak response (revoke/rotate, update Vercel and local env, record privately). A separate paid secrets manager is NOT required for v1.

#### Scenario: Suspected leaked HubSpot key
- **WHEN** a production HubSpot API key is suspected leaked
- **THEN** the key is revoked/rotated at the vendor
- **AND** Vercel Production (and any affected local copy) is updated
- **AND** the incident note is kept out of public Platform docs

### Requirement: Committed env example file
The repository SHALL include a root `.env.example` that lists every inventory environment variable name with empty or non-secret placeholder values and SHALL NOT contain real API keys or tokens. The file SHALL be safe to commit and SHALL be the copy source for local `.env` setup.

#### Scenario: Developer bootstraps local env
- **WHEN** a developer runs `cp .env.example .env`
- **THEN** the resulting file contains the canonical variable names from the inventory
- **AND** no production or staging secret values are present in `.env.example`

### Requirement: SETUP-CREDENTIALS structure
`docs/SETUP-CREDENTIALS.md` SHALL document, without embedding secret values: how to obtain each credential family, where to place values (local `.env` vs Vercel Production/Preview per scoping rules), and pointers to the secrets access policy. It SHALL NOT document removed vendors (e.g. Contentful) as current stack. Local secret files (`.env`, `.env.local`) SHALL be gitignored.

#### Scenario: HubSpot section has no pasted key
- **WHEN** a reader follows the HubSpot section of SETUP-CREDENTIALS
- **THEN** they see how to create/obtain a key and which env var name to set
- **AND** the document does not include a real or JWT-shaped sample secret value

### Requirement: Serverless runtime
The system SHALL run as a serverless Nuxt/Nitro application hosted on Vercel, expose its backend logic as an API-first server layer reusable by web, future mobile/PWA, and bots, and perform delayed and retried asynchronous work via a managed queue/scheduler (Upstash QStash). The application SHALL remain host-portable via Nitro presets.

#### Scenario: Delayed job runs reliably
- **WHEN** a task must run after a delay (e.g. password expiry, reminder, follow-up)
- **THEN** it is scheduled through the managed queue with retries, not through an always-on process

### Requirement: Build-vs-buy default
The system SHALL use managed/SaaS services wherever a suitable option exists and SHALL NOT self-host infrastructure or build back-office admin UIs for owner-only content editing; custom code is reserved for the unique flows (visits/identity, corretor).

#### Scenario: Owner edits house data
- **WHEN** the owner needs to edit house data or upload photos
- **THEN** they use a vendor dashboard (e.g. Supabase Studio / the CMS), with no bespoke admin UI built for that purpose

### Requirement: MVP v1 boundary
The v1 release SHALL include the public site, real portfólio, a WhatsApp visit CTA, authentication with roles, and the corretor portal (onboarding, lead registration with first-wins commission timestamp, HubSpot sync) with Gov.br contract signing handled manually. Self-guided tours (booked and QR), Tuya, identity verification, and calendar automation SHALL be deferred to v2.

#### Scenario: v1 visit request
- **WHEN** a visitor requests a visit in v1
- **THEN** the request is routed via a WhatsApp CTA for manual coordination, without automated identity verification or smart-lock password issuance

### Requirement: Foundational seams locked in v1
The v1 implementation SHALL establish, even where the dependent feature is deferred, the core data model with stable IDs (house, user, lead, corretor, with forward-looking references for visit and contract), an RBAC role model covering all planned roles, the integration-adapter seam, and the chosen async/queue mechanism.

#### Scenario: Deferred feature does not require refactor
- **WHEN** a v2 feature (e.g. tours) is later built
- **THEN** it references existing house/user IDs and adds a new integration adapter without reworking the v1 data model or role structure

### Requirement: Mock posture defaults to happy path
Every vendor adapter's `mock` posture implementation SHALL return a
successful, realistic-shaped response by default. It SHALL NOT require any
configuration to produce a working happy-path response.

#### Scenario: Default local dev call
- **WHEN** a vendor adapter is called under the `mock` posture with no
  override set
- **THEN** it returns a successful response shaped like the real API's
  success response

### Requirement: Mock failure override is a per-vendor boolean env var
Each vendor adapter's mock implementation SHALL support forcing a failure
response via a dedicated environment variable following the
`MOCK_<VENDOR>_FORCE_ERROR` naming convention. This SHALL be the only
override mechanism — no config file, no code parameter, no per-call option.

#### Scenario: Developer forces a failure
- **WHEN** a developer sets `MOCK_<VENDOR>_FORCE_ERROR=true` in
  `.env.local` for a given vendor
- **THEN** that vendor's adapter returns a failure response instead of the
  default success response

### Requirement: Mock failure override is not parameterized by failure type
The mock failure override SHALL NOT support specifying a particular failure
type (HTTP status code, timeout, malformed response, etc.) — a single
generic failure SHALL be sufficient. Failure-type-specific behavior SHALL
be validated against the safe-target tier instead.

#### Scenario: Developer needs to test a specific error code path
- **WHEN** code needs to handle a specific vendor error type differently
- **THEN** that is validated against the real sandbox API at the
  safe-target tier, not by parameterizing the local mock further

### Requirement: Mocks live inside each vendor's adapter module
Mock implementations SHALL live inside the same adapter module as the real
implementation for that vendor, selected by posture at the existing
adapter boundary. A separate, centralized mocks directory SHALL NOT be
introduced.

#### Scenario: Locating a vendor's mock
- **WHEN** looking for a vendor's mock implementation
- **THEN** it is found inside that vendor's own adapter module, not a
  separate shared location

