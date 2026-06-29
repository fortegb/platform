# ForteGB - Site Institucional

Plataforma digital completa da ForteGB, empresa familiar de construção imobiliária em Campinas-SP.

## 🚀 Funcionalidades

### Site Institucional
- ✅ Página inicial com hero section e valores da empresa
- ✅ Portfólio de casas com filtros e busca
- ✅ Página sobre a empresa
- ✅ Blog com posts do Contentful
- ✅ Página de contato com formulário
- ✅ Política de Privacidade e Termos de Uso (LGPD compliant)

### Sistema de Visitas Autoguiadas
- ✅ Agendamento de visitas com verificação de identidade
- ✅ Acesso via QR code para visitas instantâneas
- ✅ Integração com smart locks (Tuya API)
- ✅ Geração de senhas temporárias
- ✅ Confirmação via WhatsApp
- ✅ Integração com Google Calendar

### Portal de Corretores
- ✅ Autenticação de corretores
- ✅ Dashboard com estatísticas
- ✅ Registro de leads com proteção de comissão
- ✅ Visualização de casas disponíveis
- ✅ Gestão de leads

### Área Logada / Login
- ✅ Tela de login em fluxo *identifier-first* (e-mail → login ou cadastro) — UI pronta
- ✅ Login social (Google, Facebook) — UI pronta, provedores a configurar
- ⏳ Lógica de back-end (verificação de e-mail, cadastro, redirecionamento por perfil)

> Comportamento atual (UI + mock) e pendências de back-end documentados em [`docs/autenticacao-login.md`](docs/autenticacao-login.md).

### Integrações
- ✅ HubSpot CRM para gestão de leads
- ✅ Supabase para banco de dados e autenticação
- ✅ Contentful CMS para conteúdo
- ✅ WhatsApp Business API
- ✅ Google Calendar API
- ✅ Tuya API para smart locks

## 🛠️ Stack Tecnológico

- **Frontend/Backend**: Nuxt 3 (Vue 3) com SSR/SSG
- **Estilização**: Tailwind CSS + DaisyUI
- **CMS**: Contentful (headless CMS)
- **Database**: PostgreSQL via Supabase
- **Autenticação**: Supabase Auth
- **Hosting**: Vercel
- **TypeScript**: Suporte completo

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Supabase
- Conta Contentful (opcional)
- Credenciais das APIs (HubSpot, Tuya, WhatsApp, Google Calendar)

## 🚀 Setup

1. **Clone o repositório e instale as dependências:**
```bash
npm install
```

2. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
- Supabase (URL, Service Role Key, Anon Key)
- Contentful (Space ID, Access Token)
- HubSpot API Key
- Tuya (Access ID, Access Secret)
- WhatsApp API
- Google Calendar

3. **Configure o banco de dados:**
Execute o schema SQL em `docs/database-schema.sql` no seu Supabase.

4. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse:**
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
├── assets/              # Assets estáticos (CSS, imagens)
│   └── css/            # Estilos globais
├── components/         # Componentes Vue reutilizáveis
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── Hero.vue
│   ├── HouseCard.vue
│   ├── ContactForm.vue
│   ├── WhatsAppButton.vue
│   ├── IdentityVerification.vue
│   └── CookieConsent.vue
├── composables/        # Composables Vue
│   ├── useContentful.ts
│   └── useSupabase.ts
├── content/            # Conteúdo estático
│   ├── blog/          # Posts do blog (se não usar Contentful)
│   └── social-media/   # Ideias e templates para redes sociais
├── layouts/           # Layouts da aplicação
│   └── default.vue
├── middleware/        # Middlewares de rota
│   ├── realtor-auth.ts
│   └── guest.ts
├── pages/             # Páginas (roteamento automático)
│   ├── index.vue      # Home
│   ├── portfolio/    # Portfólio
│   ├── sobre.vue      # Sobre
│   ├── blog/          # Blog
│   ├── contato.vue    # Contato
│   ├── visita/        # Sistema de visitas
│   ├── corretor/      # Portal de corretores
│   ├── privacidade.vue
│   └── termos.vue
├── public/            # Arquivos públicos
│   ├── robots.txt
│   └── sitemap.xml
├── server/             # API routes e serviços
│   ├── api/           # Endpoints da API
│   ├── services/      # Serviços (HubSpot, Tuya, WhatsApp, Calendar)
│   └── utils/         # Utilitários do servidor
├── docs/              # Documentação
│   ├── database-schema.sql
│   ├── SETUP-CREDENTIALS.md
│   └── autenticacao-login.md   # Fluxo de login (UI/mock) + pendências de back-end
└── nuxt.config.ts     # Configuração do Nuxt
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run generate     # Gerar site estático
npm run preview      # Preview do build
```

## 🔐 Segurança e LGPD

- ✅ Conformidade com LGPD
- ✅ Criptografia de dados sensíveis
- ✅ Retenção de documentos (30 dias)
- ✅ Anonimização de dados após período de retenção
- ✅ Política de Privacidade
- ✅ Termos de Uso
- ✅ Consentimento de cookies
- ✅ Endpoint para exclusão de dados

## 📱 Redes Sociais

O projeto inclui:
- ✅ 100 ideias de posts categorizadas
- ✅ Templates para Instagram, Facebook e TikTok
- ✅ Calendário editorial (3 meses)

Arquivos em `content/social-media/`

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Nuxt 3:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted

## 📝 Próximos Passos

1. **Configurar APIs:**
   - Obter credenciais de todas as APIs
   - Configurar webhooks do HubSpot
   - Configurar smart locks Tuya

2. **Popular conteúdo:**
   - Adicionar casas ao portfólio
   - Criar posts do blog
   - Configurar Contentful

3. **Testes:**
   - Testar fluxo de visitas
   - Testar portal de corretores
   - Testar integrações

4. **Otimizações:**
   - SEO
   - Performance
   - Acessibilidade

## 📄 Licença

Proprietário - ForteGB

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato:
- E-mail: contato@fortegb.com
- WhatsApp: [número]
- Site: www.fortegb.com


