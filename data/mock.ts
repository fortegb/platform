// Dados mock temporários para visualização sem banco de dados
// Este arquivo será usado até que o banco de dados esteja configurado
//
// `featured: true` controla quais casas aparecem na home (seção "Nossos Projetos").
// Escolha manual, não automática — marque/desmarque conforme quiser trocar a vitrine.
//
// Casa Jacatiá (id: 7) é a única entrada real deste array — conteúdo, fotos e
// vídeos verdadeiros de uma casa à venda hoje (#218), adicionada aqui por
// exceção antes do CMS real existir. As demais 6 casas continuam fictícias.

export const mockHouses = [
  {
    id: 7,
    slug: 'casa-jacatia',
    title: 'Casa Jacatiá',
    tagline: 'Sobrado de alto padrão com 3 quartos (1 suíte com closet), piscina, ampla área gourmet e home office dedicado, em condomínio fechado com segurança 24h. Cozinha americana, com móveis inclusos na cozinha, área gourmet e banheiros — pronto para morar.',
    shortDescription: 'A Casa Jacatiá é um sobrado de alto padrão em condomínio fechado com segurança 24h, com um hall de entrada de pé-direito duplo de 6 metros e fachada com o mesmo cuidado na frente e nos fundos. São 207 m² distribuídos em 3 quartos (1 suíte com closet) e 4 banheiros, com cozinha americana de ilha, móveis planejados, cooktop e coifa inclusos. A área gourmet, integrada por amplas esquadrias de vidro, tem piscina, churrasqueira e banheiro completo, com móveis planejados inclusos na área gourmet e em todos os banheiros, além de home office dedicado e 4 vagas de garagem. Tudo executado rigorosamente conforme o conjunto completo de projetos, do arquitetônico à decoração — documentação completa e financiável, com dossiê da obra à disposição, pronta para morar hoje.',
    shortFeatures: [
      'Sobrado com 207 m², 3 quartos (1 suíte com closet)',
      'Home office dedicado',
      '4 banheiros com móveis planejados inclusos',
      'Hall com pé-direito duplo de 6 m',
      'Cozinha americana com ilha, móveis planejados, cooktop e coifa inclusos',
      'Piscina com sistema automatizado e banheiro completo',
      'Ampla área gourmet coberta com churrasqueira, coifa e móveis inclusos',
      '4 vagas de garagem sendo 2 cobertas',
      'Arquitetura contemporânea com ambientes integrados por amplas esquadrias de vidro',
      'Condomínio fechado, portaria e segurança 24h',
      'Documentação completa e regularizada — financiável'
    ],
    description: [
      'A Casa Jacatiá é um sobrado de alto padrão em condomínio fechado, com portaria e segurança privada 24 horas — pronta para morar hoje. Logo na entrada, um hall com pé-direito duplo de 6 metros já anuncia o tom da casa: espaço, luz e uma arquitetura arrojada. E não é só a fachada frontal que recebeu esse cuidado — os fundos da casa foram desenhados com a mesma atenção, resultando em uma vista posterior tão bonita quanto a de quem chega pela rua.',
      { heading: 'Distribuição dos Ambientes', text: 'A casa soma 207 m² de área construída, distribuídos em dois pavimentos. No térreo, a cozinha americana com ilha se abre para a sala de estar e, por amplas esquadrias de vidro, para uma área gourmet coberta com churrasqueira e coifa — um espaço para receber sem hora para acabar, já com piscina equipada com sistema automatizado e banheiro completo dedicado. Quatro vagas de garagem, sendo duas cobertas, recebem carros da família e das visitas com folga. No pavimento superior, uma suíte com closet, mais dois dormitórios, um home office dedicado e duas varandas — uma na frente, outra de frente para o quintal e a piscina — completam a casa. Todos os quatro banheiros vêm com box e móveis planejados inclusos.' },
      { heading: 'Arquitetura e Acabamentos', text: 'A arquitetura contemporânea aparece em cada detalhe: esquadrias de alumínio linha premium, com amplos vãos que integram o ambiente interno à área gourmet e à piscina, iluminação em LED embutida por toda a casa — incluindo um projeto de iluminação com barras de LED — e acabamentos de alto padrão, com revestimentos de primeira linha (Ceusa, Biancogres) e metais e louças Docol, Deca e Roca.' },
      { heading: 'Engenharia e Estrutura', text: 'Por trás dessa beleza está uma engenharia que os clientes devem conferir de perto — e por isso fazemos questão de mostrar. A casa foi executada rigorosamente conforme o conjunto integral de projetos: arquitetônico, estrutural, elétrico, hidráulico e de decoração. A estrutura é em alvenaria estrutural, com projeto estrutural completo — incluindo estudo geológico do solo — calculando fundação, vigas e pilares antes da primeira concretagem, um diferencial real frente a imóveis onde a estrutura é decidida na obra. As lajes são protendidas, mais resistentes e estáveis, permitindo vãos maiores e mais espaço na casa. Toda a fundação, vigas, pilares e lajes foram executados com concreto usinado, aplicado por equipamento especializado, garantindo solidez e segurança do início ao fim. As ferragens estruturais foram produzidas em indústria — não montadas manualmente na obra — exatamente como especificado no projeto. O projeto elétrico tem os circuitos corretamente dimensionados para cada ambiente e uso, evitando sobrecarga, e a rede de gás GLP é centralizada, com instalação certificada em tubulação rígida, seguindo as normas técnicas de segurança.' },
      { heading: 'Conforto e Automação', text: 'O conforto do dia a dia vem de um conjunto de sistemas pensados para simplificar a vida: aquecimento e pressurização central de água com boiler solar smart, controlado por smartphone; fechadura digital premium na entrada, com vídeo e integração ao celular; persianas eletrônicas smart em todos os dormitórios, compatíveis com assistentes digitais; cabeamento de rede Cat 6 na sala, quartos e escritório; e infraestrutura já instalada — dutos e cabeamento — para ar-condicionado nos quartos, escritório e na sala/cozinha integrada, simplificando bastante a instalação futura pelo comprador.' },
      { heading: 'Mobiliário e Paisagismo', text: 'A cozinha, a área gourmet e todos os banheiros já vêm mobiliados, com cooktop de indução e coifa incluídos — prontos para uso desde o primeiro dia. Para os demais ambientes, a casa vem com um projeto de decoração completo já pronto, para o comprador executar conforme seu próprio gosto. O paisagismo foi executado por um paisagista profissional, dando à casa o acabamento externo que combina com o cuidado investido dentro dela.' },
      { heading: 'Documentação e Transparência', text: 'Documentação completa e devidamente regularizada — imóvel financiável por qualquer instituição de crédito. E para quem se interessar pela casa, compartilhamos um dossiê completo antes da compra: fotos e vídeos da execução da obra, notas fiscais e comprovantes de cada etapa da construção, para total transparência e tranquilidade. Conheça sua casa em detalhes antes de comprar.' }
    ],
    image: '/images/casa-jacatia/fachada-01.jpg',
    gallery: [
      { category: 'Fachada', url: '/images/casa-jacatia/fachada-01.jpg' },
      { category: 'Fachada', url: '/images/casa-jacatia/fachada-02.jpg' },
      { category: 'Fachada', url: '/images/casa-jacatia/fachada-03.jpg' },
      { category: 'Fachada', url: '/images/casa-jacatia/porta-frontal.jpg' },
      { category: 'Área Externa', url: '/images/casa-jacatia/fachada-quintal-01.jpg' },
      { category: 'Área Externa', url: '/images/casa-jacatia/fachada-quintal-02.jpg' },
      { category: 'Área Externa', url: '/images/casa-jacatia/fachada-quintal-03.jpg' },
      { category: 'Piscina', url: '/images/casa-jacatia/piscina-01.jpg' },
      { category: 'Piscina', url: '/images/casa-jacatia/piscina-02.jpg' },
      { category: 'Hall de Entrada', url: '/images/casa-jacatia/hall-01.jpg' },
      { category: 'Hall de Entrada', url: '/images/casa-jacatia/hall-02.jpg' },
      { category: 'Hall de Entrada', url: '/images/casa-jacatia/hall-03.jpg' },
      { category: 'Sala de Estar', url: '/images/casa-jacatia/sala-estar-01.jpg' },
      { category: 'Sala de Estar', url: '/images/casa-jacatia/sala-estar-02.jpg' },
      { category: 'Sala de Estar', url: '/images/casa-jacatia/sala-estar-03.jpg' },
      { category: 'Cozinha', url: '/images/casa-jacatia/cozinha-01.jpg' },
      { category: 'Cozinha', url: '/images/casa-jacatia/cozinha-02.jpg' },
      { category: 'Lavabo', url: '/images/casa-jacatia/lavabo-social-01.jpg' },
      { category: 'Área Gourmet', url: '/images/casa-jacatia/area-gourmet-01.jpg' },
      { category: 'Banheiro', url: '/images/casa-jacatia/banheiro-piscina-01.jpg' },
      { category: 'Banheiro', url: '/images/casa-jacatia/banheiro-piscina-02.jpg' },
      { category: 'Área de Serviço', url: '/images/casa-jacatia/lavanderia-01.jpg' },
      { category: 'Área de Serviço', url: '/images/casa-jacatia/lavanderia-02.jpg' },
      { category: 'Suíte', url: '/images/casa-jacatia/suite-01.jpg' },
      { category: 'Suíte', url: '/images/casa-jacatia/suite-02.jpg' },
      { category: 'Closet', url: '/images/casa-jacatia/suite-closet-01.jpg' },
      { category: 'Closet', url: '/images/casa-jacatia/suite-closet-02.jpg' },
      { category: 'Banheiro', url: '/images/casa-jacatia/suite-banheiro-01.jpg' },
      { category: 'Banheiro', url: '/images/casa-jacatia/suite-banheiro-02.jpg' },
      { category: 'Quarto', url: '/images/casa-jacatia/dormitorio-2-01.jpg' },
      { category: 'Quarto', url: '/images/casa-jacatia/dormitorio-2-02.jpg' },
      { category: 'Quarto', url: '/images/casa-jacatia/dormitorio-1-01.jpg' },
      { category: 'Quarto', url: '/images/casa-jacatia/dormitorio-1-02.jpg' },
      { category: 'Escritório', url: '/images/casa-jacatia/home-office-01.jpg' },
      { category: 'Escritório', url: '/images/casa-jacatia/home-office-02.jpg' },
      { category: 'Banheiro', url: '/images/casa-jacatia/banheiro-social-superior.jpg' },
    ],
    features: [
      { text: 'Sobrado com 3 quartos (1 suíte com closet + 2 dormitórios), 4 banheiros', grupo: 'destaque' as const },
      { text: 'Hall com pé-direito duplo de 6 m', grupo: 'destaque' as const },
      { text: 'Arquitetura contemporânea, com esquadrias amplas integrando o ambiente interno à área gourmet e à piscina', grupo: 'destaque' as const },
      { text: 'Fachada com o mesmo cuidado arquitetônico na frente e nos fundos da casa, resultando em uma vista posterior tão bonita quanto a frontal', grupo: 'destaque' as const },
      { text: '207 m² de área construída', grupo: 'destaque' as const },
      { text: 'Área gourmet coberta com churrasqueira, coifa e móveis planejados inclusos', grupo: 'destaque' as const },
      { text: 'Home office dedicado', grupo: 'destaque' as const },
      { text: '4 vagas de garagem sendo 2 cobertas', grupo: 'destaque' as const },
      { text: 'Piscina com sistema automatizado e banheiro dedicado', grupo: 'destaque' as const },
      { text: 'Todos os banheiros com box e móveis planejados inclusos', grupo: 'destaque' as const },
      { text: '2 varandas, uma frontal e outra com vista para o quintal e a piscina', grupo: 'destaque' as const },
      { text: 'Cozinha americana com ilha, móveis planejados, cooktop de indução e coifa inclusos', grupo: 'destaque' as const },
      { text: 'Projeto de decoração completo para toda a casa — cozinha, área gourmet e banheiros já executados e mobiliados; os demais ambientes vêm com o projeto pronto, para o comprador executar conforme seu gosto', grupo: 'destaque' as const },
      { text: 'Sistema de aquecimento e pressurização central de água com boiler a energia solar smart controlado por smartphone', grupo: 'destaque' as const },
      { text: 'Fechadura digital premium com vídeo e integração smartphone', grupo: 'destaque' as const },
      { text: 'Persianas eletrônicas smart em todos os dormitórios, compatível com assistentes digitais', grupo: 'destaque' as const },
      { text: 'Rede de dados via cabeamento Cat 6 na sala, quartos e escritório', grupo: 'destaque' as const },
      { text: 'Infraestrutura para ar-condicionado instalada (dutos, cabeamento) nos quartos, escritório e sala/cozinha', grupo: 'destaque' as const },
      { text: 'Projeto de iluminação moderno instalado, incluindo elementos como barras de LED', grupo: 'destaque' as const },
      { text: 'Paisagismo executado por paisagista profissional', grupo: 'destaque' as const },
      { text: 'Condomínio fechado, portaria e segurança privada 24h', grupo: 'destaque' as const },
      { text: 'Documentação completa e regularizada — financiável', grupo: 'destaque' as const },
      { text: 'Dossiê completo do imóvel, compartilhado com você antes da compra — fotos e vídeos da execução da obra, notas fiscais e comprovantes de cada etapa da construção, para total transparência e tranquilidade', grupo: 'destaque' as const },
      { text: 'Pronta para morar', grupo: 'destaque' as const },
      { text: 'Execução rigorosamente conforme o conjunto integral de projetos: arquitetônico, estrutural, elétrico, hidráulico e decoração', grupo: 'engenharia' as const },
      { text: 'Projeto estrutural completo de alvenaria estrutural incluindo estudo geológico do solo, diferenciais frente a outros imóveis', grupo: 'engenharia' as const },
      { text: 'Lajes protendidas, com resistência e estabilidade superiores, permitindo vãos maiores e mais espaço na casa', grupo: 'engenharia' as const },
      { text: 'Fundação, vigas, pilares e lajes executados com concreto usinado, aplicado por equipamento especializado', grupo: 'engenharia' as const },
      { text: 'Ferragens estruturais produzidas em indústria, e não manualmente na obra, exatamente conforme projeto, garantindo segurança e solidez', grupo: 'engenharia' as const },
      { text: 'Projeto elétrico completo, com circuitos dimensionados corretamente para cada ambiente e uso, evitando sobrecarga', grupo: 'engenharia' as const },
      { text: 'Rede de gás GLP centralizada, com instalação certificada em tubulação rígida, seguindo normas técnicas de segurança', grupo: 'engenharia' as const },
      { text: 'Esquadrias de alumínio linha premium', grupo: 'engenharia' as const },
      { text: 'Revestimentos de primeira linha com marcas como Ceusa, Biancogres', grupo: 'engenharia' as const },
      { text: 'Metais e louças premium Docol, Deca, Roca', grupo: 'engenharia' as const },
    ],
    videoUrls: [
      'https://youtube.com/shorts/34dWZq2BEIg',
      'https://youtube.com/shorts/NLKdoLu0MSw'
    ],
    floorplans: [
      { label: 'Planta Baixa', thumbnailUrl: '/images/floorplans/casa-jacatia-planta-thumb.png', fileUrl: '/images/floorplans/casa-jacatia-planta.png', type: 'image' as const }
    ],
    area: 207,
    bedrooms: 3,
    bathrooms: 4,
    price: 1800000,
    status: 'disponivel' as const,
    featured: true,
    location: 'Rua Jacatiá, Paulínia-SP'
  },
  {
    id: 1,
    slug: 'casa-jardim-dos-ipes',
    title: 'Casa Jardim dos Ipês',
    tagline: 'Casa moderna e confortável, perfeita para famílias que buscam qualidade e tranquilidade em Campinas-SP.',
    description: ['Esta bela casa de 3 quartos oferece conforto e modernidade em um dos bairros mais tranquilos de Campinas. Com acabamento de primeira linha, a propriedade conta com sala ampla, cozinha integrada, área de serviço completa e área de lazer com piscina. Os quartos são espaçosos, sendo a suíte master com closet. Localizada próxima a escolas, comércio e vias de fácil acesso.'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    gallery: [
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1556911073-38141963c9e0?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop' }
    ],
    features: ['Piscina', 'Suíte master com closet', 'Cozinha integrada', 'Área de serviço completa', 'Próximo a escolas e comércio'],
    videoUrls: [],
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    price: 450000,
    status: 'vendido' as const,
    featured: false,
    location: 'Jardim dos Ipês, Campinas-SP'
  },
  {
    id: 2,
    slug: 'residencia-vila-verde',
    title: 'Residência Vila Verde',
    tagline: 'Casa espaçosa com 4 quartos, ideal para famílias grandes. Piscina, churrasqueira e área de lazer completa.',
    description: [
      'Excelente oportunidade! Casa em construção com 4 quartos, sendo 2 suítes. Área de lazer completa com piscina, churrasqueira coberta, espaço gourmet e playground. Sala ampla em dois ambientes, cozinha planejada com ilha, escritório, despensa e lavabo. Garagem para 3 carros.',
      'Acabamento premium em toda a residência, com método construtivo de qualidade superior e execução rigorosamente conforme os projetos aprovados — do arquitetônico ao estrutural, passando pelos complementares elétrico e hidráulico. A casa conta com sistema de aquecimento por boiler e placas solares, com controle via aplicativo, além de persianas smart integradas à Alexa para mais conforto no dia a dia.',
      'Todo o processo construtivo é documentado em vídeo, do início ao fim: você vê exatamente o que está comprando, da fundação ao acabamento. É assim que a ForteGB constrói — com segurança, transparência e confiabilidade em cada etapa do projeto, para você comprar com a tranquilidade de saber exatamente o que está adquirindo. Previsão de entrega: 6 meses.'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    gallery: [
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1556911073-38141963c9e0?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&h=800&fit=crop' },
    ],
    features: [
      'Piscina',
      'Churrasqueira coberta',
      'Espaço gourmet',
      'Playground',
      'Cozinha planejada com ilha',
      'Escritório',
      'Garagem para 3 carros',
      'Suíte master com closet',
      'Despensa',
      'Lavabo',
      'Sala ampla em dois ambientes',
      'Área de serviço completa',
      'Acabamento premium em toda a residência',
      'Aquecimento solar com boiler e controle via aplicativo',
      'Persianas smart integradas à Alexa',
      'Execução conforme projeto arquitetônico, estrutural, elétrico e hidráulico',
      'Obra 100% documentada em vídeo, da fundação ao acabamento'
    ],
    videoUrls: ['https://www.youtube.com/watch?v=9hjjugdRIgI'],
    floorplans: [
      { label: 'Planta Baixa', thumbnailUrl: '/images/floorplans/vila-verde-planta-thumb.png', fileUrl: '/images/floorplans/vila-verde-planta.png', type: 'image' as const }
    ],
    area: 205,
    bedrooms: 4,
    bathrooms: 3,
    price: 1750000,
    status: 'em-construcao' as const,
    featured: true,
    location: 'Vila Verde, Campinas-SP'
  },
  {
    id: 3,
    slug: 'casa-moderna-parque-dos-pinheiros',
    title: 'Casa Moderna Parque dos Pinheiros',
    tagline: 'Casa compacta e moderna, ideal para casais jovens ou pequenas famílias que buscam praticidade e conforto.',
    description: ['Casa nova, moderna e funcional. Com 2 quartos, sendo 1 suíte, sala integrada com cozinha, área de serviço e quintal. Perfeita para quem busca o primeiro imóvel ou investimento. Localizada em região valorizada, próxima ao centro e com fácil acesso às principais vias de Campinas. Financiamento facilitado disponível.'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    gallery: [
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1556911073-38141963c9e0?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop' },
    ],
    features: ['Suíte', 'Sala integrada com cozinha', 'Quintal', 'Financiamento facilitado'],
    videoUrls: [],
    area: 100,
    bedrooms: 2,
    bathrooms: 2,
    price: 320000,
    status: 'vendido' as const,
    featured: false,
    location: 'Parque dos Pinheiros, Campinas-SP'
  },
  {
    id: 4,
    slug: 'casa-familia-barueri',
    title: 'Casa Família Barueri',
    tagline: 'Casa com 3 quartos, acabamento premium, piscina e área gourmet. Perfeita para receber amigos e familiares.',
    description: ['Casa com arquitetura moderna e acabamento de alto padrão. 3 quartos (2 suítes), sala de estar e de jantar separadas, cozinha planejada com bancada em granito, área gourmet completa com churrasqueira e forno de pizza. Piscina aquecida, jardim paisagístico e garagem para 2 carros. Sistema de segurança e automação residencial.'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    gallery: [
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop' },
    ],
    features: ['Piscina aquecida', 'Área gourmet com forno de pizza', 'Cozinha planejada com bancada em granito', 'Jardim paisagístico', 'Sistema de segurança e automação residencial', 'Garagem para 2 carros'],
    videoUrls: [],
    area: 180,
    bedrooms: 3,
    bathrooms: 3,
    price: 580000,
    status: 'disponivel' as const,
    featured: true,
    location: 'Barueri, Campinas-SP'
  },
  {
    id: 5,
    slug: 'residencia-alto-do-campo-belo',
    title: 'Residência Alto do Campo Belo',
    tagline: 'Casa espaçosa com 5 quartos, piscina, área de lazer completa e vista privilegiada. Excelente investimento.',
    description: ['Residência de alto padrão com 5 quartos (3 suítes), sala em 3 ambientes, cozinha gourmet integrada, escritório, lavabo social e área de serviço completa. Área de lazer com piscina, sauna, espaço fitness, churrasqueira e área gourmet coberta. Jardim paisagístico, sistema de irrigação automática e garagem para 4 carros. Vista panorâmica da região.'],
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
    gallery: [
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1556911073-38141963c9e0?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&h=800&fit=crop' },
    ],
    features: ['Piscina e sauna', 'Espaço fitness', 'Área gourmet coberta', 'Escritório', 'Irrigação automática', 'Garagem para 4 carros', 'Vista panorâmica'],
    videoUrls: [
      'https://www.youtube.com/watch?v=9hjjugdRIgI',
      'https://www.youtube.com/watch?v=ldASW6as3LU',
      'https://www.youtube.com/watch?v=SbepuLrglTs'
    ],
    area: 280,
    bedrooms: 5,
    bathrooms: 4,
    price: 890000,
    status: 'em-construcao' as const,
    featured: true,
    location: 'Alto do Campo Belo, Campinas-SP'
  },
  {
    id: 6,
    slug: 'casa-condominio-vila-nova',
    title: 'Casa Condomínio Vila Nova',
    tagline: 'Casa em condomínio fechado, com segurança 24h, áreas comuns e lazer completo. Ideal para famílias.',
    description: ['Casa térrea em condomínio fechado com portaria 24h, segurança monitorada e áreas de lazer com piscina, quadra esportiva e playground. A residência possui 3 quartos (1 suíte), sala ampla, cozinha planejada, área de serviço e quintal gramado. Ideal para quem busca segurança, tranquilidade e qualidade de vida.'],
    image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop',
    gallery: [
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=800&fit=crop' },
      { category: 'Sala', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1556911073-38141963c9e0?w=1200&h=800&fit=crop' },
      { category: 'Cozinha', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&h=800&fit=crop' },
      { category: 'Quarto', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop' },
      { category: 'Banheiro', url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1200&h=800&fit=crop' },
      { category: 'Área Externa', url: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200&h=800&fit=crop' },
    ],
    features: ['Condomínio fechado com portaria 24h', 'Piscina e quadra esportiva', 'Playground', 'Cozinha planejada', 'Quintal gramado'],
    videoUrls: [],
    area: 140,
    bedrooms: 3,
    bathrooms: 2,
    price: 420000,
    status: 'vendido' as const,
    featured: false,
    location: 'Vila Nova, Campinas-SP'
  },
]

export const mockBlogPosts = [
  {
    id: 1,
    slug: 'como-escolher-casa-ideal',
    title: 'Como Escolher a Casa Ideal para Você',
    excerpt: 'Descubra os fatores mais importantes na hora de escolher sua casa dos sonhos. Dicas práticas para encontrar o imóvel perfeito que atenda suas necessidades e estilo de vida.',
    content: `
      <h2>Introdução</h2>
      <p>Comprar uma casa é um dos maiores investimentos da vida, e por isso, a escolha deve ser feita com cuidado e atenção. Neste guia, vamos te ajudar a identificar os pontos mais importantes para encontrar a casa ideal.</p>
      
      <h2>1. Defina suas Necessidades</h2>
      <p>Antes de começar a busca, faça uma lista do que é essencial para você e sua família:</p>
      <ul>
        <li>Quantos quartos e banheiros você precisa?</li>
        <li>Qual área mínima é necessária?</li>
        <li>Você precisa de garagem? Quantas vagas?</li>
        <li>Área de lazer é importante?</li>
      </ul>
      
      <h2>2. Localização é Fundamental</h2>
      <p>A localização pode ser ainda mais importante que a casa em si. Considere:</p>
      <ul>
        <li>Proximidade do trabalho</li>
        <li>Acesso a escolas, hospitais e comércio</li>
        <li>Qualidade do bairro e segurança</li>
        <li>Valorização futura da região</li>
      </ul>
      
      <h2>3. Orçamento e Financiamento</h2>
      <p>Tenha claro seu orçamento e as opções de financiamento disponíveis. Faça simulações e entenda todas as taxas e condições antes de decidir.</p>
      
      <h2>4. Visite a Propriedade</h2>
      <p>Nunca compre uma casa sem visitá-la pessoalmente. Observe detalhes como iluminação natural, ventilação, estado de conservação e possíveis problemas estruturais.</p>
      
      <h2>Conclusão</h2>
      <p>Escolher a casa ideal requer paciência e pesquisa. Na ForteGB, estamos prontos para ajudar você em cada etapa desse processo. Entre em contato conosco e descubra como podemos tornar seu sonho realidade!</p>
    `,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    category: 'Dicas',
    publishedAt: new Date('2024-01-15'),
    author: 'Equipe ForteGB'
  },
  {
    id: 2,
    slug: 'financiamento-imovel',
    title: 'Guia Completo de Financiamento Imobiliário',
    excerpt: 'Entenda todas as opções de financiamento disponíveis no mercado, taxas de juros, documentação necessária e como escolher a melhor opção para seu perfil.',
    content: `
      <h2>Tipos de Financiamento</h2>
      <p>Existem várias opções de financiamento imobiliário no Brasil. Vamos conhecer as principais:</p>
      
      <h3>SFH - Sistema Financeiro da Habitação</h3>
      <p>Financiamento tradicional através de bancos, usando recursos do Sistema Brasileiro de Poupança.</p>
      
      <h3>Minha Casa Minha Vida</h3>
      <p>Programa do governo federal com subsídios para famílias de baixa e média renda.</p>
      
      <h3>FGTS</h3>
      <p>Você pode usar seu FGTS como entrada ou para amortizar parcelas do financiamento.</p>
      
      <h2>Documentação Necessária</h2>
      <ul>
        <li>CPF e RG</li>
        <li>Comprovante de renda</li>
        <li>Comprovante de residência</li>
        <li>Documentos do imóvel</li>
      </ul>
      
      <h2>Dicas Importantes</h2>
      <p>Sempre compare propostas de diferentes bancos, entenda todas as taxas envolvidas e tenha uma reserva de emergência antes de financiar.</p>
    `,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    category: 'Financiamento',
    publishedAt: new Date('2024-01-10'),
    author: 'Equipe ForteGB'
  },
  {
    id: 3,
    slug: 'documentos-compra-casa',
    title: 'Documentos Necessários para Comprar uma Casa',
    excerpt: 'Lista completa e atualizada de todos os documentos que você precisa ter em mãos ao comprar um imóvel. Evite surpresas e tenha tudo pronto.',
    content: `
      <h2>Documentos Pessoais</h2>
      <ul>
        <li>RG e CPF (originais e cópias)</li>
        <li>Certidão de Casamento (se casado)</li>
        <li>Comprovante de Residência</li>
        <li>Comprovante de Renda</li>
      </ul>
      
      <h2>Documentos Financeiros</h2>
      <ul>
        <li>Extratos bancários</li>
        <li>Declaração de Imposto de Renda</li>
        <li>Contracheques</li>
        <li>Comprovante de FGTS (se aplicável)</li>
      </ul>
      
      <h2>Documentos do Imóvel</h2>
      <ul>
        <li>Matrícula do imóvel</li>
        <li>IPTU quitado</li>
        <li>Certidões negativas de débitos</li>
        <li>Avaliação do imóvel</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
    category: 'Documentação',
    publishedAt: new Date('2024-01-05'),
    author: 'Equipe ForteGB'
  },
  {
    id: 4,
    slug: 'casa-propria-vs-aluguel',
    title: 'Casa Própria vs Aluguel: Qual é Melhor?',
    excerpt: 'Análise detalhada sobre as vantagens e desvantagens de comprar ou alugar um imóvel. Descubra qual opção faz mais sentido para sua situação.',
    content: `
      <h2>Vantagens de Comprar</h2>
      <ul>
        <li>Investimento de longo prazo</li>
        <li>Liberdade para reformas</li>
        <li>Valorização do imóvel</li>
        <li>Estabilidade</li>
      </ul>
      
      <h2>Vantagens de Alugar</h2>
      <ul>
        <li>Mobilidade</li>
        <li>Menor investimento inicial</li>
        <li>Sem responsabilidade por manutenções</li>
        <li>Flexibilidade</li>
      </ul>
      
      <h2>Conclusão</h2>
      <p>A escolha depende do seu perfil, objetivos e situação financeira. Considere sempre o longo prazo e suas metas pessoais.</p>
    `,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    category: 'Dicas',
    publishedAt: new Date('2024-01-20'),
    author: 'Equipe ForteGB'
  },
  {
    id: 5,
    slug: 'checklist-visita-imovel',
    title: 'Checklist Completo para Visitarmos um Imóvel',
    excerpt: 'Guia prático com tudo que você deve observar durante uma visita a um imóvel. Não perca nenhum detalhe importante!',
    content: `
      <h2>Estrutura e Instalações</h2>
      <ul>
        <li>Verificar infiltrações</li>
        <li>Testar interruptores e tomadas</li>
        <li>Verificar pressão da água</li>
        <li>Observar pisos e azulejos</li>
      </ul>
      
      <h2>Localização e Vizinhança</h2>
      <ul>
        <li>Barulho durante o dia e à noite</li>
        <li>Iluminação natural</li>
        <li>Ventilação</li>
        <li>Segurança do bairro</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    category: 'Dicas',
    publishedAt: new Date('2024-01-18'),
    author: 'Equipe ForteGB'
  },
  {
    id: 6,
    slug: 'etapas-construcao-casa',
    title: 'Etapas da Construção de uma Casa',
    excerpt: 'Entenda todo o processo de construção de uma casa, desde a fundação até a entrega. Saiba o que esperar em cada fase.',
    content: `
      <h2>Etapas Principais</h2>
      <ol>
        <li>Projeto e Aprovação</li>
        <li>Fundação</li>
        <li>Estrutura</li>
        <li>Alvenaria</li>
        <li>Instalações</li>
        <li>Acabamento</li>
        <li>Entrega</li>
      </ol>
      
      <h2>Tempo Médio</h2>
      <p>Uma casa padrão leva em média 8 a 12 meses para ser construída, dependendo do tamanho e complexidade do projeto.</p>
    `,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    category: 'Construção',
    publishedAt: new Date('2024-01-12'),
    author: 'Equipe ForteGB'
  }
]
