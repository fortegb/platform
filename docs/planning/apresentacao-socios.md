# ForteGB — Apresentação aos Sócios

> **Para:** Adilson e Felipe · **Por:** Ricardo · **Data:** julho/2026  
> **Objetivo:** validar modelo de negócio, decisões e plataforma digital — **não** detalhe técnico.  
> **Versão gráfica:** abrir [`apresentacao-socios.html`](./apresentacao-socios.html) no browser (ou imprimir como PDF).

> **Manutenção:** este documento é um **snapshot para apresentação** — foco forte em **corretores** (jul/2026).  
> **Fonte da verdade:** [`company-structure.md`](./company-structure.md). Pedir **refresh** a Ricardo/AI quando decisões mudarem — não atualizar à mão em paralelo ao canon.

**Documento completo (referência):** [`company-structure.md`](./company-structure.md)

---

## 1. Resumo executivo

A ForteGB constrói e vende casas em Campinas. Queremos **vender mais** com **menos fricção** — site, visitas autoguiadas, marketing aberto — **sem** brigar com corretores.

**Ideia central:**

> **Preço único** para todos · Corretor **registra o cliente antes** · ForteGB pode divulgar à vontade · **Comissão garantida** se o comprador era registrado.

**Valores:** transparência, confiança, proximidade — sem jogos (inclui aviso aos corretores na venda com dados do comprador).

---

## 2. Quem somos e como decidimos

### Sócios

```mermaid
flowchart TB
  R["Ricardo Bonon · 53"]
  A["Adilson Gonçalves · 66"]
  F["Felipe Bonon Gonçalves · 33"]
  R ---|cunhado| A
  A -->|filho| F
  R -.->|sobrinho| F
```

| Sócio | Papel (plataforma / apresentação) |
|-------|-----------------------------------|
| **Ricardo** | Fundador · Investidor · **Admin** · Arquiteto Digital · Desenvolvedor Digital |
| **Adilson** | Fundador · Investidor · **Admin** |
| **Felipe** | Fundador · Investidor · **Admin** · Arquiteto Digital · Desenvolvedor Digital |

> Detalhe operacional interno (obra, compras, vendas): [`company-structure.md`](./company-structure.md) §1–§2 — não exposto na apresentação pública.

### Regras de decisão

| Situação | Quem decide |
|----------|-------------|
| **Acima de R$ 100.000** | **Os três** (unanimidade) |
| **Terreno, preço, fecho de venda** | **Os três** |
| **Dia-a-dia abaixo de R$ 100k** | Sócios conforme acordado |
| **Plataforma — Criação** | Ricardo (autofinanciado) · **os três** aprovam se vai a produção |
| **Plataforma — prontidão e custos** | Ricardo apresenta → **os três** aprovam se vai a produção |

---

## 3. Operação hoje (obra e negócio)

| Área | Nota |
|------|------|
| Obra | Mestre de obras por casa; acompanhamento pelos sócios |
| Negócio | Compras, vendas e marcos — decisão **entre os três** quando relevante |
| Finanças | PIX; registro partilhado (planilha hoje) |
| Legal | PF — **ForteGB = marca**; sem CNPJ/LTDA por agora |

**Casas concluídas:** 01 R-35 · 02 P-31 · 03 Q-21 (em curso/venda conforme estado atual).

---

## 4. O problema com corretores (passado)

```mermaid
flowchart LR
  C[Corretor traz cliente] --> M[Cliente vê placa/site]
  M --> D[Contacta ForteGB direto]
  D --> X[Corretor perde comissão?]
  X --> F[Corretor esconde contatos]
  F --> G[Guerra com marketing ForteGB]
```

- Vendas passadas: **via corretores**, acordos **informais**.
- Comissão típica região ~**5%**; negociámos **3%** nas duas vendas.
- Pagamento em **duas etapas:** sinal + escritura.

---

## 5. Modelo novo com corretores (proposta validada)

### Cinco pilares

