<template>
  <NuxtLink
    :to="`/portfolio/${house.slug || house.id}`"
    class="flex items-center gap-4 rounded-lg border border-base-300 bg-base-100 p-3 hover:border-primary-500 transition-colors"
  >
    <img
      :src="house.image || '/placeholder-house.jpg'"
      :alt="house.title"
      class="w-20 h-16 object-cover rounded-md flex-shrink-0"
    />
    <div class="min-w-0">
      <p class="text-xs uppercase tracking-wide text-base-content/50 mb-0.5">Visita à casa</p>
      <p class="font-semibold text-primary-500 truncate">{{ house.title }}</p>
      <p v-if="house.location" class="text-sm text-base-content/70 truncate">{{ house.location }}</p>
    </div>
    <span
      v-if="house.status"
      class="badge ml-auto flex-shrink-0"
      :class="statusBadgeClass(house.status)"
    >
      {{ statusLabel(house.status) }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
interface House {
  id: string | number
  slug?: string
  title: string
  image?: string
  location?: string
  status?: string
}

defineProps<{ house: House }>()

const { statusLabel, statusBadgeClass } = useHouseStatus()
</script>
