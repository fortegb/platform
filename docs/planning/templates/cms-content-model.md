# CMS — modelo de conteúdo (D-036 / #157)

> Contrato dos document types Sanity. **Docs only** — schemas TypeScript/Studio → build (#45).  
> Vendor/datasets: D-034 / D-035.

## Document types

| Type | v1 | Campos principais (inventário) |
|------|----|--------------------------------|
| **`house`** | Full | `houseId` (UUID = join Supabase), slug, title, short/full description, cover + gallery (each gallery image carries a `category` string — e.g. Sala, Cozinha, Quarto, Banheiro, Área Externa — for per-house photo grouping/tabs), beds/baths/area, address/location copy, optional display price, optional video URL(s), `featured` (boolean — manual homepage highlight toggle), `features` (string list — free-form characteristics/amenities checklist, e.g. "Piscina", "Suíte master com closet"; independent per house, no fixed/shared vocabulary), `floorplans` (list of `{ label, url, type: 'image' \| 'pdf' }` — one entry per floor/document, rendered full-width below the description/specs grid, separate from `gallery` since plans aren't cropped to a fixed aspect ratio like photos). `featured`/`features`/gallery `category`/`floorplans` added during #197 design pass, mock-data equivalent in `data/mock.ts` |
| **`blogPost`** | Full | slug, title, body, cover, publishedAt, excerpt |
| **`constructionTimeline`** | Stub | `houseId` ref, title, entries[] (date, text, optional image) — UI v3 |
| **`mediaKit`** | Stub | `houseId` ref, assets/refs — módulo v3 |

## House: Sanity vs Supabase

| Sanity (marketing) | Supabase (operacional) |
|--------------------|-------------------------|
| slug, titles, copy, gallery (with per-image category), specs, features checklist, display price, video URLs, featured flag, floorplans | `id` (= `houseId`), **status**, `tuya_device_id`, `qr_code`, ops timestamps |
| — | leads, visits, PII (never in CMS) |

**Merge:** Nuxt lê CMS + Supabase por `houseId`.

## Defaults

- **Locale:** pt-BR only (sem i18n multi-locale por agora).
- **Vídeo:** URL YouTube/Vimeo; não hospedar ficheiro de vídeo no CMS/DB.
- **Social posts:** fora da plataforma (D-016).

## Relação

- [`cms-vendor.md`](./cms-vendor.md) · [`environments.md`](./environments.md) (datasets) · Ambientes
