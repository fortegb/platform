<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <NuxtLink :to="`/portfolio/${house.slug || house.id}`">
      <figure class="relative h-64 overflow-hidden">
        <img
          :src="house.image || '/placeholder-house.jpg'"
          :alt="house.title"
          class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div v-if="house.status" class="absolute top-4 right-4 badge badge-lg" :class="statusBadgeClass(house.status)">
          {{ statusLabel(house.status) }}
        </div>
      </figure>
    </NuxtLink>
    <div class="card-body">
      <h2 class="card-title">{{ house.title }}</h2>
      <p class="text-sm text-base-content/70 line-clamp-2">{{ house.tagline }}</p>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-base-content/70">
        <span v-if="house.area" class="inline-flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          {{ house.area }} m²
        </span>
        <span v-if="house.bedrooms" class="inline-flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {{ house.bedrooms }} quartos
        </span>
        <span v-if="house.bathrooms" class="inline-flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
          {{ house.bathrooms }} banheiros
        </span>
      </div>
      <div v-if="house.price && house.status !== 'vendido'" class="mt-2">
        <p class="text-2xl font-bold text-primary-500">{{ formatPrice(house.price) }}</p>
      </div>
      <div class="flex items-center mt-4">
        <NuxtLink
          v-if="allowsSelfGuidedVisit(house.status)"
          :to="`/visita/agendar/${house.id}`"
          class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Agendar Visita
        </NuxtLink>
        <NuxtLink
          :to="`/portfolio/${house.slug || house.id}`"
          class="text-sm font-semibold text-primary-500 hover:underline ml-auto"
        >
          Ver Detalhes →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HouseStatus } from '~/composables/useHouseStatus'

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
  status?: HouseStatus
  featured?: boolean
}

interface Props {
  house: House
}

defineProps<Props>()

const { statusLabel, statusBadgeClass, allowsSelfGuidedVisit } = useHouseStatus()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}
</script>



