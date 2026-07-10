## MODIFIED Requirements

### Requirement: Content placement CMS plus Supabase

The system SHALL store editorial/marketing content (house listing content, blog, timeline de obra, media assets) in a managed CMS, and operational state plus sensitive PII (house status, leads, visits, verification records, signed contracts, RG/CNH documents) in Supabase, joining the two by a shared house identifier. Video SHALL be hosted by an external provider (YouTube/Vimeo) and referenced by URL. Sensitive documents SHALL live in a private Storage bucket protected by row-level security with a retention policy.

The chosen CMS vendor SHALL be **Sanity**. Contentful SHALL NOT remain the project’s installed or documented CMS client. Application code SHALL access CMS content through a service/composable boundary (e.g. `useCms`) that MAY return mocks until Sanity is provisioned.

#### Scenario: House page merges CMS and Supabase

- **WHEN** a house detail page is rendered
- **THEN** its content (photos, description, timeline) is read from the CMS and its live status is read from Supabase, merged by the shared house ID

#### Scenario: Vendor is Sanity

- **WHEN** documentation or dependencies describe the CMS vendor
- **THEN** the chosen vendor is Sanity
- **AND** the Contentful SDK is not a required project dependency

#### Scenario: Non-technical operators use vendor dashboards

- **WHEN** operators need to edit content or inspect operational data without engineering help
- **THEN** they use a vendor dashboard (e.g. Supabase Studio / Sanity Studio), with no bespoke admin UI built for that purpose
