## MODIFIED Requirements

### Requirement: Build-vs-buy default

The system SHALL use managed/SaaS services wherever a suitable option exists and SHALL NOT self-host infrastructure. For **content editing** (house listings, photos, blog posts, and similar editorial/marketing content), the system SHALL NOT build a bespoke admin UI — content editing SHALL be done through a vendor dashboard (e.g. Supabase Studio, Sanity Studio).

For **operational workflow UI** (staff-facing screens that act on customer, corretor, or visit data as part of a business process — e.g. approving a corretor, reviewing an identity-verification exception, assigning a role), custom application UI SHALL be considered justified only when at least one of the following holds:
1. The action is a multi-step workflow with side effects beyond changing a stored value (e.g. it also sends a notification, updates related records, or triggers another system).
2. The action requires domain-specific rendering that a generic vendor dashboard cannot reasonably provide (e.g. comparing a selfie against a document photo for a human match decision).
3. The action needs to be safely usable by non-technical staff without direct access to a database table editor.

When none of these hold, the operational need SHALL also be served by a vendor dashboard, not custom UI. Custom code remains reserved for the unique flows the platform exists to provide (visits/identity, corretor); this requirement governs which of those flows' *supporting* UI may be custom-built versus left to a vendor tool.

#### Scenario: Owner edits house content via vendor dashboard

- **WHEN** the owner needs to edit house data, upload photos, or write a blog post
- **THEN** they use a vendor dashboard (e.g. Supabase Studio / Sanity Studio), with no bespoke admin UI built for that purpose

#### Scenario: Staff approves a corretor through custom UI

- **WHEN** staff reviews and approves a corretor's onboarding
- **THEN** this SHALL be a custom UI screen, since approval triggers a notification and unlocks portal access beyond a simple value change

#### Scenario: Staff reviews an identity-verification exception through custom UI

- **WHEN** staff reviews a visitor's selfie and document photo to approve or reject a failed automated identity match
- **THEN** this SHALL be a custom UI screen, since a generic vendor dashboard cannot reasonably render a side-by-side photo comparison for human judgment

#### Scenario: Emergency-code rotation stays on the vendor dashboard

- **WHEN** staff rotates a house's Tuya emergency access code
- **THEN** this SHALL continue to use the vendor dashboard (Supabase Studio table editor), since the action is a single value change with no side effects, no domain-specific rendering, and is performed by technical staff

## ADDED Requirements

### Requirement: Single operational workflow route namespace

Custom operational workflow UI (as scoped by the Build-vs-buy default requirement) SHALL live under a single `/staff/*` route namespace, gated at `staff`-level access via the platform's RBAC hierarchy. The system SHALL NOT maintain a separate `/admin/*` route tree for the same class of screens; Admin-only actions within `/staff/*` SHALL be gated by stricter per-route or per-action role checks rather than a duplicate UI tree.

#### Scenario: An Admin reaches a Staff-level screen without a separate admin route

- **WHEN** a user with the `admin` role navigates to an operational workflow screen under `/staff/*`
- **THEN** they are granted access via the same route, since `admin` passes any `staff`-level permission check by hierarchy

#### Scenario: An Admin-only action is gated within the shared namespace

- **WHEN** a `/staff/*` screen contains an action reserved for `admin` (e.g. platform configuration, role assignment)
- **THEN** that specific action is gated by an `admin`-level check
- **AND** it does not require a separate route tree from the rest of the screen
