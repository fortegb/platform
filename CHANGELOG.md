# CHANGELOG — ForteGB

> Histórico do que foi feito.
> **Estágio preliminar:** ainda **sem números de versão** — entradas registradas por **data** sob "Não versionado". A numeração semântica (ex.: `v1.0.0`) virá no futuro.

---

## Não versionado

### 2026-06-28

**Conteúdo (pt-BR)**
- Ajuste do slogan do Hero com quebra de linha após "qualidade".
- Revisão de textos da seção de valores (Transparência, Confiança, Proximidade, Abertura), com quebras de linha.
- Slogan do rodapé reescrito com quebras de linha.

**Home — Hero**
- Redesenho do Hero para layout *split* (texto + imagem lado a lado; empilhado no mobile).
- Redução de altura e da escala de título/subtítulo/botões para visual mais compacto.

**Escala global de UI**
- Base do `html` reduzida para `81.25%` em `assets/css/main.css` (encolhe fontes/espaçamentos proporcionalmente).

**Botões**
- Padronização de tamanho e estilo em `HouseCard`, `HomeContent` e Heros.
- Hierarquia de cores: **verde WhatsApp** (`#3E8E5E`) para WhatsApp, **azul** (`primary-400`) para ação primária, **outline navy** para secundária.
- Correção de conflito do `.btn-primary` (daisyui vs custom) que deixava botões outline ilegíveis.
- "Fale Conosco" com ícone do WhatsApp; botão flutuante alinhado ao mesmo verde.

**Header**
- Remoção do link "Início" (logo já leva à home).
- Reordenação: Portfólio · Blog · Sobre · Contato.
- Botão "Contato" padronizado ao estilo "Ver Portfólio".
- Adicionado **ícone de login** (desktop + item "Entrar" no mobile).

**Footer**
- Fundo alterado para o navy do header (`primary-500`).
- "Links Rápidos" reorganizado (grade → linha única); remoção de "Contato" da lista.
- Coluna "Contato" renomeada para **"Legal"** (Privacidade/Termos); remoção do item WhatsApp.
- Remoção de "Campinas-SP, Brasil".
- Ajuste de alinhamento do logo.

**Login (`/login`)**
- Migração da rota `/corretor/login` → `/login` (referências atualizadas em header, middleware e dashboard).
- Página adaptada para acesso **genérico** com identidade ForteGB (logo + fundo navy).
- Fluxo *identifier-first* em 2 etapas (e-mail → senha **ou** criar senha) — **UI/mock** (`a@b.com` = conta existente; demais = nova).
- Login social: **Google** e **Facebook** (Microsoft removido).
- Melhorias: mostrar/ocultar senha, atributos `autocomplete`, nota de Termos/Privacidade, título dinâmico ("Acesse sua conta" / "Criar sua conta").

**Variantes da Home (avaliação de design)**
- Estrutura com miolo compartilhado (`components/HomeContent.vue`) e Hero por componente.
- Rotas: `/` (split azul original), `/v2` (clássico), `/v3` (slate), `/v4` (azul `primary-400`) — variantes com `noindex`.

**Tema / Configuração**
- Adicionada cor `hero-slate` (`#4a5a72`) ao `tailwind.config.js`.
- Substituição de valores arbitrários de gradiente por cores nomeadas (evita falha de compilação em arquivos novos).

**Documentação**
- Criado `docs/autenticacao-login.md` (comportamento do login + pendências de back-end).
- Criados arquivos de controle: `STATUS.md`, `CHANGELOG.md`; seção "Controle do Projeto" adicionada ao `AGENTS.md`.
- Referência ao doc de login adicionada ao `README.md`.
