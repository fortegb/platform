# Passo 1: Configuração de Credenciais das APIs

Este guia explica como obter e configurar todas as credenciais necessárias para o projeto ForteGB.

## 📋 Visão Geral

O projeto precisa de credenciais de várias APIs e serviços. Você precisa criar um arquivo `.env` na raiz do projeto com todas essas variáveis.

## 🔧 Como Configurar

### 1. Criar o arquivo `.env`

Na raiz do projeto (`/Users/rbonon/Documents/ForteGBCursor`), crie um arquivo chamado `.env` (sem extensão).

**Importante:** O arquivo `.env` já está no `.gitignore`, então suas credenciais não serão commitadas no Git.

### 2. Copiar o template

Você pode usar o arquivo `.env.example` como base. Copie-o para `.env`:

```bash
cp .env.example .env
```

## 🔑 Credenciais Necessárias

### 1. Supabase (Obrigatório)

**O que é:** Banco de dados PostgreSQL e autenticação.

**Como obter:**
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Crie um novo projeto
4. Vá em **Settings** → **API**
5. Copie as seguintes informações:

```env
# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
NUXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

**Onde encontrar:**
- `SUPABASE_URL` e `NUXT_PUBLIC_SUPABASE_URL`: mesma URL do projeto
- `SUPABASE_SERVICE_ROLE_KEY`: chave "service_role" (mantenha secreta!)
- `NUXT_PUBLIC_SUPABASE_ANON_KEY`: chave "anon" ou "public"

**⚠️ Importante:** Execute o schema SQL em `docs/database-schema.sql` no Supabase após criar o projeto.

---

### 2. Contentful (Opcional - para Blog)

**O que é:** CMS headless para gerenciar conteúdo do blog.

**Como obter:**
1. Acesse [contentful.com](https://www.contentful.com)
2. Crie uma conta gratuita
3. Crie um novo "Space"
4. Vá em **Settings** → **API keys**
5. Crie uma nova API key

```env
# Contentful CMS
CONTENTFUL_SPACE_ID=seu-space-id-aqui
CONTENTFUL_ACCESS_TOKEN=seu-access-token-aqui
```

**Nota:** Se não usar Contentful, você pode usar dados mockados ou criar posts diretamente no banco de dados.

---

### 3. HubSpot CRM (Obrigatório para Portal de Corretores)

**O que é:** CRM para gerenciar clientes e comissões de corretores.

**Como obter:**
1. Acesse [hubspot.com](https://www.hubspot.com)
2. Crie uma conta (plano gratuito disponível)
3. Vá em **Settings** → **Integrations** → **Private Apps**
4. Crie uma nova Private App
5. Dê permissões para: Contacts, Deals, Timeline
6. Copie o API Key

```env
# HubSpot CRM
HUBSPOT_API_KEY=seu-hubspot-api-key-aqui
```

**Próximos passos após configurar:**
- Criar pipeline personalizado no HubSpot
- Configurar custom properties (house_id, realtor_id, etc.)
- Configurar webhooks (opcional)

---

### 4. Tuya Smart Lock (Obrigatório para Visitas Autoguiadas)

**O que é:** API para controlar smart locks nas propriedades.

**Como obter:**
1. Acesse [developer.tuya.com](https://developer.tuya.com)
2. Crie uma conta de desenvolvedor
3. Crie um novo projeto
4. Vá em **Cloud Development** → **Authorization**
5. Copie Access ID e Access Secret

```env
# Tuya Smart Lock
TUYA_ACCESS_ID=seu-tuya-access-id-aqui
TUYA_ACCESS_SECRET=seu-tuya-access-secret-aqui
```

**Próximos passos:**
- Registrar dispositivos (smart locks) no Tuya
- Associar cada casa a um device_id
- Testar integração

---

### 5. WhatsApp Business API (Obrigatório para Notificações)

**Opção A: Twilio (Recomendado para começar)**

1. Acesse [twilio.com](https://www.twilio.com)
2. Crie uma conta
3. Ative WhatsApp Sandbox (gratuito para testes)
4. Ou configure WhatsApp Business API completo (pago)

```env
# WhatsApp (Twilio)
WHATSAPP_API_KEY=seu-twilio-account-sid
WHATSAPP_API_URL=https://api.twilio.com/2010-04-01/Accounts
NUXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

