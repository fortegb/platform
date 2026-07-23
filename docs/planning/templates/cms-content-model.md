# CMS — modelo de conteúdo (D-036 / #157)

> Contrato dos document types Sanity. **Docs only** — schemas TypeScript/Studio → build (#45).  
> Vendor/datasets: D-034 / D-035.

## Document types

| Type | v1 | Campos principais (inventário) |
|------|----|--------------------------------|
| **`house`** | Full | `houseId` (UUID = join Supabase), slug, `title` (commercial/sales name, e.g. "Residência Vila Verde" — public), `subtitle` (short tagline, ~6-10 words, sits right under the title), `tagline` (a 1-2 sentence hook/teaser, used for card previews — independently written, not a compression of `description`), **`description` as an array of paragraph strings** (not one block of text — renders as separate `<p>` tags with spacing; each house can have any number of paragraphs), `shortDescription` (a condensed 1-2 paragraph summary specifically derived from `description`, for contexts that want more than `tagline` but less than the full text), cover + **gallery grouped by category** (array of `{ categoryLabel, photos[] }` — editor names/picks a category once per group and drops all matching photos in together, rather than tagging 30 photos one at a time; `categoryLabel` free-texts against the suggested list in `galleryCategory` via `options.list`, not a hard enum — frontend flattens groups back into the `{ category, url }[]` shape components already consume), beds/baths/area, address/location copy, optional display price, optional video URL(s), `featured` (boolean — manual homepage highlight toggle), `features` (list of `{ text, grupo }` — `grupo` is `'destaque' \| 'engenharia'`; `destaque` = buyer-facing lifestyle/amenity characteristics (e.g. "Piscina com sistema automatizado"), `engenharia` = technical/construction differentiators (e.g. "Lajes protendidas"); still free-form per house, no fixed/shared vocabulary, just a two-value tag added to each entry — frontend renders as two labeled sub-lists rather than one flat checklist), `shortFeatures` (a manually curated subset of `features` — the `destaque` group alone is still ~20 items, too long for a scannable summary view; not derived by filtering, a separate hand-picked list), `floorplans` (list of `{ label, thumbnailUrl, fileUrl, type: 'image' \| 'pdf' }` — `thumbnailUrl` is a small companion preview image, `fileUrl` is the full-resolution/original file opened in a dedicated zoom viewer on click; separate from `gallery` since plans aren't cropped to a fixed aspect ratio like photos, and rendered inline in the main content column, not a standalone full-width section). `featured`/`features`/gallery `category`/`floorplans` added during #197 design pass, mock-data equivalent in `data/mock.ts`; gallery grouping + `galleryCategory` suggested-list + paragraph-array description decided same pass; `features` grouping (`grupo: 'destaque' \| 'engenharia'`) plus `subtitle`/`tagline`/`shortDescription`/`shortFeatures` added 2026-07-22 during the first real-house content pass (Casa Jacatiá / Casa 03, drafted in the `fortegb/casa-assets` repo) — this pass also renamed the old `fullDescription` to `description` and the old plain `description` (a single short string) to `shortDescription`, propagated through `data/mock.ts` and the portfolio/corretor pages that read it |
| **`galleryCategory`** | Stub | `label` (e.g. "Sala de Estar", "Área Gourmet"), `order` (int, controls tab display order). Editor-maintained in Studio (add/rename/reorder without a code deploy) — feeds `options.list` on `house.gallery[].categoryLabel` as a suggestion, not a hard constraint; editors can still free-type a category that isn't in the list. Seed values below. |
| **`blogPost`** | Full | slug, title, body, cover, publishedAt, excerpt |
| **`constructionTimeline`** | Stub | `houseId` ref, title, entries[] (date, text, optional image) — UI v3 |
| **`mediaKit`** | Stub | `houseId` ref, assets/refs — módulo v3 |
| **`contractTemplate`** | Stub | **Singleton** — corpo da minuta do contrato de parceria de corretagem (portable text / cláusulas), editável pelos sócios em Studio sem deploy. **Não é PII** (o contrato *assinado* é PII e vive no bucket privado do Supabase, D-016/D-030 — este é só o template em branco). Renderização da minuta = este template **+** termos específicos da casa (dados de `house`/Supabase). Decidido no design de #201 (D-062 nomeava "template legal existente" sem dizer onde mora); um documento que os sócios editam ao longo do tempo é o caso de uso do CMS. Implementação → Execução (#45/#86). |

### `galleryCategory` seed values

Starter list for Studio provisioning (#45) — broader than any single house's actual categories, since different houses use different subsets. Editors add/remove/rename freely once Studio exists; this is just the initial seed, not a closed vocabulary.

Fachada · Sala de Estar · Sala de Jantar · Cozinha · Quarto · Suíte · Closet · Banheiro · Lavabo · Escritório · Área Gourmet · Piscina · Varanda · Jardim · Área Externa · Garagem · Área de Serviço · Hall de Entrada · Área de Lazer · Vista

## House: Sanity vs Supabase

| Sanity (marketing) | Supabase (operacional) |
|--------------------|-------------------------|
| slug, title (commercial/sales name — public), copy, gallery (grouped by category), specs, features checklist, display price, video URLs, featured flag, floorplans | `id` (= `houseId`), **status**, `tuya_device_id`, `qr_code`, `houseNumber` (sequential internal staff code, e.g. "Casa 03" — string, stored as the literal display form, not a derived number), `lotCode` (block/lot registry designation, e.g. "U-30" — free-form string, matches source format from the loteamento/condomínio registry), ops timestamps |
| — | leads, visits, PII (never in CMS) |

### `status` — valores e o que cada um permite

Vive no **Supabase** (operacional), não no Sanity. Definido em `composables/useHouseStatus.ts`, fonte única de rótulo, cor de badge e elegibilidade de visita.

| Valor | Rótulo público | Visita autoguiada | Visita guiada ([#213](https://github.com/fortegb/platform/issues/213)) |
|---|---|---|---|
| `disponivel` | Disponível | ✅ | ✅ |
| `em-construcao` | Em Construção | ✕ | ✅ |
| `na-planta` | Na planta | ✕ | ✕ |
| `reservado` | Reservado | ✕ | ✕ |
| `vendido` | Vendido | ✕ | ✕ |

**`na-planta` adicionado em 2026-07-20** ([#198](https://github.com/fortegb/platform/issues/198)): casa que existe só como projeto, nada construído. Nome escolhido por ser o termo que o comprador brasileiro já usa, em vez de `em-projeto` (soa interno) ou `preparação` (colidiria com `em-construcao`, já que preparo de terreno é obra).

**A matriz de visita é regra de negócio, não de tela:** autoguiada destranca uma casa vazia sem ninguém presente, então só vale onde a casa está pronta e vazia. A visita guiada acrescenta uma pessoa, e é isso que torna um canteiro de obra aceitável.

**Merge:** Nuxt lê CMS + Supabase por `houseId`. `houseNumber`/`lotCode` são staff-only (nunca expostos nas páginas públicas do portfólio) mas ficam disponíveis para telas internas via esse merge, mesmo padrão já usado para `tuya_device_id`/`qr_code`.

## Defaults

- **Locale:** pt-BR only (sem i18n multi-locale por agora).
- **Vídeo:** URL YouTube/Vimeo; não hospedar ficheiro de vídeo no CMS/DB.
- **Social posts:** fora da plataforma (D-016).

## Relação

- [`cms-vendor.md`](./cms-vendor.md) · [`environments.md`](./environments.md) (datasets) · Ambientes
