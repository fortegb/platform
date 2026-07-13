# Jornada: configuração de plataforma e papéis (D-067 / #195)

> Décima primeira e **última leaf de Passo 5** (epic #176) grillada.
> **Docs only.** Diferente da maioria — o rascunho não só ficou
> desatualizado, contradizia diretamente D-056 e D-043. Implementação
> real → Execução (#119, #72).

## Correções vs. contradições

| Item do rascunho | Rascunho dizia | Correção (esta leaf) |
|---|---|---|
| Rotas | `/admin/*` | `/staff/*` — D-056 já rejeitou árvore separada |
| Chaves API | "Restrito a admin" (implicava CRUD) | Referência somente-leitura; edição real no Vercel, só ForteGB tech (D-043) |
| Ocultar casa | Flag/tela na plataforma | Sanity Studio (rascunho/despublicação nativos) — sem tela ForteGB |
| Modo manutenção | (implícito, sem mecanismo definido) | Flag viva no Supabase — **exceção deliberada** ao padrão vendor-native acima |
| Atribuição de papel | "Convidar usuários" | Convite por e-mail, papel pré-atribuído — funcionalidade nova, sem conflito |

## Por que chaves API é uma contradição real, não só desatualização

D-043 já decidiu: "Owner: ForteGB tech — único com escrita em env
Production/Preview e API keys" e "Sócios: sem acesso a secrets." Como
"Digital" (Ricardo, Felipe) é fato organizacional distinto do papel RBAC
`admin` (D-055 já faz essa distinção), um sócio-admin que não é tech
(ex. Adilson) **não deveria** ter acesso a secrets sob D-043 — mas o
rascunho dizia "restrito a admin" como se qualquer admin pudesse. Corrigido
para referência somente-leitura.

## Por que modo manutenção quebra o padrão vendor-native, de propósito

Os outros três achados desta leaf seguem o mesmo padrão já visto em Tuya
(#194): "não construa o que o vendor já resolve." Modo manutenção é a
exceção correta, não uma inconsistência — o padrão nunca foi "evite todo
armazenamento in-app", foi "evite reconstruir o que um vendor já resolve".
Nenhum vendor resolve "deixar qualquer admin tirar o site do ar
instantaneamente, sem deploy, sem depender de tech." Uma env var Vercel
exigiria redeploy e, por D-043, só tech poderia mudá-la — anulando o
propósito de um toggle de emergência.

## Fora de escopo

"Relatórios agregados" e "Exceções de comissão / void de registro" do
rascunho original — não estão no escopo declarado da issue #195 (papel,
flags, chaves API). Permanecem lacunas sem leaf própria, não construídas
aqui.

## Relação

[`decisions.md`](../decisions.md) D-067 · `rbac-role-model` (D-055, não
modificada — mecanismo de convite é aditivo) · `platform-architecture`
(D-056, namespace + build-vs-buy, consumida) · secrets access policy
(D-043, consumida) · `openspec/specs/journey-platform-admin-config/`
(capability) · implementação → #119, #72

---

**Epic #176 (Jornadas, telas e fluxos) — todas as 11 leaves concluídas**
(#185–#195). Passo 5 fechado.
