# CHANGELOG — ForteGB

> Histórico do que foi feito.
> **Estágio preliminar:** ainda **sem números de versão** — entradas registradas por **data** sob "Não versionado". A numeração semântica (ex.: `v1.0.0`) virá no futuro.

---

## Não versionado

### 2026-07-17 — Home: 4 valores da marca reescritos ([#197](https://github.com/fortegb/platform/issues/197))

- **Transparência/Confiança/Proximidade/Abertura → Transparência/Segurança/Parceria/Solidez.** Motivo: Transparência e Abertura diziam praticamente a mesma coisa (comunicação clara/honesta), redundância real. As outras duas evoluíram para termos mais concretos — "Confiança" (traço abstrato da empresa) → "Segurança" (o que o cliente sente), "Proximidade" (institucional/estático) → "Parceria" (relação ativa, negociação direta com quem decide). "Solidez" é novo — qualidade construtiva/fidelidade ao projeto, dimensão que os 4 originais não cobriam.
- Copy final:
  - **Transparência** — Processo claro e honesto, do projeto à escritura *(sem alteração)*
  - **Segurança** — Sua casa como você sonha, de nossa família para a sua
  - **Parceria** — Direto com quem decide, apoiando você em cada etapa
  - **Solidez** — Construção e acabamento superiores, sempre fiel ao projeto
- Ícones: cadeado (Segurança, herdado de Confiança) trocado por coração — o texto final ficou mais emocional/família do que literal-segurança, cadeado destoava. Prédio novo para Solidez (herdava globo de Abertura, sem relação). Escudo-check (Transparência) e pessoas (Parceria, herdado de Proximidade) mantidos.
- **`AGENTS.md` §2.1 atualizado** — os 4 pilares documentados (validados por feedback real de cliente: "trust during negotiation", "transparency and openness") foram a base; a reescrita mantém o mesmo sentimento subjacente do cliente, só com palavras mais específicas. Decisão de adotar os novos 4 como canônicos, não reverter.
- `components/HomeContent.vue` — texto + ícones dos 4 cards.
- **Botões do Home nivelados**: "Fale Conosco"/"Ver Portfólio" (Hero) e "Fale Conosco"/"Enviar Mensagem" (CTA final) passam a ter largura igual (`w-40`/`w-44`) — antes cada um tinha a largura do próprio texto, ficando desalinhados lado a lado. "Enviar Mensagem" herda o estilo sólido de "Ver Portfólio" em vez de outline.
- **Logo (`public/logo.png`) recortado e com fundo transparente** — o arquivo original tinha ~130px de espaço morto de cada lado e um fundo cinza-quase-preto sólido embutido (não exatamente a cor do header), dando impressão de estar desalinhado à direita. Recortado pra marca real, fundo removido.
- **Footer: "Links Rápidos" vira lista vertical** — antes era `flex flex-wrap` (linha horizontal), inconsistente com "Legal" (vertical) ao lado. Mesmo padrão agora, e lista vertical é o padrão comum de rodapé.