**Opção B: WhatsApp Business API Oficial**

1. Acesse [business.facebook.com](https://business.facebook.com)
2. Configure WhatsApp Business API
3. Obtenha API Key e URL

```env
# WhatsApp (Oficial)
WHATSAPP_API_KEY=seu-whatsapp-api-key
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
NUXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

**Nota:** `NUXT_PUBLIC_WHATSAPP_NUMBER` deve estar no formato internacional sem símbolos (ex: 5511999999999 para +55 11 99999-9999).

---

### 6. Google Calendar API (Obrigatório para Agendamentos)

**O que é:** API para criar eventos de visitas no Google Calendar.

**Como obter:**
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione existente
3. Ative a **Google Calendar API**
4. Vá em **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure como "Web application"
6. Baixe as credenciais JSON
7. Use OAuth 2.0 Playground para obter refresh token

```env
# Google Calendar
GOOGLE_CALENDAR_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_CALENDAR_CLIENT_SECRET=seu-client-secret
GOOGLE_CALENDAR_REFRESH_TOKEN=seu-refresh-token
```

**Como obter Refresh Token:**
1. Use [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Configure com suas credenciais
3. Autorize acesso ao Google Calendar API
4. Copie o refresh token gerado

---

## 📝 Exemplo de Arquivo `.env` Completo

```env
# ============================================
# SUPABASE (Obrigatório)
# ============================================
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NUXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# CONTENTFUL (Opcional)
# ============================================
CONTENTFUL_SPACE_ID=xxxxxxxxxxxxx
CONTENTFUL_ACCESS_TOKEN=xxxxxxxxxxxxx

# ============================================
# HUBSPOT CRM (Obrigatório)
# ============================================
HUBSPOT_API_KEY=pat-na1-xxxxxxxxxxxxx

# ============================================
# TUYA SMART LOCK (Obrigatório)
# ============================================
TUYA_ACCESS_ID=xxxxxxxxxxxxx
TUYA_ACCESS_SECRET=xxxxxxxxxxxxx

# ============================================
# WHATSAPP (Obrigatório)
# ============================================
WHATSAPP_API_KEY=xxxxxxxxxxxxx
WHATSAPP_API_URL=https://api.twilio.com/2010-04-01/Accounts
NUXT_PUBLIC_WHATSAPP_NUMBER=5511999999999

# ============================================
# GOOGLE CALENDAR (Obrigatório)
# ============================================
GOOGLE_CALENDAR_CLIENT_ID=xxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CALENDAR_CLIENT_SECRET=xxxxxxxxxxxxx
GOOGLE_CALENDAR_REFRESH_TOKEN=xxxxxxxxxxxxx
```

## ✅ Verificação

Após configurar todas as credenciais:

1. **Verifique se o arquivo `.env` existe:**
```bash
ls -la .env
```

2. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Verifique os logs:** Se alguma credencial estiver faltando ou incorreta, você verá avisos no console.

## 🔒 Segurança

- ✅ **NUNCA** commite o arquivo `.env` no Git (já está no `.gitignore`)
- ✅ **NUNCA** compartilhe suas credenciais publicamente
- ✅ Use variáveis de ambiente diferentes para desenvolvimento e produção
- ✅ No Vercel, configure as variáveis de ambiente no painel do projeto

## 🚀 Próximo Passo

Após configurar as credenciais, vá para o **Passo 2**: Configurar o banco de dados no Supabase executando o schema SQL.

## ❓ Problemas Comuns

### Erro: "Missing supabase url"
- Verifique se `SUPABASE_URL` e `NUXT_PUBLIC_SUPABASE_URL` estão configurados
- Certifique-se de que não há espaços extras nas variáveis

### Erro: "Invalid API key"
- Verifique se copiou a chave completa (algumas são muito longas)
- Certifique-se de que não há quebras de linha

### Variáveis não estão sendo lidas
- Reinicie o servidor de desenvolvimento após alterar `.env`
- Verifique se o arquivo está na raiz do projeto
- Certifique-se de que não há espaços ao redor do `=` (ex: `KEY=value` e não `KEY = value`)



