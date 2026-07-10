# Seed / dados de teste + LGPD (D-033 / #154)

> Contrato do pacote sintético para **local** e **staging**.  
> **Docs only** neste leaf — ficheiros `seed.sql` / PNGs de RG·CNH → quando existir `supabase/` (#171/#43).  
> Hardening LGPD completo (retenção, auditoria, páginas) → [#126](https://github.com/fortegb/platform/issues/126).  
> Fixtures de conteúdo CMS (Sanity) → [#156](https://github.com/fortegb/platform/issues/156) / [#157](https://github.com/fortegb/platform/issues/157).

## Regras

1. **Sem dump de produção** em local/staging por padrão.
2. **Um pacote base** partilhado por local e staging (staging pode ganhar linhas extra de demo depois).
3. Pessoas sintéticas com **aparência realista em pt-BR** (nomes, telefones, endereços) — inventadas; nunca clientes reais.
4. **Dummy RG/CNH** permitidos como fixtures no repo; carregar só em storage local/staging — **nunca** buckets de prod.
5. Contas de **login de teste** (corretor + staff) com passwords documentadas — só não-prod.
6. Dados **descartáveis** e **recriáveis** com um comando curto (ex. `supabase db reset` quando o seed estiver ligado).

## Conteúdo do pacote (inventário)

| Inclui | Notas |
|--------|--------|
| IDs estáveis de **casa** | Para join com CMS depois; sem dump completo de conteúdo CMS aqui |
| 1–2 **corretores** fictícios | + utilizadores `auth` de teste |
| **Staff** de teste | Conta documentada |
| **Leads** / **visitas** sintéticos | Fluxos CRM / visita |
| Fixtures **RG/CNH** (dummy) | Pasta prevista: `supabase/seed/fixtures/` (ou `docs/fixtures/seed/` até o scaffold) |

| Não inclui | Onde |
|------------|------|
| Listings/blog/media CMS | #156 / #157 |
| Jobs de retenção / política completa | #126 |
| Dados ou docs de clientes reais | — |

## Aplicação (quando implementado)

```bash
# local (após supabase/ + seed ligados)
supabase db reset   # migrações + seed

# staging: procedimento documentado de reseed (CLI); não no deploy Vercel
```

Passwords e e-mails exactos das contas de teste → preencher na implementação do seed (este ficheiro só exige que existam e estejam documentados no não-prod).

## Relação com Ambientes

- Sócios: [`ambientes.html`](../ambientes.html)  
- Contrato geral: [`environments.md`](./environments.md) · D-025…D-033  
- Runbook local: [`supabase-local.md`](./supabase-local.md)
