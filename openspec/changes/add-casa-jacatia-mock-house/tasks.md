## 1. Photos

- [ ] 1.1 Create `public/images/casa-jacatia/` directory
- [ ] 1.2 Copy and web-optimize the 9 `arquitetonico` photos from `casa-assets/casa03/projetos/arquitetonico` (resize/compress if any exceed ~500KB)
- [ ] 1.3 Copy and web-optimize the 27 `decoracao` photos from `casa-assets/casa03/projetos/decoracao`
- [ ] 1.4 Build the `gallery` array: arquitetônico entries first (categories: Fachada, Piscina, etc.), decoração entries after (categories: Sala de Estar, Cozinha, Suíte, Banheiro, etc.) — reuse categorization from `casa-assets/casa03/CONTEXTO.md`
- [ ] 1.5 Pick one arquitetônico photo as the `image` (cover) field

## 2. Videos

- [ ] 2.1 Add the two confirmed YouTube (Unlisted) URLs to `videoUrls`: tour externo, tour interno/decoração

## 3. `features` shape + rendering

- [ ] 3.1 In `data/mock.ts`, widen the `features` type to `(string | { text: string; grupo: 'destaque' | 'engenharia' })[]`
- [ ] 3.2 In `pages/portfolio/[slug].vue`, update the features-rendering block: if every entry is a plain string, render today's single flat list unchanged; if entries carry `grupo`, render two headed sections ("Destaques", "Diferenciais de Engenharia")
- [ ] 3.3 Verify the other 5 mock houses render identically to before (manual check in browser)

## 4. Casa Jacatiá mock entry

- [ ] 4.1 Add new entry to `mockHouses` in `data/mock.ts`: slug, title ("Casa Jacatiá"), tagline (Chamada), description (array, from Descrição), status: `'disponivel'`, area: 207, bedrooms: 3, price omitted or per user decision, featured: false
- [ ] 4.2 Populate `features` with the 24 Destaques (`grupo: 'destaque'`) + 10 Diferenciais de Engenharia (`grupo: 'engenharia'`) entries from `casa-assets/casa03/conteudo-publicacao.md`
- [ ] 4.3 Add code comment on `mockHouses` noting Casa Jacatiá is real content behind mock-data plumbing (per issue #218 exception)

## 5. Verification

- [ ] 5.1 Run dev server, view `/portfolio` — confirm Casa Jacatiá appears, status badge reads "Disponível"
- [ ] 5.2 View `/portfolio/casa-jacatia` (or chosen slug) — confirm gallery order, both videos play, grouped features render as two sections
- [ ] 5.3 Confirm search/filter on `/portfolio` still works (uses `tagline`, unaffected by this change)
- [ ] 5.4 Confirm `/corretor/casas` list still renders correctly (uses `tagline`, unaffected)