1. **Preço unificado** — mesmo valor corretor ou direto  
2. **Contrato por casa** — Gov.br; Juliana Mestrinier revisa modelo v0.1  
3. **Registro de Cliente** — bot WhatsApp (nome + CPF) **antes** da visita  
4. **Comissão garantida** — se comprador era registrado  
5. **Transparência na venda** — WhatsApp + PDF (nome + CPF comprador) a todos os corretores da casa  

### Fluxo do cliente

```mermaid
sequenceDiagram
  participant Cor as Corretor
  participant Bot as WhatsApp ForteGB
  participant P as Cliente
  participant FG as ForteGB
  Cor->>Bot: Nome + CPF
  Bot->>Cor: Confirmação + PDF
  Note over P,FG: Cliente vê marketing / visita
  P->>FG: Contato ou visita
  FG->>FG: Cliente ligado ao corretor
  Note over FG,Cor: Venda → comissão se comprador registrado
```

### Regras importantes

| Regra | Detalhe |
|-------|---------|
| Registro **por casa** | Mesmo cliente pode ser corretor numa casa e direto noutra |
| Sem registro prévio | Cliente **direto** ForteGB — sem comissão |
| Validade | Até a **casa ser vendida** (sem prazo 30 dias) |
| Informal | Ainda possível, mas **sem** garantias do portal |

---

## 6. Onboarding do corretor (self-service)

### Conta (uma vez)

Registro e-mail → apresentação + termos no site → **staff notificado em cada passo**

### Por casa (repete)

```mermaid
flowchart LR
  A[Reclamar casa] --> B[Gov.br]
  B --> C[Staff aprova]
  C --> D[Clientes + visitas]
  D --> E[Outra casa?]
  E --> A
```

- **Reclamar casa:** 1.ª casa no onboarding **ou** corretor já ativo vê **outras ofertas**  
- **Qualquer staff** pode aprovar  
- **CRECI** preferencial, **mesmo fluxo** sem CRECI  

**Piloto:** Juliana Mestrinier — revisão contrato + primeira corretora formal.

---

## 7. Plataforma — o que muda para vocês

| Pessoa | Na plataforma |
|--------|---------------|
| **Ricardo** | **Admin** · Arquiteto Digital · Desenvolvedor Digital |
| **Adilson** | **Admin** |
| **Felipe** | **Admin** · Arquiteto Digital · Desenvolvedor Digital |
| **Cláudia / Gisele** | Staff (operação) |

**Funcionalidades principais (visão):**

- Site + portfólio + marketing  
- **Visitas autoguiadas** (QR + agendada) — direto ou *«Seu corretor: …»*  
- Portal corretor + bot WhatsApp  
- **`app-despesas`** depois — substituir planilha (custos por casa)  

---

## 8. O que pedimos ao trio — checklist

- [ ] Confirmar limiar **R$ 100k** e decisões a três  
- [ ] Confirmar modelo corretor (preço único + registro antes)  
- [ ] Confirmar papéis na plataforma — **três admins**; digital Ricardo + Felipe  
- [ ] Confirmar contrato **por casa** + aprovação **staff**  
- [ ] Autorizar Ricardo + Juliana a fechar contrato v0.1?  

---

## 9. Próximos passos

| # | Ação | Quem |
|---|--------|------|
| 1 | Reunião de validação (esta apresentação) | Trio |
| 2 | Juliana revisa contrato v0.1 | Ricardo + Juliana |
| 3 | Piloto: 1 corretor + 1 casa | ForteGB |
| 4 | Definir arquitetura de infra/ambientes/integrações (Epic #146) antes do build | Ricardo (+ Felipe opcional) |

---

## Anexos

| Documento | Conteúdo |
|-----------|----------|
| [`company-structure.md`](./company-structure.md) | Detalhe completo |
| [`corretor-contract-template.md`](./corretor-contract-template.md) | Rascunho contrato (Juliana) |
| [`apresentacao-socios.html`](./apresentacao-socios.html) | **Versão gráfica** para browser/PDF |
