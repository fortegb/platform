# Dados Mock Temporários

Este diretório contém dados mock temporários que são usados para visualização do site sem a necessidade de banco de dados configurado.

## Arquivos

- `mock.ts` - Contém dados mock de casas e posts do blog

## Uso

Os dados mock são automaticamente carregados nas seguintes páginas:
- `/` (Home) - Mostra 3 casas em destaque
- `/portfolio` - Mostra todas as casas disponíveis
- `/blog` - Mostra todos os posts do blog

## Substituição por Dados Reais

Quando o banco de dados (Supabase) ou CMS (Sanity) estiver configurado:

1. Remover ou comentar os imports de `~/data/mock`
2. Implementar as chamadas reais ao banco/CMS
3. Atualizar as páginas para usar os dados reais

## Imagens

As imagens estão usando Unsplash como placeholder. Quando as imagens reais estiverem disponíveis:
- Substituir as URLs do Unsplash pelas URLs reais das imagens
- Ou usar imagens locais em `/public/images/`
