<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Nosso Portfólio</h1>
    
    <!-- Filtros: ocultos enquanto o portfólio for pequeno (poucas casas não justificam busca/filtro) -->
    <div v-if="showFilters" class="mb-8 flex flex-wrap gap-4">
      <select v-model="filters.status" class="select select-bordered">
        <option value="">Todos os status</option>
        <option value="disponivel">Disponível</option>
        <option value="em-construcao">Em Construção</option>
        <option value="reservado">Reservado</option>
        <option value="vendido">Vendido</option>
      </select>

      <input
        v-model="filters.search"
        type="text"
        placeholder="Buscar por nome..."
        class="input input-bordered flex-grow max-w-md"
      />
    </div>

    <!-- Grid de Casas -->
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="filteredHouses.length === 0" class="text-center py-12">
      <p class="text-xl text-base-content/70">Nenhuma casa encontrada.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <HouseCard
        v-for="house in filteredHouses"
        :key="house.id"
        :house="house"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Portfólio - ForteGB',
  meta: [
    {
      name: 'description',
      content: 'Conheça nossos projetos imobiliários em Campinas-SP. Casas de qualidade com transparência e confiança.'
    }
  ]
})

const filters = reactive({
  status: '',
  search: ''
})

// Ocultos por ora — reativar quando o portfólio crescer o suficiente para justificar filtro/busca.
const showFilters = false

const loading = ref(false)

// Mock data temporário - usando dados do arquivo mock.ts
const mockData = await import('~/data/mock')

const houses = ref(mockData.mockHouses)

const filteredHouses = computed(() => {
  let result = [...houses.value]
  
  if (filters.status) {
    result = result.filter(house => house.status === filters.status)
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    result = result.filter(house => 
      house.title.toLowerCase().includes(searchLower) ||
      house.tagline?.toLowerCase().includes(searchLower)
    )
  }
  
  return sortHousesByStatus(result)
})
</script>



