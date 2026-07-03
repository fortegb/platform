# Foco actual — Ricardo

> Editado manualmente (ou na sessão com IA). O gerador `npm run progress:report` incorpora este texto na secção **Em foco agora**.  
> **Board:** mover issues activas para **In Progress** no [Project platform](https://github.com/orgs/fortegb/projects/1) para aparecerem automaticamente.

### Publicar para sócios (GitHub Pages)

1. Regenerar: `npm run progress:report` → commit `progresso-socios.html`
2. Repo **Settings → Pages →** Source: branch `main`, folder **`/docs`**
3. URL estável: `https://fortegb.github.io/platform/planning/progresso-socios.html`  
   (Repo privado: Pages privado requer plano GitHub Team; alternativa — abrir o HTML no browser ou Imprimir/PDF.)

**Actualizado:** 2026-07-02

---

## Em foco agora

- **Documentação de governação e corretores** — `company-structure.md`, contrato v0.1, apresentação aos sócios (modelo de negócio).
- **Epic Architecture ([#1](https://github.com/fortegb/platform/issues/1))** — grilling Q-003 parcialmente resolvido; próximo: Q-004 (CMS vs DB), Q-005/Q-006 (visitas).
- **Relatório de progresso** — esta página HTML ligada ao board GitHub (auto-actualizada com `npm run progress:report`).

## Próximo passo

1. Grilling **Q-004** — Contentful vs Supabase para portfólio/blog.
2. Completar **`architecture.md`** e fechar epic #1 → desbloqueia Phase 1.
3. **Brand assets** ([#2](https://github.com/fortegb/platform/issues/2)) em paralelo — logos e brand guide dos sócios.

## Notas para sócios

- Phase 0 (fundação org + planning + board) está **concluída**.
- Ainda **não há código novo** de Phase 1 — bloqueado até Architecture Done (decisão técnica conjunta).
- Decisões de negócio recentes (corretor, comissão, Gov.br) estão em [`company-structure.md`](./company-structure.md); a apresentação [`apresentacao-socios.html`](./apresentacao-socios.html) é um snapshot desse tema.
