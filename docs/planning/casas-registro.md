# Casas — registro real e nomenclatura comercial

> Master data real das casas ForteGB — primeira vez que dados reais (não mock) são registrados em qualquer lugar do repo. `data/mock.ts` continua sendo dado fictício, sem relação com este registro.

## Registro

| Casa | Código técnico (lote) | Status | Tipo | Piscina | Rua real | Nome comercial |
|---|---|---|---|---|---|---|
| Casa 00 | U-30 | Construída e vendida | Térrea | Não | Rosa Arco-Íris | Casa Jasmim |
| Casa 01 | R-35 | Construída e vendida | Térrea | Não | Tulipa Vermelha | Casa Tulipa |
| Casa 02 | P-31 | Construída e vendida | Térrea | Não | Lírio Roxo | Casa Lírio |
| Casa 03 | Q-21 | Construída, disponível (no mercado agora) | Sobrado | Sim | Jacatiá | **Casa Jacatiá** |
| Casa 04 | 2-24 | Em fase de projeto | Térrea | Sim | Curruíra | Casa Sabiá |
| Casa 05 | 2-23 | Em fase de projeto | Térrea | Sim | Curruíra (mesma rua da 04, lado a lado) | Casa Beija-Flor |

`houseNumber` (Casa 0X) e `lotCode` (código técnico) mapeiam direto aos campos já modelados em [cms-content-model.md](./templates/cms-content-model.md) (D-036) — uso interno/staff, nunca expostos ao público.

## Política de nomenclatura comercial

Nome comercial = **"Casa [nome]"**. A categoria da espécie funciona como sinalizador implícito de faixa de valor, sem precisar de um campo formal de "tier":

- 🌳 **Árvores** → sobrado (faixa alta)
- 🐦 **Pássaros** → térrea + piscina (faixa média)
- 🌸 **Flores** → térrea sem piscina (faixa base)

Nomes espelham a rua real (já batizada com tema de natureza) quando a palavra funciona bem isoladamente. Cai para o banco reservado quando:
- duas casas dividem a mesma rua (04/05 — ambas na rua "Curruíra"),
- o nome da rua também é nome próprio comum (Casa 00: "Rosa" rejeitado — lido como nome de pessoa),
- a palavra carrega associação cultural indesejada (Casa 00: "Arco-Íris" rejeitado; banco de pássaros: "Tucano" descartado — mascote do PSDB),
- a palavra é pouco eufônica / difícil de pronunciar (Casa 04: "Curruíra" rejeitado — obscuro, difícil de falar; substituído por "Sabiá", o pássaro mais associado a lar/saudade na cultura brasileira via "Canção do Exílio").

## Banco reservado (29 nomes, para casas futuras)

- **Árvores (sobrado):** Jequitibá, Ipê-Roxo, Jatobá, Araucária, Jacarandá, Angelim, Cerejeira, Magnólia, Flamboyant, Sassafrás, Pau-Brasil
- **Pássaros (térrea + piscina):** Canário, Andorinha, Rouxinol, Cardeal, Bem-te-vi, Sanhaço, Pardal, Coleirinho
- **Flores (térrea sem piscina):** Girassol, Hortênsia, Azaleia, Camélia, Violeta, Orquídea, Bugambília, Primavera

## Contexto

Levantado em 2026-07-22 durante pedido excecional de conteúdo pré-lançamento para a Casa Jacatiá (Casa 03), a ser repassado a um corretor antes do CMS/DB existir (Sanity ainda stub, [#45](https://github.com/fortegb/platform/issues/45) pendente). Gap de campos de master data ainda não previstos (endereço detalhado, concessionárias, IPTU) sinalizado em [#43](https://github.com/fortegb/platform/issues/43).
