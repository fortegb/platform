## 1. Photos

- [x] 1.1 Create `public/images/casa-jacatia/` directory
- [x] 1.2 Copy and web-optimize the 9 `arquitetonico` photos from `casa-assets/casa03/projetos/arquitetonico` (resize/compress if any exceed ~500KB)
- [x] 1.3 Copy and web-optimize the 27 `decoracao` photos from `casa-assets/casa03/projetos/decoracao`
- [x] 1.4 Build the `gallery` array: arquitetônico entries first (categories: Fachada, Piscina, etc.), decoração entries after (categories: Sala de Estar, Cozinha, Suíte, Banheiro, etc.) — reuse categorization from `casa-assets/casa03/CONTEXTO.md`
- [x] 1.5 Pick one arquitetônico photo as the `image` (cover) field

## 2. Videos

- [x] 2.1 Add the two confirmed YouTube (Unlisted) URLs to `videoUrls`: tour externo, tour interno/decoração — also required extending `useVideoEmbed.ts`'s regex to match `youtube.com/shorts/{id}` (was only matching `watch?v=`/`youtu.be/`, would have silently dropped both videos)

## 3. `features` shape + rendering

- [x] 3.1 In `data/mock.ts`, widen the `features` type to `(string | { text: string; grupo: 'destaque' | 'engenharia' })[]`
- [x] 3.2 In `pages/portfolio/[slug].vue`, update the features-rendering block: if every entry is a plain string, render today's single flat list unchanged; if entries carry `grupo`, render two headed sections ("Destaques", "Diferenciais de Engenharia")
- [x] 3.3 Verified by logic trace: existing 5 houses' `features` are plain strings, `isGrouped` evaluates false, `featureGroups.flat` = original array unchanged — visual confirmation still pending (see 5.1)

## 4. Casa Jacatiá mock entry

- [x] 4.1 Add new entry to `mockHouses` in `data/mock.ts`: slug, title ("Casa Jacatiá"), tagline (Chamada), description (array, from Descrição), status: `'disponivel'`, area: 207, bedrooms: 3, bathrooms: 4, price omitted per user decision, featured: false
- [x] 4.2 Populate `features` with the 24 Destaques (`grupo: 'destaque'`) + 11 Diferenciais de Engenharia (`grupo: 'engenharia'`) entries from `casa-assets/casa03/conteudo-publicacao.md` (proposal/tasks said "10" — miscount in planning docs; actual locked content has 11, data matches the real content)
- [x] 4.3 Add code comment on `mockHouses` noting Casa Jacatiá is real content behind mock-data plumbing (per issue #218 exception)

## 5. Verification

- [ ] 5.1 Run dev server, view `/portfolio` — confirm Casa Jacatiá appears, status badge reads "Disponível" (**left for user's own browser** per established preference — not run by the agent)
- [ ] 5.2 View `/portfolio/casa-jacatia` — confirm gallery order, both videos play, grouped features render as two sections (**left for user**)
- [ ] 5.3 Confirm search/filter on `/portfolio` still works (uses `tagline`, unaffected by this change) (**left for user**)
- [ ] 5.4 Confirm `/corretor/casas` list still renders correctly (uses `tagline`, unaffected) (**left for user**)
