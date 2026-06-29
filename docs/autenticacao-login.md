# Autenticação / Login — Comportamento atual (UI) e pendências de back-end

> Documento de referência da tela de login (`pages/login.vue`).
> **Estado atual:** apenas **UI** + um **mock** de diferenciação de contas.
> A lógica real de autenticação/cadastro ainda **não** está implementada.

---

## 1. Visão geral do fluxo (identifier-first)

A tela segue o padrão moderno **"identifier-first"** (e-mail primeiro), usado por Google, Slack, Notion etc. O usuário informa o e-mail e, conforme a conta exista ou não, é direcionado para **login** ou **cadastro** — tudo num único fluxo, sem link separado de "Cadastre-se".

```
Usuário digita e-mail → clica "Continuar"
            │
            ▼
   esse e-mail já tem conta?
        │                 │
       SIM               NÃO
        │                 │
        ▼                 ▼
  Tela "Senha"      Tela "Criar senha"
   (login)            (cadastro)
```

### Etapas (estados da tela)

A página tem uma variável `step` com três estados, todos na mesma moldura (logo + card):

| `step`       | Título               | Conteúdo |
|--------------|----------------------|----------|
| `email`      | Acesse sua conta     | Botões sociais (Google, Facebook) → "ou" → campo E-mail + "Continuar" |
| `password`   | Acesse sua conta     | E-mail + "Alterar", campo Senha (com mostrar/ocultar), "Entrar", "Esqueci a senha" |
| `create`     | Criar sua conta      | E-mail + "Alterar", "Criar senha" + "Confirmar senha", "Criar conta" |

Em todas as etapas há, no rodapé do card, a nota de **Termos de Uso** e **Política de Privacidade**.

---

## 2. Comportamento mockado (somente front-end)

A diferenciação "conta existente vs nova" está **simulada** no front, em `handleContinue`:

```js
// MOCK (UI): e-mails tratados como "conta já existente".
const mockExistingEmails = ['a@b.com']
// ...
const exists = mockExistingEmails.includes(form.email.trim().toLowerCase())
step.value = exists ? 'password' : 'create'
```

| E-mail digitado | Resultado |
|-----------------|-----------|
| `a@b.com`       | Tela **Senha** (conta existente → login) |
| `c@d.com` (e quaisquer outros) | Tela **Criar senha** (conta nova → cadastro) |

Validações de UI já presentes:
- "Continuar": valida formato do e-mail.
- "Criar conta": senha mínima de 8 caracteres e confirmação igual.

> ⚠️ Nada disso autentica de verdade — é apenas navegação entre telas.

---

## 3. O que precisa ser feito no back-end (futuro)

### 3.1. Verificação de existência do e-mail (substituir o mock)
- Criar **server route** do Nuxt: `server/api/auth/check-email.post.ts`.
- Deve rodar **no servidor**, usando a `SUPABASE_SERVICE_ROLE_KEY` (nunca expor no client).
- Consulta se há usuário com aquele e-mail (via `admin.auth.admin.listUsers()` ou tabela `profiles`).
- Retorna `{ exists: boolean }`.
- No `handleContinue`, trocar o mock por:
  ```js
  const { exists } = await $fetch('/api/auth/check-email', {
    method: 'POST', body: { email: form.email }
  })
  step.value = exists ? 'password' : 'create'
  ```

### 3.2. Cadastro real (`handleSignup`)
- Hoje só valida no front (TODO marcado no código).
- Implementar `supabase.auth.signUp({ email, password })`.
- Criar registro de **perfil** associado (tabela `profiles`) com o **papel/role** do usuário.
- Tratar confirmação de e-mail (se habilitada no Supabase).

### 3.3. Login social (Google e Facebook)
- A UI já chama `supabase.auth.signInWithOAuth({ provider })`.
- **Falta configurar os provedores no painel do Supabase** (Authentication → Providers):
  - **Google:** credenciais OAuth no Google Cloud Console.
  - **Facebook:** app no Facebook Developers.
- Definir URLs de callback/redirect corretas por ambiente (dev/prod).

### 3.4. Redirecionamento por perfil (multi-role)
- Hoje o pós-login é **fixo** em `/corretor/dashboard` (ver `handleLogin`, `handleSocialLogin` e `middleware/realtor-auth.ts`).
- A área logada atenderá **vários perfis**: **admin**, **proprietário (ForteGB)**, **cliente** e **corretor**.
- Após autenticar, detectar o **role** e redirecionar ao painel correspondente:
  | Perfil | Destino (a definir) |
  |--------|---------------------|
  | admin | painel administrativo |
  | proprietário | gestão de imóveis/negócio |
  | cliente | área do cliente (visitas, documentos) |
  | corretor | `/corretor/dashboard` |
- Revisar o middleware (`middleware/realtor-auth.ts`), hoje específico de corretor, para ser **por role**.

### 3.5. Páginas auxiliares ainda inexistentes
- **`/recuperar-senha`** — link existe (etapa de senha), página não. Implementar com `supabase.auth.resetPasswordForEmail()`.
- (O link "Cadastre-se" foi **removido**; o cadastro passou a ser embutido no fluxo identifier-first. A rota `/cadastro` não é mais necessária, salvo decisão em contrário.)

### 3.6. Segurança e LGPD
- **Account enumeration:** o fluxo revela se um e-mail tem conta. Mitigar o endpoint `/api/auth/check-email` com **rate limiting** e/ou **captcha**.
- **Alternativa mais segura (avaliar):** fluxo **magic link/OTP** (sempre envia código/link por e-mail; cria a conta se não existir) — elimina a enumeração.
- Regras de senha (tamanho/força), confirmação de e-mail, tratamento de erros, e conformidade LGPD (consentimento, retenção).

---

## 4. Arquivos envolvidos

| Arquivo | Papel |
|---------|-------|
| `pages/login.vue` | Tela de login (UI + mock). Pontos de integração: `handleContinue`, `handleSignup`, `handleLogin`, `handleSocialLogin` |
| `middleware/realtor-auth.ts` | Proteção de rotas (hoje específico de corretor → tornar por role) |
| `pages/corretor/dashboard.vue` | Destino pós-login atual + logout |
| `server/api/auth/check-email.post.ts` | **A criar** — verificação de e-mail existente |

---

## 5. Resumo dos pontos de integração no código

- `handleContinue` → trocar `mockExistingEmails` pela chamada ao endpoint real.
- `handleSignup` → implementar `signUp` + criação de perfil/role.
- `handleLogin` / `handleSocialLogin` → ajustar redirecionamento fixo para roteamento por perfil.
- `middleware/realtor-auth.ts` → generalizar de "corretor" para "role".
