# Admin — resolução do conflito build-vs-buy (D-056 / #184)

> Resolução do "conflito" entre a regra "sem admin bespoke" e a necessidade real de UI operacional. **Docs only.** Telas concretas → Passo 5 (#176) + issues de build específicas.

## O reframe

"Admin" tinha dois significados distintos sendo conflados:

| Categoria | Exemplo | Resolução |
|-----------|---------|-----------|
| **Edição de conteúdo** | Casas, fotos, blog | Dashboard do vendor (Sanity Studio) — regra original de `platform-architecture` **continua correta**, sem mudança |
| **UI de fluxo operacional** | Aprovar corretor, revisar fila de exceção de verificação, atribuir papel RBAC | Categoria que a regra original **nunca endereçou** — precisa de teste próprio (abaixo) |

Não era um conflito de arquitetura real — era um requirement escrito de forma
estreita demais, que precisa de emenda para nomear a segunda categoria.

## Teste de três partes (build custom só se ≥1 verdadeiro)

1. **Workflow multi-etapa com efeitos colaterais** — a ação faz mais que
   mudar um valor (ex.: aprovar corretor notifica + libera portal; aprovar
   exceção de verificação dispara `provisionAccess`).
2. **Renderização específica de domínio** que um dashboard genérico não faz
   razoavelmente (ex.: selfie + documento lado a lado para julgamento humano).
3. **Precisa ser seguro para staff não-técnico** (Cláudia, Gisele) sem tocar
   tabela diretamente.

Se **nenhum** aplicar → fica no dashboard do vendor (Supabase Studio/Sanity
Studio). Mesma regra original, sem exceção.

### Reclassificação do já decidido

| Necessidade | Bate no teste? | Onde vive |
|-------------|-----------------|-----------|
| Aprovação de corretor onboarding | (1), (2) | UI custom, `/staff/*` |
| Fila de exceção de verificação (D-053) | (1), (2) | UI custom, `/staff/*` |
| Rotação de código de emergência Tuya (D-052) | Nenhum | Supabase Studio (mantido) |
| Atribuição de papel RBAC (D-055/#50) | (1), (3) | UI custom, `/staff/*` (ação admin-only) |

## Namespace de rota + RBAC

Um único **`/staff/*`** para toda UI de fluxo operacional, gateado a nível
`staff` pelo middleware de `D-055`. Admin já passa em qualquer checagem de
nível Staff por hierarquia — **sem árvore `/admin/*` separada**. Ações
genuinamente Admin-only (config de plataforma, API keys, atribuição de
papel) ficam com checagem mais estrita por rota/ação dentro da mesma árvore.

## Emenda ao requirement existente

Corrige diretamente `openspec/specs/platform-architecture/spec.md`
("Build-vs-buy default") — delta `MODIFIED Requirements`, não nova
capability. A regra sobre conteúdo permanece; a categoria de fluxo
operacional é nomeada explicitamente como legítima quando bate no teste.

## Relação

[`decisions.md`](../decisions.md) D-056 ·
`openspec/specs/platform-architecture/spec.md` (requirement emendado) ·
RBAC/hierarquia → D-055 · Tuya (exemplo "nenhum bate no teste") → D-052 ·
Verificação (exemplo "bate no teste") → D-053 · telas → Passo 5 / #176