- `AppFooter.vue` usava `hover:text-primary` sobre `bg-primary-500` — o alias DaisyUI `primary` e o valor Tailwind `primary-500` são o mesmo hex, tornando o texto do link invisível ao passar o mouse. Corrigido para `hover:text-primary-100`, mesmo contraste que `AppHeader.vue` já usa.
- Encontrado durante o audit de tokenização de `fundacao-tokens-web`/`design-descoberta-site` (#197); filed separado por ser bug visual, não tokenização.
- Nova capability `ui-visual-accessibility` (primeira sobre contraste/legibilidade de estados interativos).

### 2026-07-13 — Corretor: CPF obrigatório no onboarding ([#196](https://github.com/fortegb/platform/issues/196))

- **D-068:** CPF passa a ser campo obrigatório no perfil do corretor durante o cadastro, junto com WhatsApp (CRECI permanece opcional). Lacuna encontrada na exploração de #190 — pagamento de comissão a pessoa física no Brasil normalmente exige CPF, e nenhuma leaf modelava o dado.
- **Reabre D-062** (`journey-corretor-onboarding`), registrado explicitamente — mesmo tratamento que #187 deu a D-053 e #189 deu a `crm-source-of-truth`.
- Sem novo estado em `corretor.status`, sem mudança na fila de aprovação de `/staff/corretores` — validação só de formato (mesmo rigor de D-063 para o CPF do cliente).
- Não modela o mecanismo de pagamento de comissão em si — só garante que o dado exista quando esse mecanismo for construído.
- `templates/jornada-onboarding-corretor.md`, `jornadas-plataforma.md` §4.1 e `screen-map.md` atualizados. Implementação real → Execução (#86, #50).
- **Fecha o último item aberto de Passo 5 (epic #176).**

### 2026-07-13 — Epic #176 (Jornadas, telas e fluxos) fechado — Passo 5 concluído

- **Epic [#176](https://github.com/fortegb/platform/issues/176) — Jornadas, telas e fluxos (re-validação pós-arquitetura) — todas as 11 leaves concluídas:** #185 (D-057), #186 (D-058), #187 (D-059), #188 (D-061), #189 (D-062), #190 (D-063), #191 (D-064), #192 (D-060), #193 (D-065), #194 (D-066), #195 (D-067). Board `Done`; issue fechada.
- Duas reaberturas registradas durante o passo: #187 reabriu D-053 (renovação limitada por telefone); #189 reabriu `crm-source-of-truth` (amarra `corretor_casa`).
- Um gap identificado durante a exploração de #190 virou issue separada, ainda aberta: [#196](https://github.com/fortegb/platform/issues/196) (CPF do próprio corretor no onboarding).
- Desbloqueia Passo 6 (Design system) — Passo 5 (Jornadas/telas) concluído; G2 (gate do build) segue fechado até Passo 7 (Versionamento).

### 2026-07-13 — Passo 5: jornada de configuração de plataforma e papéis ([#195](https://github.com/fortegb/platform/issues/195)) — última leaf

- **D-067:** corrige duas contradições reais com decisões já fechadas — rascunho ainda usava rotas `/admin/*` (D-056 já rejeitou árvore separada, corrigido para `/staff/*`); tela de "chaves API" implicava que qualquer admin poderia configurar secrets, contradizendo D-043 (escrita restrita a "ForteGB tech", não ao papel `admin` genericamente).
- Chaves API vira referência somente-leitura — edição real fica no Vercel, só ForteGB tech.
- "Ocultar casa" resolve via Sanity Studio (rascunho/despublicação nativos) — sem tela na plataforma, mesmo padrão vendor-native de Tuya (#194).
- "Modo manutenção" é **exceção deliberada** a esse padrão — flag viva no Supabase, qualquer admin liga/desliga na hora, sem deploy — porque não é secret e seu propósito é resposta rápida a emergência.
- Atribuição de papel (convite por e-mail, papel pré-atribuído) é funcionalidade nova sem conflito.
- Nenhuma decisão fechada reaberta — leaf aplica testes/políticas já existentes (D-055/D-056/D-043) a telas concretas.
- Novo `templates/jornada-configuracao-plataforma-papeis.md`. Nova capability OpenSpec `journey-platform-admin-config`. `jornadas-plataforma.md` §5.2 e `screen-map.md` saem de rascunho para validado — banners de topo dos dois docs também atualizados.
- Implementação real → Execução (#119, #72).
- **🎉 Décima primeira e última leaf de Passo 5 (epic #176) fechada — todas as 11 jornadas re-validadas (#185–#195, D-057..D-067). Desbloqueia Passo 6 (Design system).**

### 2026-07-13 — Passo 5: jornada de gestão de acesso Tuya ([#194](https://github.com/fortegb/platform/issues/194))

- **D-066:** re-confirma a decisão de D-052/D-056 — gestão de código de emergência Tuya (rotação, status do dispositivo) continua no Supabase Studio, sem UI custom. Teste de três partes de D-056 reaplicado: veredito inalterado, nada mudou na escala do negócio.
- "Status do dispositivo" esclarecido — são os campos já existentes no registro, não um dashboard de monitoramento novo (detecção de falha já é reativa via alerta WhatsApp, D-052).
- Nenhum conteúdo de decisão novo. Formaliza a conclusão já fechada como requirement de spec pela primeira vez (antes só em prosa de decisão) — satisfaz a exigência estrutural do OpenSpec sem inventar escopo.
- Nova capability OpenSpec `journey-tuya-access-management` (formalização). `jornadas-plataforma.md` e `screen-map.md` marcam a tarefa como re-validada, sem rota nova.
- Sem implementação — decisão já era "sem UI custom". **Décima leaf de Passo 5 fechada.**

### 2026-07-13 — Passo 5: jornada de operação diária do staff ([#193](https://github.com/fortegb/platform/issues/193))

- **D-065:** define a tela operacional de staff — visitas do dia, clientes recentes, entrada manual de lead. Leaf greenfield (nenhum código existia).
- Staff enxerga dados **de todos os corretores/casas**, diferente do pipeline escopado por corretor de #191 — consequência direta da hierarquia RBAC de D-055.
- Entrada manual é nível `Contato` (só WhatsApp, `fonte: staff-manual`) — não o nível `Cliente`/CPF obrigatório que #190 exige do corretor, já que sem corretor envolvido não há atribuição de comissão a proteger.
- Dedup reaproveita a reconciliação por WhatsApp já existente de D-020 — mesma regra de #185/#190, terceiro ponto de entrada.
- Tela resume pendências de #189 (corretor/casa) e #192 (exceção de verificação) com link direto, sem reimplementar nenhuma das duas.
- Nenhuma decisão fechada reaberta — leaf puramente consumidora de D-020, D-053, D-055 e das leaves anteriores.
- Novo `templates/jornada-operacao-diaria-staff.md`. Nova capability OpenSpec `journey-staff-daily-operations`. `jornadas-plataforma.md` §5.1 e `screen-map.md` saem de rascunho para validado.
- Implementação real → Execução (#86, #90, #81). **Nona leaf de Passo 5 fechada.**

### 2026-07-13 — Passo 5: jornada de pipeline e dashboard do corretor ([#191](https://github.com/fortegb/platform/issues/191))

- **D-064:** define `registro.status` pela primeira vez — nenhuma decisão fechada o enumerava antes. O stub pré-arquitetura tinha um enum de 7 estágios (`new`, `contacted`, `visit_scheduled`, `visit_completed`, `negotiating`, `closed_won`, `closed_lost`), mas dois deles duplicavam estado que já pertence a `visit.status` (D-053).
- Novo enum, focado só em negócio: `registrado → negociando → fechado_ganho / fechado_perdido`. Progresso de visita é lido via join no `visit` ligado, nunca duplicado — mesmo risco de dessincronização que #188 e #190 já corrigiram nesta sessão.
- "Contatado" vira entrada de `historico` (evento), não estágio formal de pipeline.
- HubSpot pode mostrar pipeline mais rico visualmente sem contradição — Supabase continua autoridade de status comissionável, HubSpot é espelho a jusante.
- Dashboard/lista corrigidos para escopar por `registro.corretor_id` (RLS, D-055) e autenticar via `role`/`status` (modelo de #189), não mais `realtors`.
- Nenhuma decisão fechada reaberta — `registro.status` nunca teve enum formal antes.
- Novo `templates/jornada-pipeline-dashboard-corretor.md`. Nova capability OpenSpec `journey-corretor-pipeline`. `jornadas-plataforma.md` §4.4 e `screen-map.md` saem de rascunho para validado.
- Implementação real → Execução (#86, #90). **Oitava leaf de Passo 5 fechada.**

### 2026-07-12 — Passo 5: jornada de registro de cliente e proteção de comissão ([#190](https://github.com/fortegb/platform/issues/190))

- **D-063:** corrige um bug real no stub pré-arquitetura — a proteção "primeiro-registro-ganha" não funcionava de fato: o endpoint verificava duplicata (`SELECT`) e inseria (`INSERT`) como dois passos separados, permitindo que dois corretores concorrentes passassem ambos pela checagem.
- Corrigido com **constraint de unicidade no banco** em `registro(cliente_id, casa_id)` — segunda submissão concorrente falha na constraint, não em lógica de aplicação racy.
- **CPF passa a ser obrigatório** no registro feito pelo corretor, promovendo direto a nível `Cliente` (não `Contato`, nível usado pela captura de baixo compromisso de #185) — D-020 já nomeia CPF como autoridade de dedup; telefone-só enfraqueceria a garantia que esta jornada existe para proteger.
- Registro consome a amarra `corretor_casa` de #189 (só corretor aprovado para a casa pode registrar) e o modelo de auth `role`/`status` corrigido, em vez da tabela `realtors` pré-arquitetura.
- Reenvio pelo mesmo corretor é idempotente (mostra status existente), não erro. `fonte: portal-corretor` estampado.
- Nenhuma decisão fechada reaberta — leaf puramente consumidora de D-020 e da amarra de #189.
- Novo `templates/jornada-registro-cliente-comissao.md`. Nova capability OpenSpec `journey-corretor-client-registration`. `jornadas-plataforma.md` §4.3 e `screen-map.md` saem de rascunho para validado.
- Durante a exploração, identificada lacuna real em D-062 (#189): CPF do próprio corretor nunca foi exigido no onboarding, necessário para pagamento futuro de comissão — registrada como issue separada **[#196](https://github.com/fortegb/platform/issues/196)**, ainda não fechada.
- Implementação real → Execução (#86, #90). **Sétima leaf de Passo 5 fechada.**

### 2026-07-12 — Passo 5: jornada de onboarding do corretor ([#189](https://github.com/fortegb/platform/issues/189))

- **D-062:** onboarding de conta corrigido contra D-055 — cadastro agora consome `role = corretor` + novo `corretor.status` (`pending_approval | approved | rejected`), substituindo o check pré-arquitetura na tabela `realtors`.
- Fila unificada de staff em `/staff/corretores` (aplicações de conta + solicitações de casa juntas) — `/staff/casas-pendentes` deixa de ser rota separada.
- Notificação push (Telegram) reconsiderada e removida — diferente de #192, nada aqui tem urgência de espera física.
- **Associação por casa incorporada** (rascunho §4.2, sem leaf própria antes desta): minuta visível imediatamente (corretor + staff); assinatura fica fora da plataforma (Gov.br manual-first, decisão de MVP já fechada, não reaberta); **staff** (não o corretor) faz upload do PDF assinado no bucket privado (D-016/D-030) — upload é a própria aprovação, uma única ação.
- **Reabre `crm-source-of-truth`:** `registro.corretor_id` agora só é válido com `corretor_casa` aprovado para aquele par — sem essa amarra, a aprovação por casa seria decorativa.
- Novo `templates/jornada-onboarding-corretor.md`. Nova capability OpenSpec `journey-corretor-onboarding`; delta `MODIFIED` em `crm-source-of-truth`. `jornadas-plataforma.md` §4.1/§4.2 e `screen-map.md` saem de rascunho para validado.
- Implementação real → Execução (#86, #50). **Sexta leaf de Passo 5 fechada.**

### 2026-07-12 — Passo 5: jornada de pós-visita e reengajamento ([#188](https://github.com/fortegb/platform/issues/188))

- **D-061:** especifica os três sub-fluxos que ficaram sem resposta depois de "senha entregue" nas duas jornadas de visita — lembrete pré-visita, cancelamento/reagendamento, e follow-up. Leaf greenfield (nenhum código existia para nenhum dos três).
- Cancelamento/reagendamento **self-service via magic link**, escolhido sobre WhatsApp-mediado durante a exploração — visitante resolve sozinho, zero carga de staff por pedido. Link único de alta entropia, entregue nas mensagens já existentes (confirmação + lembrete), sem envio novo.
- Novo status terminal `cancelled`, distinto de `declined` (que significa falha de verificação, sinal de segurança) — aditivo ao ciclo de vida da visita, não modifica `visit-identity-verification`.
- Cancelar após senha emitida chama `revoke(credential)` do adapter Tuya (D-052) — primeiro caller real dessa função, nomeada mas nunca usada até agora.
- Remarcar = cancelar + reagendar pelo fluxo normal (#186), sem editar in-place.
- Follow-up pós-visita classificado por timing (mesmo dia/+24h transacional; +3 dias ou promocional = marketing, opt-in explícito) — resolve a questão de consentimento que #141 deixou em aberto, usando o framework já existente de D-054. Escopo desta leaf é só a regra; conteúdo/cadência real → Execução.
- Novo `templates/jornada-pos-visita-reengajamento.md`. Nova capability OpenSpec `journey-post-visit-reengagement`. Nova rota `/visita/gerenciar/[token]`. `jornadas-plataforma.md` §3.2 e `screen-map.md` saem de rascunho para validado.
- Implementação real → Execução (#141, #81). **Quinta leaf de Passo 5 fechada.**

### 2026-07-12 — Passo 5: jornada de fila de exceção de verificação de identidade ([#192](https://github.com/fortegb/platform/issues/192))

- **D-060:** especificação da tela de staff-review que #186 e #187 já deferiam — fila compartilhada sem UI consumidora alguma até agora. Primeira leaf de Passo 5 totalmente greenfield (sem stub pré-arquitetura para corrigir).
- Fila ordenada por tipo de fluxo: itens instantâneo/QR aparecem antes de agendados (só instantâneo pode ter visitante esperando na porta).
- Aprovação reaproveita `provisionAccess` (D-052) no mesmo call site já usado por #186/#187 — sem caminho novo.
- Lacuna real de D-053 fechada: rejeição agora notifica o visitante via WhatsApp (antes, silêncio total).
- Novo item pendente dispara alerta a staff via **Telegram**, não WhatsApp — aplica o split de D-054 (interno vs. externo) ao seu primeiro caso concreto, reconciliando o texto literal "WhatsApp" de D-052 (escrito antes de D-054 existir).
- Split WhatsApp/Telegram **reconsiderado durante a exploração** (já que WhatsApp é obrigatório para clientes, vale manter uma segunda ferramenta?) e **mantido**: aprovação de template Meta é por tipo de mensagem, não uma vez só; notificações internas são a categoria com mais chance de crescer. D-054 permanece sem reabertura.
- Novo `templates/jornada-fila-excecao-verificacao.md`. Nova capability OpenSpec `journey-staff-verification-review`. `jornadas-plataforma.md` §5.1 e `screen-map.md` (linha fila de exceção) saem de rascunho para validado.
- Implementação real → Execução (#80, #86, #50). **Quarta leaf de Passo 5 fechada.**

### 2026-07-12 — Passo 5: jornada de visita instantânea via QR ([#187](https://github.com/fortegb/platform/issues/187))

- **D-059:** correção da jornada instantânea/QR contra D-052 (Tuya) e D-053 (identidade/dados) — mesmas correções estruturais de #186 (tabela `visits` legada, Tuya engolindo falha, booleano de verificação confiado, WhatsApp síncrono).
- Regra "sem espera síncrona" de D-053 implementada pela primeira vez: falha de verificação recusa **imediatamente** + link WhatsApp para staff, sem estado de espera (diferente do fluxo agendado, assíncrono).
- Reuso de 12 meses passa a exigir posse do telefone **só neste fluxo** (código via WhatsApp) — sem revisão humana possível entre o reuso e a porta destrancar, diferente da visita agendada.
- **Reabre D-053** (registrado explicitamente): mecanismo de renovação limitada — código bem-sucedido estende `identity_verified_at`, nunca além de 24 meses de `last_client_match_at` (novo campo, só atualizado por `client-match` completo). Passado o teto, reuso via código para e força re-verificação completa.
- `verification_attempt.method` ganha `phone-otp`. Fluxo agendado (#186) permanece inalterado.
- Novo `templates/jornada-visita-instantanea-qr.md`. Nova capability OpenSpec `journey-instant-visit`; delta `MODIFIED` em `visit-identity-verification`. `jornadas-plataforma.md` §3.3 e `screen-map.md` saem de rascunho para validado.
- Implementação real → Execução (#81, #80, #77/#135, #75). **Terceira leaf de Passo 5 fechada.**

### 2026-07-12 — Passo 5: jornada de visita agendada ([#186](https://github.com/fortegb/platform/issues/186))

- **D-058:** correção da jornada de visita agendada contra D-052 (Tuya) e D-053 (identidade/dados) — o stub pré-arquitetura tinha lacunas estruturais: tabela `visits` legada, `programSmartLock()` chamado direto engolindo falhas (log + "success" falso), booleano de verificação confiado do cliente, WhatsApp síncrono, sem checagem de reuso de 12 meses, sem fila `staff-review`.
- Correções: reuso de 12 meses agora pula verificação inteiramente para `Cliente` já verificado; `provisionAccess(visit)` do adapter D-052 é chamada única e gated por `visit.status = verified` persistido no servidor; falha de provisionamento aciona o fallback (código de emergência + alerta staff), nunca sucesso silencioso; mensageria via QStash (D-054).
- Resolve a lacuna que D-053 deixou aberta só para o fluxo agendado: exceção de verificação escala **assincronamente** (booking completa, fila resolve depois) — diferente do fluxo instantâneo (sem folga de tempo).
- Retenção de selfie (D-053) reconsiderada durante exploração e mantida como estava — capturar é idêntico em ambos os casos, a simplificação cogitada não existia de fato.
- Fronteira explícita com leaves vizinhas: tela de staff-review é #192; fluxo instantâneo/QR é #187.
- Novo `templates/jornada-visita-agendada.md`. Nova capability OpenSpec `journey-scheduled-visit`. `jornadas-plataforma.md` §3.2 e `screen-map.md` (linha Agendar visita) saem de rascunho para validado.
- Implementação real (rewrite do endpoint/adapter/UI) → Execução (#81, #80, #77/#135). **Segunda leaf de Passo 5 fechada.**

### 2026-07-12 — Passo 5: jornada de descoberta e navegação do site ([#185](https://github.com/fortegb/platform/issues/185))

- **D-057:** re-validação da jornada de descoberta (home → portfólio → detalhe da casa → blog → contato) contra a arquitetura de domínio fechada (D-052–D-056) — sem conflito com RBAC (D-055, `Visitante` não armazenado) nem mensageria (D-054, `wa.me` não é envio da plataforma).
- Gap real corrigido: clique em qualquer CTA WhatsApp da jornada passa a capturar lead (fire-and-forget, `fonte: cta-whatsapp`), reaproveitando `POST /api/contact` — antes só o formulário (`fonte: form-site`) deixava rastro, apesar de `crm-source-of-truth` já listar CTA-WhatsApp como fonte v1.
- Novo `templates/jornada-descoberta-site.md`. Nova capability OpenSpec `journey-site-discovery`. `jornadas-plataforma.md` §3.1 e `screen-map.md` (linhas Home/Portfólio/Blog/Contato) saem de rascunho para validado.
- Implementação real (beacon frontend, persistência no endpoint) → Execução (#56, #78, #73). **Primeira leaf de Passo 5 (epic #176) fechada.**

### 2026-07-12 — Epic #179 (Arquitetura de domínio) fechado

- **Epic [#179](https://github.com/fortegb/platform/issues/179) — Arquitetura de domínio (visitas, mensageria, RBAC, admin) — todas as 5 leaves concluídas:** #180 (D-053), #181 (D-052), #182 (D-054), #183 (D-055), #184 (D-056). Board `Done`; issue fechada.
- Desbloqueia Passo 5 (Jornadas, #176) para desenhar telas/fluxos sobre uma arquitetura de domínio já decidida.

### 2026-07-12 — Arquitetura: admin — resolução do conflito build-vs-buy ([#184](https://github.com/fortegb/platform/issues/184))

- **D-056:** reframe — "admin" conflava edição de conteúdo (dashboard do vendor, regra original de `platform-architecture` mantida) com UI de fluxo operacional (categoria nova, nunca endereçada pela regra). Teste de três partes para justificar UI custom: workflow multi-etapa com efeitos colaterais; renderização específica de domínio; segurança para staff não-técnico.
- Reclassificação: aprovação de corretor + fila de exceção de verificação (D-053) → UI custom; rotação de código de emergência Tuya (D-052) → mantido no Supabase Studio.
- Namespace único `/staff/*`, gateado via hierarquia RBAC de D-055 — sem árvore `/admin/*` separada.
- Emenda direta ao requirement "Build-vs-buy default" em `platform-architecture` (delta `MODIFIED`), não nova capability.
- Novo `templates/admin-build-vs-buy.md`. **Fecha as 5 leaves do epic #179 (Arquitetura de domínio).**

### 2026-07-12 — Arquitetura: RBAC — modelo de papéis e permissões ([#183](https://github.com/fortegb/platform/issues/183))

- **D-055:** enum único de papel por usuário (`cliente`/`corretor`/`staff`/`admin`) — sem multi-atribuição. "Digital" e "Sócio/investidor" são fatos organizacionais, não papéis de RBAC (não gateiam capacidade nenhuma).
- Admin é hierarquicamente superior a Staff **na avaliação da checagem de permissão**, não por armazenar dois papéis — resolve a sobreposição documentada (Ricardo = Admin+Digital) sem multi-atribuição.
- Enforcement em duas camadas: app-level (middleware/rota, conveniência de UX) + Supabase RLS (fronteira de segurança real) — mesmo padrão do bucket privado (D-016/D-030).
- `Visitante` não é um valor armazenado — caso default/ausência de sessão; tracking de tráfego anônimo é preocupação separada (#124).
- Novo `templates/rbac-modelo-papeis.md`. Nova capability OpenSpec `rbac-role-model`.

### 2026-07-12 — Arquitetura: mensageria WhatsApp/Telegram — provider + gatilhos + consentimento ([#182](https://github.com/fortegb/platform/issues/182))

- **D-054:** split por direção — WhatsApp sempre para qualquer parte externa (visitante, cliente, corretor); Telegram só para interno (staff/sistema, sem parte externa), justificado tecnicamente (sem aprovação de template, gratuito, setup trivial), não por preferência de custo. Corrige D-017 para o escopo exato onde "Telegram-first" ainda se aplica.
- Consentimento: transacional implícito (campo WhatsApp obrigatório do Cliente + ação tomada); marketing opt-in explícito, nomeado agora, não construído (v2+).
- Provider (WhatsApp Business API vs. Twilio) não escolhido nesta leaf — critérios documentados, escolha real → #75 (Execução), mesmo padrão do segundo lock de teste de Tuya.
- Envio sempre via QStash (D-017), nunca síncrono no handler da requisição. Mensageria é mais um vendor atrás do adapter seam existente.
- Novo `templates/mensageria-provider-gatilhos.md`. Nova capability OpenSpec `messaging-channel-policy`.

### 2026-07-12 — Arquitetura: visitas — modelo de dados + verificação de identidade ([#180](https://github.com/fortegb/platform/issues/180))

- **D-053:** `client-match` (biblioteca frontend, selfie vs. documento) é o mecanismo primário para os dois fluxos (agendado e instantâneo) — sem KYC SaaS, sem split por fluxo. `staff-review` é a fila de exceção compartilhada — automática (confiança baixa) ou pelo visitante via WhatsApp direto a staff; qualquer resolução gera um `verification_attempt` registrado, nunca um atalho de acesso ad hoc.
- Fluxo instantâneo em falha: sem espera síncrona ao vivo, recusa imediata + WhatsApp para staff como escape hatch (espelha o fallback de Tuya, D-052, invertido).
- Reuso via `Cliente.identity_verified_at` (janela de 12 meses); retenção diferenciada por artefato (selfie efêmera, documento retido enquanto a verificação estiver ativa — cobre danos/incidentes).
- Modelo de dados: `Cliente`/`verification_attempt`/`visit` substitui a tabela `visits` legada; hard gate — `provisionAccess` (adapter Tuya) só roda após `visit.status = verified`.
- Resolve `Q-005`. Novo `templates/visitas-identidade-modelo-dados.md`. Nova capability OpenSpec `visit-identity-verification`.

### 2026-07-11 — Arquitetura: Tuya — viabilidade da API + modo de falha ([#181](https://github.com/fortegb/platform/issues/181))

- **D-052:** dois mecanismos de primeira classe por trás de um adapter seam (D-017) — `local-pool` (pool de códigos pré-provisionados por casa, sem chamada Tuya Cloud API em tempo real crítico) é o default no lançamento; `tuya-live` (Tuya Cloud API real) fica disponível assim que um spike de curto prazo confirmar viabilidade, sem depender de crescimento de volume. Ambos ativos na arquitetura/jornada/grilling — nenhum adiado.
- Fallback: código de emergência estático por casa (keypad local) + reagendamento, nunca deslocamento de staff; detecção síncrona no momento da emissão; rotação mensal + imediata após uso; auditoria em tabela Supabase restrita (liga-se à epic LGPD #126–129).
- Resolve `Q-006` (fallback). Resolve conflito real com `D-039`: fechadura instalada (Intelar X2, numa casa à venda) declarada **prod-only**; segundo device de teste é pré-requisito antes de automação de safe-target (#77/#135).
- Novo `templates/tuya-access-adapter.md`. Nova capability OpenSpec `tuya-access`.

### 2026-07-11 — Dev local: estratégia de mock de integrações ([#172](https://github.com/fortegb/platform/issues/172))

- **D-051:** mock com happy-path por padrão + override booleano único por vendor (`MOCK_<VENDOR>_FORCE_ERROR`, convenção D-041); sem tipos de falha parametrizados; mock dentro do módulo adapter do vendor (D-017), sem diretório central. Docs only — código de mock → build.
- **Epic #146 (Arquitetura da solução & ambientes) — todos os 26 sub-issues fechados** com este leaf.

### 2026-07-11 — Dev local: runbook de bootstrap ([#171](https://github.com/fortegb/platform/issues/171))

- **D-050:** novo `templates/dev-local-bootstrap.md` — checklist ordenado clone→dev funcionando (toolchain D-049 → Supabase local D-032 → env vars D-044). Só local; staging/prod ficam para Execução (#42/#43/#46).

### 2026-07-11 — Dev local: toolchain ([#170](https://github.com/fortegb/platform/issues/170))

- **D-049:** inventário de quatro ferramentas (Node, Docker/OrbStack, Supabase CLI, ngrok); Node com pin duplo (`.nvmrc` + `engines`); sem pin nas outras três (auto-atualização própria); ngrok confirmado opcional/só-túnel (D-040).
- Novo `templates/dev-local-toolchain.md` + pointer em `environments.md`.

### 2026-07-11 — CI/CD: processo de promoção/hotfix (staging→main) ([#169](https://github.com/fortegb/platform/issues/169))

- **D-048:** promoção uma change staged de cada vez (explícito, não efeito colateral do merge); hotfix branch `hotfix/<nome>` a partir de `main`, bypass do requisito de staging via `rbo-close-change` v0.5; sync `main`→`staging` obrigatório pós-hotfix; registro via trilha normal de issue/OpenSpec (sem entrada extra por uso).
- Suporte de skills já entregue em ciclo separado: `ai-skills` v0.7.0 (`uniform-hotfix-exception`, ai-skills#10) — `rbo-create-change` 0.3, `rbo-close-change` 0.5.

### 2026-07-11 — CI/CD: automação de migrações (aplicar on merge) ([#168](https://github.com/fortegb/platform/issues/168))

- **D-047:** apply manual (sem CI); gatilhos = após `rbo-stage-change` (staging) e após `rbo-close-change` pós-smoke (prod); rastreabilidade via nome do arquivo na mensagem de commit; sem detector automático de migração pendente (esquecimento é auto-corretivo).
- Pointer em `environments.md` perto de D-031/D-032. Skills → ciclo companheiro em `ai-skills`.

### 2026-07-11 — Board hygiene: re-parenting + Etapa fix (sem issue própria)

- Epic #1 estava `Done` com 4 sub-issues abertas (#29, #30, #31, #140), todas deferidas a v2/v3 por D-018. Re-parented para #81 (Visitas autoguiadas), #98 (Media kit), #130 (Estratégia mobile).
- Epic #175 corrigido de Etapa 1 → 2, para o relatório de progresso mostrar Passo 2 corretamente.

### 2026-07-11 — CI/CD: pipeline de deploy branch→Vercel ([#167](https://github.com/fortegb/platform/issues/167))

- **D-046:** gatilho = integração git nativa da Vercel (sem CI custom agora); gate de merge só em `main` (deploy com sucesso obrigatório); `staging` fica sem gate; rollback = dashboard Vercel; sem notificações custom.
- `origin/staging` decidido agora (long-lived, de `main`), criação real adiada para bootstrap de Execução (#42/#46). Template `cicd-deploy-pipeline.md` + pointer em `environments.md`.

### 2026-07-10 — CI/CD: stage vs close + lifecycle.yml ([#166](https://github.com/fortegb/platform/issues/166))

- **D-045:** `rbo-stage-change` → `staging` (sem archive); `rbo-close-change` → archive + `staging`→`main` quando `.rbo/lifecycle.yml` presente; default sem ficheiro inalterado.
- Ficheiro opt-in `.rbo/lifecycle.yml`; templates/Ambientes/spec atualizados. Skills → ciclo em `ai-skills`; remote `staging` → #167.

### 2026-07-10 — Config: .env.example + SETUP-CREDENTIALS ([#165](https://github.com/fortegb/platform/issues/165))

- **D-044:** `.env.example` canónico; SETUP reescrito sem secrets/Contentful; `.env` gitignored; docs only de estrutura (valores → #47).
- Template `env-example.md` + Ambientes. Área E de config (#162–#165) fechada na definição.

### 2026-07-10 — Config: gestão de secrets + acesso ([#164](https://github.com/fortegb/platform/issues/164))

- **D-043:** owner = ForteGB tech; sócios sem API keys; must-not em git/chat/docs; rotação em vazamento; sem vault pago no v1; docs only.
- Template `secrets-access.md` + Ambientes. `.env.example` → #165.

### 2026-07-10 — Config: scoping Production/Preview/local ([#163](https://github.com/fortegb/platform/issues/163))

- **D-042:** três superfícies de valores; `APP_ENV` + classe de backends por scope; Development Vercel não obrigatório; docs only.
- Template `env-scoping.md` + Ambientes. Acesso → #164; `.env.example` → #165.

### 2026-07-10 — Config: inventário + nomes de env vars ([#162](https://github.com/fortegb/platform/issues/162))

- **D-041:** convenção `SCREAMING_SNAKE` / `NUXT_PUBLIC_*` / prefixos vendor; inventário canónico (v1/v2); overrides `INTEGRATION_TIER_*`; docs only.
- Template `env-vars.md` + Ambientes. Scoping → #163; `.env.example` → #165.

### 2026-07-10 — Integrações: callbacks/webhooks por ambiente ([#161](https://github.com/fortegb/platform/issues/161))

- **D-040:** bases `fortegb.com` / `staging.fortegb.com`; Preview = bypass; local mock/túnel; path `/api/webhooks/<vendor>`; assinatura obrigatória; docs only.
- Template `integrations-webhooks.md` + Ambientes.

### 2026-07-10 — Integrações: alvos de teste seguros ([#160](https://github.com/fortegb/platform/issues/160))

- **D-039:** contrato must/must-not + slots TBD; secrets só Vercel/`.env`; docs only (sem IDs inventados).
- Template `integrations-safe-targets.md` + Ambientes.

### 2026-07-10 — Integrações: mapa por vendor ([#159](https://github.com/fortegb/platform/issues/159))

- **D-038:** inventário HubSpot/Tuya/WA/Telegram/Calendar/QStash; classes de safe-target; fases MVP; docs only (alvos → #160).
- Template `integrations-map.md` + Ambientes.

### 2026-07-10 — Integrações: modelo 3-tiers ([#158](https://github.com/fortegb/platform/issues/158))

- **D-037:** posturas mock / safe-target / prod-live; defaults por `APP_ENV`; overrides seguros; seleção de adaptadores; docs only (mapa → #159).
- Template `integrations-tiers.md` + Ambientes.

### 2026-07-10 — CMS: modelo de conteúdo ([#157](https://github.com/fortegb/platform/issues/157))

- **D-036:** types `house` / `blogPost` / stubs timeline+mediaKit; split marketing (Sanity) vs ops (Supabase) por `houseId`; vídeo URL; pt-BR only; docs only (schemas → #45).
- Template `cms-content-model.md` + Ambientes/architecture.

### 2026-07-10 — CMS: datasets por ambiente ([#156](https://github.com/fortegb/platform/issues/156))

- **D-035:** 1 projeto Sanity; datasets `staging` + `production`; Previews/local → staging; prod → production; promote explícito (não no deploy Vercel).

### 2026-07-10 — CMS: vendor Sanity ([#155](https://github.com/fortegb/platform/issues/155))

- **D-034:** CMS = **Sanity**; Contentful removido do stack (`package.json`, `useContentful` → `useCms` mocks).
- Docs vivos + SETUP/README atualizados; #45/#63 retitulados. Datasets → #156; modelo → #157.

### 2026-07-10 — Dados: seed/test data + LGPD ([#154](https://github.com/fortegb/platform/issues/154))

- **D-033:** pacote sintético partilhado local+staging; lookalike pt-BR; dummy RG/CNH; logins de teste; recreável; sem dump de prod.
- Template `seed-lgpd.md` + Ambientes. Sem `seed.sql` neste change. Hardening → #126; CMS fixtures → #156/#157.

### 2026-07-10 — Dados: runbook Supabase local ([#153](https://github.com/fortegb/platform/issues/153))

- **D-032:** OrbStack preferido no macOS (Docker Desktop OK); checklist local (CLI start/stop/status, Studio/keys, `db reset`, falhas comuns).
- Docs only — sem `supabase init`; scaffold → #171 / #43. Template `supabase-local.md` + Ambientes.

### 2026-07-10 — Dados: migrações Supabase CLI ([#152](https://github.com/fortegb/platform/issues/152))

- **D-031:** `supabase/migrations/` = fonte da verdade; apply via CLI (local Docker; staging→prod); sem migrate no deploy Vercel; forward-only; seed separado (#154).
- `docs/database-schema.sql` legado até portar. Sem init/primeira migração neste change (#153).

### 2026-07-10 — Dados: Supabase por ambiente ([#151](https://github.com/fortegb/platform/issues/151))

- **D-030:** 2 projetos cloud (`fortegb-staging` + `fortegb-prod`) + local Docker; Previews partilham staging; sem PII de prod no não-prod; schema-as-code único; auth redirects e scopes Vercel Production/Preview.
- Free tier: 2 activos; caveat de pause ~7d; caps de storage conhecidos. Sem provisionar projetos neste change.

### 2026-07-10 — Ambientes: domínios por ambiente ([#150](https://github.com/fortegb/platform/issues/150))

- **D-029:** prod=`fortegb.com`+`www`; staging=`staging.fortegb.com`; Previews=`*.vercel.app`; local=`localhost`; `.com.br` 301→`.com` (não host do app).
- Template + página Ambientes. Sem provisionar DNS/Vercel.

### 2026-07-10 — Passos 1–2: validação + higiene docs ([#177](https://github.com/fortegb/platform/issues/177))

- **D-028:** Contexto e Funcionalidades validados por grilling; mapa de oferta aceito; sem novos módulos inventados; jornadas/telas ficam no passo 5 (#176).
- **Higiene:** `platform-vision.md` / `deliverables.md` (checklist Architecture + Q-* alinhados; nota G2); retoques mínimos em `jornadas-plataforma.md` (estado atual, sem reescrever fluxos).
- Fecha a folha de consolidação sob #175. Build ainda gated por G2.

### 2026-07-10 — Ambientes: topologia Vercel ([#149](https://github.com/fortegb/platform/issues/149))

- **Um projeto Vercel:** Production=`main`; Preview=`staging`+feat/fix; senha compartilhada nos Previews (sócios sem conta Vercel); env Production vs Preview (staging-class).
- Canon D-027; template + página Ambientes. Sem provisionar o projeto nem domínios (#150).

### 2026-07-10 — Ambientes: mapeamento branch → ambiente ([#148](https://github.com/fortegb/platform/issues/148))

- **Mapa git → ambiente:** `main`=prod · `staging`=staging · `feat/*`/`fix/*` Preview=staging-class; caminho feat→staging→main; close vs promote separados.
- **Contrato opt-in** para `rbo-close-change` (default merge→`main` se sem config; `integrationBranch` se presente) — **código do skill diferido a #166**.
- Canon D-026; template + página Ambientes atualizados. Sem provisionar branch remota nem Vercel.

### 2026-07-10 — Ambientes: contrato local / staging / prod ([#147](https://github.com/fortegb/platform/issues/147))

- **Spec dos três ambientes lógicos** (grilling A1): propósito, dados, integrações (mock / safe-target / prod-live), promoção staging→prod, hotfix como exceção explícita/registrada, `APP_ENV`, local isolado (Nuxt/Node), staging privado.
- **Canon:** D-025 em `decisions.md`; template `docs/planning/templates/environments.md`; §7.1 em `architecture.md`; entrada em `DECISIONS.md` / `STATUS.md`.
- **Platform docs:** nova página sócios [`ambientes.html`](./docs/planning/ambientes.html) + card no índice + ponteiro em `arquitetura-decisoes.html`.
- **Fora de escopo:** provisionar cloud, mapear branches, Vercel, domínios ou pacote de seed (folhas seguintes).

### 2026-07-05 — Migração A: board para o Roteiro + overhaul das Platform docs ([#174](https://github.com/fortegb/platform/issues/174))

- **Board migrado para o modelo D-024:** novo campo **`Etapa`** (9 passos, ex-`Phase`), **~173 itens re-tagueados** (mapa por epic; folhas herdam o epic; `Phase` deletado). Milestone nativo **`v0 — Definição`** em todos os itens de Etapa 1–7 (barra de prontidão do G2). **Tipos de issue nativos** backfilled (Epic/Feature/Task). 2 epics novos: **Contexto & Funcionalidades** ([#175](https://github.com/fortegb/platform/issues/175), Etapa 1–2) e **Jornadas re-validação** ([#176](https://github.com/fortegb/platform/issues/176), Etapa 5); #42 → `Depends on #146`.
- **Renomeação Método → Roteiro** (o nome "Método" não descrevia uma sequência de passos): `metodo.md → roteiro.md`, D-023/D-024, `agents.md §9`, `STATUS.md`, README, títulos das issues #173/#174. Passo 7 renomeado **Quebra → Versionamento**; passo 8 = **Execução** (ex-"Build"). Board Etapa option 7 renomeado in-place.
- **Platform docs (overhaul):** `mapa-fases.html` → novo **`mapa-roteiro.html`** — track horizontal por passo (9 nós, 3 estágios em bandas), barra `v0` ao vivo, portões **G1/G2/G3** definidos e mostrados, cards v1/v2/v3. Gerador `generate-progress-report.mjs` reescrito para agrupar por **Etapa + Milestone** (novo `etapa-labels.mjs`); `progresso-socios.html` regenerado; `index.html`/`arquitetura-decisoes.html` de-Phased.
- **Fora de escopo:** migração B (Milestones v1/v2/v3 + atribuição de versão no passo 7). Sem código de produto tocado.

### 2026-07-05 — Método do projeto: espinha de governança ([#173](https://github.com/fortegb/platform/issues/173))

- **Novo canon `docs/planning/metodo.md`** — a **espinha controladora**: 9 passos em 3 estágios (Definição 1–7 · Execução 8 · Evolução 9), com propósito/artefato por passo, gates **G1** (sequência), **G2** (build só após Definição 1–7 fechada; ativo 4–6; sinal = Milestone `v0` a 100%), **G3** (versão N+1 após readiness de N). Enforcement soft (doc + `rbo-create-change` + STATUS; sem hard-gate Action).
- **Modelo de board (D-024)** — campo **`Etapa`** (9 opções, supersede `Phase` 0–4) + **`Milestone`** nativo (`v0 Definição` → v1 → v2 → v3) + **tipos de issue nativos** (Feature/Bug/Task/Epic; `chore` só em commits → Task). Atribuição de versão = passo 7 (epic sem Milestone = fila; nada esquecido). **Sem sprints** (releases scope-boxed).
- **D-023** (método como espinha + gates) e **D-024** (modelo de board) em `decisions.md`.
- **Wiring:** ponteiros a `metodo.md` em `README.md` (planning), `agents.md §9` (+ convenção de tipos nativos), `STATUS.md` (passo atual = 4 Arquitetura).
- **Draft-mark:** `jornadas-plataforma.md` e `screen-map.md` → re-validar no passo 5 (após #146).
- **Escopo:** só canon/docs — **board não migrado** (Phase 0–4 em uso até migração A, que também refaz as Platform docs). Sem código de produto tocado.

### 2026-07-05 — Epic Arquitetura da solução & ambientes ([#146](https://github.com/fortegb/platform/issues/146)) + auditoria repo-wide

- **Novo epic "Arquitetura da solução & ambientes (definição completa)" ([#146](https://github.com/fortegb/platform/issues/146))** com 26 issues folha (#147–#172) em 7 áreas: A Ambientes · B Dados · C CMS · D Integrações · E Config/secrets · F CI/CD · G Dev local. Motivo (→ **D-022**): o epic Architecture (#1) cobriu produto/stack, mas **não** infra/ambientes/integrações — a definição completa **precede o build da Fase 1** (#48/#56). Correção do overclaim "Fase 1 desbloqueada" da entrada de 2026-07-04.
- **Modelo de integrações em 3 camadas** (local=mock · staging=API real contra alvos seguros próprios · prod=live) — motivado pelo risco de código com bug destrancar portas reais. **D-017 (serverless) em reavaliação** no #146 (explore §8: staging/prod ≈ empate com persistente).
- **Convenção de ordem de trabalho:** dependências registradas no corpo da issue (`**Depends on:** #X`); próximo = Todo da fase sem dependência aberta.
- **Auditoria de staleness + pt-BR (repo-wide, 7 lotes):** deep-read de todos os docs de planejamento e Platform docs; correção de informação desatualizada (gate do build = #146, home por estilo, D-015..D-022) e varredura pt-PT ampliada (45+ termos, incl. `arquitectura`, gerúndios "está a …", `planeado`, `partilhado`, `aceite`) — inclusive em `decisions.md`/`CHANGELOG.md` (regra: pt-BR vence append-only para correção de língua). Varredura final = 0 ocorrências no escopo docs/ + arquivos de controle.

- **CRM ([#28](https://github.com/fortegb/platform/issues/28), Q-007/Q-018 → D-019/D-020):** **Supabase master + HubSpot sync**; modelo `cliente` (único por CPF) 1─N `registro` (por casa) + `historico`; dois níveis Contato→Cliente; feature **"Registro de Cliente"** (não "Comissões"); rota `/staff/registros`.
- **Home ([#33](https://github.com/fortegb/platform/issues/33), Q-010 → D-021):** variantes renomeadas por **estilo** (`/`, `/classico`, `/slate`, `/azul`; `HeroSplit/Classic/Slate/Azul`) — sem colisão com release v1/v2/v3; escolha do hero diferida ao lançamento.
- **Epic Architecture ([#1](https://github.com/fortegb/platform/issues/1)) fechado** (#34/#35/#36/#38): checkpoint #36 = todas Q-* resolved/deferred; **Fase 0 completa → Fase 1 desbloqueada** (#48, #56). `platform-vision.md` + `agents.md §9` + `STATUS.md` atualizados.
- **pt-BR estrito repo-wide** (correção de português europeu) + **terminologia unificada** `lead/prospecto → cliente` (docs + títulos de issues).
- **Platform docs:** seção "Clientes e corretores" + v1/v2/v3 no Mapa de Fases e Relatório; ponteiro de fase (Fase 0 done → Fase 1). OpenSpec `grill-crm-source-of-truth` arquivado; `#33` (home) foi change **lightweight** (branch merged, sem artefato OpenSpec).
- **Correções pós-auditoria:** linha duplicada em `agents.md` §9 (introduzida nesta sessão) removida; pt-PT `activos → ativos` em `agents.md` (straggler que a varredura excluíra); regra CHANGELOG reforçada no skill `rbo-close-change`.

### 2026-07-03 — Grilling 0: stances fundacionais + Q-004 ([#145](https://github.com/fortegb/platform/issues/145))

- Stances fundacionais resolvidas (D-015..D-018): constraints, build-vs-buy, **Q-004** (CMS + Supabase), system shape (**serverless**), MVP boundary (**v1/v2/v3**; tours → v2).
- Canon: `open-questions.md` (Q-004 resolved), `decisions.md` (D-015..018), `architecture.md` §1/§4/§5/§7, root `DECISIONS.md`, `STATUS.md`, `agents.md` §9.
- Platform docs: nova página **`arquitetura-decisoes.html`** (user-readable) + **`runtime-serverless-vs-persistent.html`** (comparação estilizada) + cards/links no índice.
- Explore capture `runtime-serverless-vs-persistent.md`. OpenSpec `grill-foundational-architecture` arquivado.

### 2026-07-03 — Platform docs: screen map + naming (publish)

- Índice `docs/index.html` — **Documentação da plataforma**, card mapa de telas.
- `screen-map.html` gerado a partir de `screen-map.md`.
- Marcas alinhadas; `mapa-fases` Phase 0 atual; scripts `pages:portal` atualizados.

### 2026-07-03 — Board hygiene + screen map MVP ([#139](https://github.com/fortegb/platform/issues/139), [#32](https://github.com/fortegb/platform/issues/32))

- Topics A + B: `phases.md`, `architecture.md`, `deliverables.md`, `modules.md`, explore notes.
- **`screen-map.md`** — routes por role (mock/new, phase, epic); #32 aceito.
- Platform docs naming; Integrações → module `platform` (#72); workflow close-out.
- OpenSpec `epics-issues-review` arquivado.

- Página `modules.html` gerada a partir de `modules.md`; card no index e links no mapa-fases.
- Jornadas: pilares → módulos; cards de papel → âncoras; hover só em cards clicáveis.
- `portal.css`: lift restrito a `a.card` / `.card-interactive`.
- Mapa-fases: label "Relatório de Progresso"; seção obsoleta removida.
- GitHub Pages: publish legacy `/docs`; GHA auto-deploy desativado.
- OpenSpec `partner-portal-polish` arquivado; spec `partner-portal` criada.

### 2026-07-01 — Sessão handoff (máquina principal)

- Push sync `0a6af59` para `origin/main`; working tree limpa.
- `STATUS.md` atualizado para próxima sessão (Mac Mini ou Architecture).
- `docs/setup-mac-mini.md` — troubleshooting Git LFS lock verify.

### 2026-07-01 — Phase 0 fundação (org + platform)

**GitHub & infra**
- Org **`fortegb`** criada; personal renomeado **`fortegb-admin`**; **`rbonon`** Owner.
- Repos na org: **`platform`**, **`app-despesas`**, **`ai-assets`** (D-014).
- Repo **`sandbox` → `platform`** (D-012).
- Issue types org: Task, Bug, Feature, Epic.
- GitHub Project **`platform`** + campos Phase/Module; issues [#1](https://github.com/fortegb/platform/issues/1) Architecture, [#2](https://github.com/fortegb/platform/issues/2) Brand assets.
- **OpenSpec** inicializado no repo.

**Dotfiles (rbonon/dotfiles 0.8.1)**
- `auth` / `commit_as` para namespace org; dev git = rbonon (D-013).
- Re-clones locais com remote `rbonon@github.com/fortegb/...`.

**Docs**
- `STATUS.md`, `ROADMAP.md`, `modules.md`, runbook migration marcado concluído.

### 2026-07-01 (cont.)

**Planning finalizado — pronto para Phase 0 execução**
- **`docs/planning/`** completo: README, platform-vision, architecture (template), phases, modules, open-questions (Q-001–Q-019), decisions (D-001–D-011), workflow, github-org-migration, **deliverables** (mapa produto ↔ epics).
- **D-011:** decisões arquiteturais abertas até epic Architecture + `rbo-grilling`.
- Gaps de produto mapeados: corretor termos (Q-016), condomínio/portaria (Q-017), CRM multi-canal (Q-018), mobile (Q-019).
- **`STATUS.md`** — próximo passo: GitHub org migration Fase A.

**Reestruturação de epics (D-010)**
- Phase 1: Platform environments, Identity/roles/journeys, Public site UI finalization, Brand & design system.
- Phase 2: Integrations MVP, Release readiness; CRM/tours reordenados.
- Phase 3: Physical-digital bridge, Content operations.
- Removido epic Phase 0 Home 2 vencedores (absorvido em Public site UI P1).
- Criada pasta **`docs/planning/`** com visão, módulos, fases, perguntas abertas, decisões (D-001–D-008), workflow e runbook de migração GitHub org.
- **`STATUS.md`** reestruturado como bússola de sessão (epics, próximo passo, links planning).
- **`AGENTS.md`** seção 9 atualizada (planning canon, ROADMAP, Phase 0).

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

**Repositório / manutenção**
- `.gitignore`: passou a ignorar `.DS_Store`, `.nuxt`, `.output` e `dist`.
- Removidos do versionamento os arquivos `.DS_Store` e os artefatos de build em `.nuxt/`.
- Branch de trabalho `test/element-sizing` mesclada em `main` e removida.
