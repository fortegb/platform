# Platform architecture — foundational stances

## ADDED Requirements

### Requirement: Content placement taxonomy
The system SHALL store editorial/marketing content (house listing content, blog, timeline de obra, media assets) in a managed CMS, and operational state plus sensitive PII (house status, leads, visits, verification records, signed contracts, RG/CNH documents) in Supabase, joining the two by a shared house identifier. Video SHALL be hosted by an external provider (YouTube/Vimeo) and referenced by URL. Sensitive documents SHALL live in a private Storage bucket protected by row-level security with a retention policy.

#### Scenario: House page composed from two sources
- **WHEN** a public house listing page is rendered
- **THEN** its content (photos, description, timeline) is read from the CMS and its live status is read from Supabase, merged by the shared house ID

#### Scenario: Sensitive document stored privately
- **WHEN** a signed corretor contract or an identity document is stored
- **THEN** it is written to a private Supabase bucket with RLS, never to the public content store, git, or a video host

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
