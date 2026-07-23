<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Casas Disponíveis</h1>
    
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="houses.length === 0" class="text-center py-12">
      <p class="text-xl text-base-content/70">Nenhuma casa disponível no momento.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="house in houses"
        :key="house.id"
        class="card bg-base-100 shadow-xl"
      >
        <figure v-if="house.image" class="h-48 overflow-hidden">
          <img :src="house.image" :alt="house.title" class="w-full h-full object-cover" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ house.title }}</h2>
          <p class="text-sm text-base-content/70 line-clamp-2">{{ house.shortDescription }}</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <span v-if="house.area" class="badge badge-outline">
              {{ house.area }} m²
            </span>
            <span v-if="house.bedrooms" class="badge badge-outline">
              {{ house.bedrooms }} quartos
            </span>
            <span v-if="house.price" class="badge badge-primary">
              {{ formatPrice(house.price) }}
            </span>
          </div>
          <div class="card-actions justify-end mt-4">
            <NuxtLink 
              :to="`/portfolio/${house.slug || house.id}`"
              class="btn btn-sm btn-outline"
              target="_blank"
            >
              Ver Detalhes
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'realtor-auth'
})

const loading = ref(true)
const houses = ref<any[]>([])

onMounted(async () => {
  await loadHouses()
})

const loadHouses = async () => {
  try {
    const response = await $fetch('/api/corretor/casas')
    houses.value = response.houses
  } catch (err) {
    console.error('Error loading houses:', err)
  } finally {
    loading.value = false
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

useHead({
  title: 'Casas Disponíveis - Portal do Corretor'
})
</script>



