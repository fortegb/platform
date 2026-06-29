# STATUS — ForteGB

> Controle de **onde estamos**, o que está em andamento e o que vem à frente.
> **Estágio:** fase preliminar de desenvolvimento. **Sem números de versão** ainda (virão no futuro).
> Última atualização: 2026-06-28.

---

## 🎯 Foco atual
Refinamento de **UI/UX** do site público (home e seus componentes) e da **tela de login** (somente UI, com mock).

---

## ✅ Concluído (recente)
- **Conteúdo (pt-BR):** ajustes de copy na home, seção de valores e rodapé.
- **Home — Hero:** redesenho para layout *split* (texto + imagem), escala compacta.
- **Escala global de UI:** base reduzida para `81.25%`.
- **Sistema de botões:** padronização de tamanho/estilo e cores (verde WhatsApp, azul primário, outline navy).
- **Identidade WhatsApp:** verde sóbrio `#3E8E5E` no botão flutuante e nos CTAs de WhatsApp.
- **Header:** remoção do link "Início", reordenação (Portfólio · Blog · Sobre · Contato), botão "Contato" padronizado, **ícone de login** (desktop + mobile).
- **Footer:** fundo igual ao header (navy), slogan com quebras, "Links Rápidos" em linha, coluna "Legal" (Privacidade/Termos), remoção de WhatsApp e de "Campinas-SP".
- **Login (`/login`):** página com identidade ForteGB; fluxo *identifier-first* em 2 etapas (UI/mock); login social (Google, Facebook); mostrar/ocultar senha; `autocomplete`; Termos/Privacidade. Rota migrada de `/corretor/login` → `/login`.
- **Documentação:** `docs/autenticacao-login.md` (comportamento + pendências de back-end).

---

## 🔬 Em andamento / em avaliação
- **Variantes da Home (decisão de design pendente):**
  - `/` — split, **azul original** (`from-primary-500 to-primary-700`)
  - `/v2` — Hero **clássico** (full-screen)
  - `/v3` — split, gradiente **slate** (`navy → hero-slate #4a5a72`)
  - `/v4` — split, gradiente **azul** (`navy → primary-400 #1a74a1`)
  - ➡️ Definir a versão final e consolidar.

---

## ⏭️ À frente (próximos passos / backlog)
- **Decidir a Home final** e remover as variantes não escolhidas (rotas/componentes).
- **Propagar o gradiente escolhido** para o CTA (`HomeContent`) e demais Heros, se aplicável.
- **Back-end de autenticação** (ver `docs/autenticacao-login.md`):
  - Endpoint `server/api/auth/check-email` (substituir o mock `identifier-first`).
  - Cadastro real (`signUp`) + criação de perfil/role.
  - Configurar provedores sociais (Google, Facebook) no Supabase.
  - Redirecionamento **por perfil** (admin / proprietário / cliente / corretor) — generalizar `middleware/realtor-auth.ts`.
  - Página `/recuperar-senha` + fluxo de reset.
  - Segurança/LGPD: rate limiting / captcha no endpoint de verificação (account enumeration).
- **Áreas logadas** para os demais perfis (admin, proprietários, clientes), além do portal do corretor.

---

## 📌 Notas
- Detalhes de convenções de UI e diretrizes para agentes em **`AGENTS.md`** (seção "Controle do Projeto").
- Histórico de mudanças em **`CHANGELOG.md`**.
