<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <NuxtLink :to="`/portfolio/${house.slug || house.id}`">
      <figure class="relative h-64 overflow-hidden">
        <img
          :src="house.image || '/placeholder-house.jpg'"
          :alt="house.title"
          class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div v-if="house.status" class="absolute top-4 right-4 badge badge-lg" :class="statusBadgeClass">
          {{ formatStatus(house.status) }}
        </div>
      </figure>
    </NuxtLink>
    <div class="card-body">
      <h2 class="card-title">{{ house.title }}</h2>
      <p class="text-sm text-base-content/70 line-clamp-2">{{ house.description }}</p>
      <div class="flex flex-wrap gap-2 mt-2">
        <span v-if="house.area" class="badge badge-outline">
          {{ house.area }} m²
        </span>
        <span v-if="house.bedrooms" class="badge badge-outline">
          {{ house.bedrooms }} quartos
        </span>
        <span v-if="house.bathrooms" class="badge badge-outline">
          {{ house.bathrooms }} banheiros
        </span>
      </div>
      <div v-if="house.price && house.status !== 'vendido'" class="mt-2">
        <p class="text-2xl font-bold text-primary-500">{{ formatPrice(house.price) }}</p>
      </div>
      <div class="card-actions justify-end mt-4">
        <NuxtLink
          v-if="house.status !== 'vendido'"
          :to="`/visita/agendar/${house.id}`"
          class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Agendar Visita
        </NuxtLink>
        <NuxtLink
          :to="`/portfolio/${house.slug || house.id}`"
          class="inline-flex items-center justify-center border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Ver Detalhes
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface House {
  id: string | number
  slug?: string
  title: string
  description?: string
  image?: string
  area?: number
  bedrooms?: number
  bathrooms?: number
  price?: number
  status?: 'disponivel' | 'vendido' | 'em-construcao' | 'reservado'
  featured?: boolean
}

interface Props {
  house: House
}

const props = defineProps<Props>()

const statusBadgeClass = computed(() => {
  const statusMap = {
    'disponivel': 'badge-success',
    'vendido': 'badge-error',
    'em-construcao': 'badge-warning',
    'reservado': 'badge-info'
  }
  return statusMap[props.house.status || 'disponivel'] || 'badge-neutral'
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
</script>



