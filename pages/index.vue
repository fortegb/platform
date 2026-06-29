<template>
  <div>
    <Hero />
    
    <!-- Valores da Empresa -->
    <section class="py-16 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Por que escolher a ForteGB?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Transparência</h3>
            <p class="text-base-content/70">
              Processo claro e honesto do projeto à escritura
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Confiança</h3>
            <p class="text-base-content/70">
              Empresa familiar comprometida com a qualidade
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Proximidade</h3>
            <p class="text-base-content/70">
              Atendimento personalizado e próximo ao cliente
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Abertura</h3>
            <p class="text-base-content/70">
              Comunicação clara e acessível em todo o processo
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Preview do Portfólio -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold">Nossos Projetos</h2>
          <NuxtLink to="/portfolio" class="btn btn-outline btn-primary">
            Ver Todos
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HouseCard
            v-for="house in featuredHouses"
            :key="house.id"
            :house="house"
          />
        </div>
      </div>
    </section>

    <!-- CTA Contato -->
    <section class="py-16 bg-primary-500 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Pronto para encontrar sua nova casa?
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Entre em contato conosco e descubra como podemos ajudar você
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn bg-white text-primary-500 hover:bg-opacity-90 px-8 py-3 rounded-lg text-lg font-semibold"
          >
            Fale Conosco no WhatsApp
          </a>
          <NuxtLink 
            to="/contato"
            class="btn btn-outline border-white text-white hover:bg-white hover:text-primary-500 px-8 py-3 rounded-lg text-lg font-semibold"
          >
            Enviar Mensagem
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'ForteGB - Construindo sonhos e realizando vidas',
  meta: [
    {
      name: 'description',
      content: 'ForteGB - Projetos imobiliários de qualidade em Campinas-SP. Construindo sonhos e realizando vidas através de projetos imobiliários de qualidade.'
    }
  ]
})

const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber || '5511999999999'
const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os projetos da ForteGB.')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// Mock data temporário - usando dados do arquivo mock.ts
const mockData = await import('~/data/mock')

// Mostrar apenas as 3 primeiras casas na home
const featuredHouses = ref(mockData.mockHouses.slice(0, 3))
</script>
