// Dados mock temporários para visualização sem banco de dados
// Este arquivo será usado até que o banco de dados esteja configurado
//
// `featured: true` controla quais casas aparecem na home (seção "Nossos Projetos").
// Escolha manual, não automática — marque/desmarque conforme quiser trocar a vitrine.

export const mockHouses = [
  {
    id: 1,
    slug: 'casa-jardim-dos-ipes',
    title: 'Casa Jardim dos Ipês',
    description: 'Casa moderna e confortável, perfeita para famílias que buscam qualidade e tranquilidade em Campinas-SP.',
    fullDescription: 'Esta bela casa de 3 quartos oferece conforto e modernidade em um dos bairros mais tranquilos de Campinas. Com acabamento de primeira linha, a propriedade conta com sala ampla, cozinha integrada, área de serviço completa e área de lazer com piscina. Os quartos são espaçosos, sendo a suíte master com closet. Localizada próxima a escolas, comércio e vias de fácil acesso.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
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
    description: 'Casa espaçosa com 4 quartos, ideal para famílias grandes. Piscina, churrasqueira e área de lazer completa.',
    fullDescription: 'Excelente oportunidade! Casa em construção com 4 quartos, sendo 2 suítes. Área de lazer completa com piscina, churrasqueira coberta, espaço gourmet e playground. Sala ampla em dois ambientes, cozinha planejada com ilha, escritório e lavabo. Garagem para 3 carros. Acabamento premium em toda a residência. Previsão de entrega: 6 meses.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    area: 200,
    bedrooms: 4,
    bathrooms: 3,
    price: 650000,
    status: 'em-construcao' as const,
    featured: true,
    location: 'Vila Verde, Campinas-SP'
  },
  {
    id: 3,
    slug: 'casa-moderna-parque-dos-pinheiros',
    title: 'Casa Moderna Parque dos Pinheiros',
    description: 'Casa compacta e moderna, ideal para casais jovens ou pequenas famílias que buscam praticidade e conforto.',
    fullDescription: 'Casa nova, moderna e funcional. Com 2 quartos, sendo 1 suíte, sala integrada com cozinha, área de serviço e quintal. Perfeita para quem busca o primeiro imóvel ou investimento. Localizada em região valorizada, próxima ao centro e com fácil acesso às principais vias de Campinas. Financiamento facilitado disponível.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
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
    description: 'Casa com 3 quartos, acabamento premium, piscina e área gourmet. Perfeita para receber amigos e familiares.',
    fullDescription: 'Casa com arquitetura moderna e acabamento de alto padrão. 3 quartos (2 suítes), sala de estar e de jantar separadas, cozinha planejada com bancada em granito, área gourmet completa com churrasqueira e forno de pizza. Piscina aquecida, jardim paisagístico e garagem para 2 carros. Sistema de segurança e automação residencial.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
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
    description: 'Casa espaçosa com 5 quartos, piscina, área de lazer completa e vista privilegiada. Excelente investimento.',
    fullDescription: 'Residência de alto padrão com 5 quartos (3 suítes), sala em 3 ambientes, cozinha gourmet integrada, escritório, lavabo social e área de serviço completa. Área de lazer com piscina, sauna, espaço fitness, churrasqueira e área gourmet coberta. Jardim paisagístico, sistema de irrigação automática e garagem para 4 carros. Vista panorâmica da região.',
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
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
    description: 'Casa em condomínio fechado, com segurança 24h, áreas comuns e lazer completo. Ideal para famílias.',
    fullDescription: 'Casa térrea em condomínio fechado com portaria 24h, segurança monitorada e áreas de lazer com piscina, quadra esportiva e playground. A residência possui 3 quartos (1 suíte), sala ampla, cozinha planejada, área de serviço e quintal gramado. Ideal para quem busca segurança, tranquilidade e qualidade de vida.',
    image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop',
    area: 140,
    bedrooms: 3,
    bathrooms: 2,
    price: 420000,
    status: 'vendido' as const,
    featured: false,
    location: 'Vila Nova, Campinas-SP'
  }
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
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
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
