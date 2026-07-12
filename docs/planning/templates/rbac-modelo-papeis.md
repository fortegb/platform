# RBAC — modelo de papéis e permissões (D-055 / #183)

> Mecanismo/viabilidade do RBAC. **Docs only.** Modelo geral, não específico a corretor. Mecanismo exato de RLS, UI de atribuição, matriz de permissões detalhada → #50 (Execução). Jornada/telas → Passo 5 / #176.

## Papéis (enum único, um por usuário)

| Papel | Quem | Notas |
|-------|------|-------|
| `cliente` | Comprador | CPF liga a registro de corretor se existir (D-020) |
| `corretor` | Contratados | CRECI preferencial, mesmo fluxo sem CRECI |
| `staff` | Operação (Cláudia, Gisele + sócios em operação) | Área logada operacional |
| `admin` | Ricardo, Adilson, Felipe | Hierarquicamente ⊇ `staff` (ver abaixo) |

**Sem multi-atribuição.** Corretor e Cliente são relações mutuamente exclusivas
com o negócio — um usuário tem exatamente um papel. Sem tabela `user_roles`
many-to-many.

### O que NÃO é um papel de RBAC

- **Digital** (quem constrói a plataforma) e **Sócio/investidor** (quem é
  fundador/dono) são **fatos organizacionais**, registrados em
  `company-structure.md` — não gateiam nenhuma capacidade distinta do
  sistema por si só, não são valores do enum `role`.
- **Visitante** não é um valor armazenado — é o caso default/ausência de
  sessão para quem não tem conta. Tracking de tráfego anônimo (Google Ads,
  GA4) é preocupação separada (`#124`), eixo ortogonal à autorização.

## Hierarquia (avaliação, não armazenamento)

`admin` não é "`staff` + `admin`" armazenado — é um único papel que, na
avaliação de uma checagem de permissão, é hierarquicamente superior a
`staff`. Uma checagem `requiresRole('staff')` passa automaticamente para um
usuário `admin`. "Admin pode fazer o papel de Staff" é propriedade de
avaliação/perfil, não uma segunda atribuição.

```
admin ⊇ staff
```

`cliente` e `corretor` ficam fora dessa hierarquia — papéis externos, sem
relação de superioridade entre si nem com `staff`/`admin`.

## Enforcement — duas camadas

| Camada | Papel | Natureza |
|--------|-------|----------|
| **App-level** (middleware/rota) | Controla quais páginas/rotas um papel alcança | Conveniência de UX — não é a fronteira de segurança real |
| **Supabase RLS** (por linha) | Controla quais linhas um papel pode ler/escrever, independente de qual rota bateu no banco | **Fronteira de segurança real** |

Mesmo padrão já usado para o bucket privado de documentos (D-016/D-030). Um
bug num route guard não pode ser a única coisa entre um Corretor e os leads
de outro Corretor — por isso as duas camadas, não uma só.

## Relação

[`decisions.md`](../decisions.md) D-055 · `architecture.md` §2 (tabela de papéis original) ·
Bucket privado + RLS → D-016/D-030 · implementação → #50 (Execução) ·
jornada/telas → Passo 5 / #176 · admin (#184) assume `admin ⊇ staff`
