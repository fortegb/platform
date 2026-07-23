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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div class="md:col-span-2">
        <h1 class="text-4xl font-bold mb-4">{{ house.title }}</h1>
        <p class="text-lg text-base-content/70 mb-6">{{ house.tagline }}</p>
        
        <div>
          <h2 class="text-2xl font-bold mb-4">Descrição</h2>
          <div class="space-y-4 text-base-content/80">
            <p v-if="showShort">{{ house.shortDescription }}</p>
            <template v-else>
              <template v-for="(paragraph, index) in descriptionParagraphs" :key="index">
                <h3 v-if="paragraph.heading" class="text-lg font-semibold text-primary-500 mt-4 mb-1">{{ paragraph.heading }}</h3>
                <p>{{ paragraph.text }}</p>
              </template>
            </template>
          </div>
          <button
            v-if="house.shortDescription"
            type="button"
            class="mt-4 inline-flex items-center gap-1.5 border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            @click="showDetailed = !showDetailed"
          >
            {{ showDetailed ? 'Ver menos' : 'Ver descrição detalhada da casa' }}
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': showDetailed }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div v-if="featureGroups" class="mt-8">
          <template v-if="showShort && house.shortFeatures">
            <h2 class="text-2xl font-bold mb-4">Características</h2>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <li v-for="(feature, i) in house.shortFeatures" :key="i" class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </template>
          <template v-else-if="featureGroups.flat">
            <h2 class="text-2xl font-bold mb-4">Características</h2>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <li v-for="(feature, i) in featureGroups.flat" :key="i" class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </template>
          <template v-else>
            <div v-if="featureGroups.destaques.length" class="mb-8">
              <h2 class="text-2xl font-bold mb-4">Destaques</h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <li v-for="(feature, i) in featureGroups.destaques" :key="i" class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            <div v-if="featureGroups.engenharia.length">
              <h2 class="text-2xl font-bold mb-4">Diferenciais de Engenharia</h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <li v-for="(feature, i) in featureGroups.engenharia" :key="i" class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </template>
        </div>

        <!-- Planta Baixa -->
        <div v-if="house.floorplans && house.floorplans.length" class="mt-8">
          <HouseFloorplans :floorplans="house.floorplans" :alt="house.title" />
        </div>

      </div>

      <div class="md:col-span-1">
        <div class="card bg-base-200 shadow-xl p-6 md:max-w-sm md:ml-auto">
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
              class="flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 w-44 px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Agendar Visita
            </NuxtLink>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 bg-whatsapp text-white hover:bg-whatsapp-hover w-44 px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <WhatsAppIcon class="w-4 h-4" />
              Fale Conosco
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

const showDetailed = ref(false)
const showShort = computed(() => !!house.value?.shortDescription && !showDetailed.value)

const descriptionParagraphs = computed(() => {
  const desc = house.value?.description
  const normalize = (p: any) => (typeof p === 'string' ? { heading: null, text: p } : p)
  if (Array.isArray(desc) && desc.length) return desc.map(normalize)
  if (typeof desc === 'string' && desc) return [{ heading: null, text: desc }]
  return [{ heading: null, text: 'Descrição detalhada em breve...' }]
})

const featureGroups = computed(() => {
  const features = house.value?.features
  if (!features || !features.length) return null
  const isGrouped = features.some((f: any) => typeof f === 'object' && f.grupo)
  if (!isGrouped) {
    return { flat: features, destaques: [], engenharia: [] }
  }
  return {
    flat: null,
    destaques: features.filter((f: any) => typeof f === 'object' && f.grupo === 'destaque').map((f: any) => f.text),
    engenharia: features.filter((f: any) => typeof f === 'object' && f.grupo === 'engenharia').map((f: any) => f.text),
  }
})

const { whatsappUrl } = useWhatsApp(`Olá! Tenho interesse na casa ${slug}.`)

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
            content: house.value.tagline
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



