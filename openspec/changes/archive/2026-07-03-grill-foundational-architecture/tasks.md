# Tasks — Foundational architecture stances (#145)

## 1. Canon docs

- [x] 1.1 `docs/planning/open-questions.md` — mark **Q-004 resolved** (→ D-016), pointing at decisions.md + architecture.md. Note Q-007 remains open (scoped out).
- [x] 1.2 `docs/planning/decisions.md` — append **D-015** (constraints + build-vs-buy), **D-016** (Q-004 content-placement taxonomy), **D-017** (serverless system shape), **D-018** (MVP v1/v2/v3 boundary). ADR-lite, pt-BR, closing the relevant question(s).
- [x] 1.3 `docs/planning/architecture.md` — §1 MVP boundary (v1/v2/v3 + lock-now list); §4 replace "Data TBD" + mermaid with confirmed stack; §5 fill data & content strategy table; §7 non-functional (Vercel Hobby→Pro, QStash, LGPD private bucket).
- [x] 1.4 root `DECISIONS.md` — append dated entry (architectural decision history) summarizing the four decisions.
- [x] 1.5 `STATUS.md` — update session compass (foundational grilling done; Q-004 resolved; next open-question order).

## 2. Platform docs (GitHub Pages)

- [x] 2.1 Create `docs/planning/arquitetura-decisoes.html` — user-readable (pt-BR, sócios/team tone), plain-language summary of the architecture + key decisions, using `portal.css` classes and the back-link header pattern.
- [x] 2.2 Add a card to `docs/index.html` (Visão do produto section) linking to the new page.

## 3. Verify

- [x] 3.1 D-numbering contiguous (D-015..D-018), no edits to existing entries (append-only).
- [x] 3.2 New HTML page renders (links resolve, back-link works) and card link is correct.
- [x] 3.3 `git status` — only intended files changed; commit on `feat/grill-foundational-architecture`.

> **Do NOT archive the change or close #145/#28 yet** — owner may add touches after review.
