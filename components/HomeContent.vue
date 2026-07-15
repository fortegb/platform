<template>
  <div>
    <!-- Valores da Empresa -->
    <section class="py-10 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">
          Por que escolher a ForteGB?
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-base md:text-lg font-semibold mb-1">Transparência</h3>
            <p class="text-sm text-base-content/70">
              Processo claro e honesto,<br>do projeto à escritura
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-base md:text-lg font-semibold mb-1">Confiança</h3>
            <p class="text-sm text-base-content/70">
              Empresa familiar,<br>comprometida com a qualidade
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-base md:text-lg font-semibold mb-1">Proximidade</h3>
            <p class="text-sm text-base-content/70">
              Atendimento personalizado,<br>próximo ao cliente
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 class="text-base md:text-lg font-semibold mb-1">Abertura</h3>
            <p class="text-sm text-base-content/70">
              Comunicação clara e acessível,<br>em todo o processo
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Preview do Portfólio -->
    <section class="py-10">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl md:text-3xl font-bold">Nossos Projetos</h2>
          <NuxtLink 
            to="/portfolio" 
            class="inline-flex items-center justify-center border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          >
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
    <section class="py-10 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">
          Pronto para encontrar sua nova casa?
        </h2>
        <p class="text-base md:text-lg mb-6 opacity-90">
          Entre em contato conosco e descubra como podemos ajudar você
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a 
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 border border-transparent bg-whatsapp text-white hover:bg-whatsapp-hover px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Fale Conosco no WhatsApp
          </a>
          <NuxtLink 
            to="/contato"
            class="inline-flex items-center justify-center border border-white text-white hover:bg-white hover:text-primary-500 px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Enviar Mensagem
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber || '5511999999999'
const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os projetos da ForteGB.')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// Mock data temporário - usando dados do arquivo mock.ts
const mockData = await import('~/data/mock')

// Mostrar as casas marcadas featured: true em data/mock.ts (escolha manual)
const featuredHouses = ref(mockData.mockHouses.filter(house => house.featured))
</script>
