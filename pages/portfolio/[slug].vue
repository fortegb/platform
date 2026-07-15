<template>
  <div v-if="loading" class="container mx-auto px-4 py-8 text-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  
  <div v-else-if="house" class="container mx-auto px-4 py-8">
    <!-- Imagens -->
    <div class="mb-8">
      <img 
        :src="house.image || '/placeholder-house.jpg'" 
        :alt="house.title"
        class="w-full h-96 object-cover rounded-lg"
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
      </div>
      
      <div class="lg:col-span-1">
        <div class="card bg-base-200 shadow-xl p-6">
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
          
          <div class="mt-6 space-y-2">
            <NuxtLink
              v-if="house.status !== 'vendido'"
              :to="`/visita/agendar/${house.id}`"
              class="btn btn-primary w-full"
            >
              Agendar Visita
            </NuxtLink>
            <a 
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline btn-primary w-full"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
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



