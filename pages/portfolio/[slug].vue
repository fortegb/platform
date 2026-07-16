<template>
  <div v-if="loading" class="container mx-auto px-4 py-8 text-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  
  <div v-else-if="house" class="container mx-auto px-4 py-8">
    <!-- Imagens -->
    <div class="mb-8">
      <HouseGallery
        :images="house.gallery && house.gallery.length ? house.gallery : [{ category: 'Fachada', url: house.image || '/placeholder-house.jpg' }]"
        :videos="house.videoUrls"
        :alt="house.title"
      />
    </div>

    <!-- Informações Principais -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div class="lg:col-span-2">
        <h1 class="text-4xl font-bold mb-4">{{ house.title }}</h1>
        <p class="text-lg text-base-content/70 mb-6">{{ house.description }}</p>
        
        <div class="prose max-w-none">
          <h2>Descrição Completa</h2>
          <p>{{ house.fullDescription || 'Descrição detalhada em breve...' }}</p>
        </div>

        <div v-if="house.features && house.features.length" class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Características</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <li v-for="feature in house.features" :key="feature" class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div class="lg:col-span-1">
        <div class="card bg-base-200 shadow-xl p-6 max-w-sm ml-auto">
          <h2 class="text-2xl font-bold mb-4">Informações</h2>
          
          <div class="space-y-4">
            <div v-if="house.price && house.status !== 'vendido'">
              <p class="text-sm text-base-content/70">Preço</p>
              <p class="text-3xl font-bold text-primary-500">{{ formatPrice(house.price) }}</p>
            </div>
            
            <div v-if="house.area">
              <p class="text-sm text-base-content/70">Área Total</p>
              <p class="text-xl font-semibold">{{ house.area }} m²</p>
            </div>
            
            <div v-if="house.bedrooms" class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{{ house.bedrooms }} Quartos</span>
            </div>
            
            <div v-if="house.bathrooms" class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <span>{{ house.bathrooms }} Banheiros</span>
            </div>
            
            <div v-if="house.location" class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm">{{ house.location }}</span>
            </div>
            
            <div v-if="house.status" class="badge badge-lg" :class="statusBadgeClass">
              {{ formatStatus(house.status) }}
            </div>
          </div>
          
          <div class="mt-6 space-y-2 flex flex-col items-start">
            <NuxtLink
              v-if="house.status !== 'vendido'"
              :to="`/visita/agendar/${house.id}`"
              class="flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 w-full max-w-[200px] px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Agendar Visita
            </NuxtLink>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 bg-whatsapp text-white hover:bg-whatsapp-hover w-full max-w-[200px] px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Planta Baixa -->
    <div v-if="house.floorplans && house.floorplans.length" class="mb-8">
      <HouseFloorplans :floorplans="house.floorplans" :alt="house.title" />
    </div>
  </div>

  <div v-else class="container mx-auto px-4 py-8 text-center">
    <h1 class="text-4xl font-bold mb-4">Casa não encontrada</h1>
    <NuxtLink to="/portfolio" class="btn btn-primary">
      Voltar ao Portfólio
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const loading = ref(true)
const house = ref<any>(null)

const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber || '5511999999999'
const message = encodeURIComponent(`Olá! Tenho interesse na casa ${slug}.`)
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// Mock data temporário - será carregado no onMounted
onMounted(async () => {
  // Buscar casa pelo slug nos dados mock
  const { mockHouses } = await import('~/data/mock')
  setTimeout(() => {
    house.value = mockHouses.find((h: any) => h.slug === slug) || null
    loading.value = false
    
    if (house.value) {
      useHead({
        title: `${house.value.title} - ForteGB`,
        meta: [
          {
            name: 'description',
            content: house.value.description
          }
        ]
      })
    }
  }, 300)
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    'disponivel': 'Disponível',
    'vendido': 'Vendido',
    'em-construcao': 'Em Construção',
    'reservado': 'Reservado'
  }
  return statusMap[status] || status
}

const statusBadgeClass = computed(() => {
  if (!house.value) return ''
  const statusMap: Record<string, string> = {
    'disponivel': 'badge-success',
    'vendido': 'badge-error',
    'em-construcao': 'badge-warning',
    'reservado': 'badge-info'
  }
  return statusMap[house.value.status] || 'badge-neutral'
})

</script>



