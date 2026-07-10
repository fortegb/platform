## ADDED Requirements

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
