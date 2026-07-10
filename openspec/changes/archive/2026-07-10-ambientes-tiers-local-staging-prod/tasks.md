# Tasks — Ambientes tiers local/staging/prod (#147)

## 1. Canon docs

- [x] 1.1 `docs/planning/decisions.md` — append **D-025** (três ambientes: propósito, dados, integrações, promoção, hotfix preview, `APP_ENV`, local isolado, staging privado). ADR-lite, pt-BR; grilling 2026-07-10; referência a folhas irmãs.
- [x] 1.2 root `DECISIONS.md` — append dated entry summarizing the environment contract (human + technical).
- [x] 1.3 `docs/planning/architecture.md` — §7 / environments subsection point at the three environments + D-025.
- [x] 1.4 Create `docs/planning/templates/environments.md` — tier table + `APP_ENV` snippet (config template).

## 2. Platform docs (sócios)

- [x] 2.1 Create `docs/planning/ambientes.html` — dedicated page (pt-BR): three environments, rules, promotion, hotfix note, local = Nuxt/Node not Vercel.
- [x] 2.2 Add card on `docs/index.html` linking to the environments page.
- [x] 2.3 Update `docs/planning/arquitetura-decisoes.html` — replace “em definição” tease with link to the environments page.

## 3. Session compass

- [x] 3.1 `STATUS.md` — A1/#147 done; next leaf = branch→environment mapping (#148).

## 4. Verify

- [x] 4.1 D-numbering contiguous (D-025 after D-024); append-only on decisions files.
- [x] 4.2 HTML pages use portal patterns; index card + back-links work; no product/runtime code or cloud provisioning.
- [x] 4.3 `git status` — only intended files; ready to commit on `feat/ambientes-tiers-local-staging-prod`.

> **Do NOT archive or close #147 yet** — wait for human validation, then `rbo-close-change`.
