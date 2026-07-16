<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Planta Baixa</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="(plan, index) in imagePlans"
        :key="plan.url"
        class="border border-base-300 rounded-xl overflow-hidden cursor-pointer hover:border-primary-500 transition-colors"
        @click="lightboxIndex = index"
      >
        <img
          :src="plan.url"
          :alt="`${alt} — Planta Baixa ${plan.label}`"
          class="w-full h-72 object-contain bg-base-200"
        />
        <p class="px-4 py-2 text-sm font-semibold text-center">{{ plan.label }}</p>
      </div>

      <a
        v-for="plan in pdfPlans"
        :key="plan.url"
        :href="plan.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center justify-center gap-2 border border-base-300 rounded-xl h-72 hover:border-primary-500 transition-colors"
      >
        <svg class="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-sm font-semibold">{{ plan.label }}</p>
        <span class="text-xs text-base-content/60">Abrir PDF</span>
      </a>
    </div>

    <ImageLightbox
      v-if="lightboxIndex !== null"
      :images="lightboxImages"
      :index="lightboxIndex"
      :alt="alt"
      @close="lightboxIndex = null"
      @prev="lightboxIndex = (lightboxIndex - 1 + imagePlans.length) % imagePlans.length"
      @next="lightboxIndex = (lightboxIndex + 1) % imagePlans.length"
    />
  </div>
</template>

<script setup lang="ts">
interface Floorplan {
  label: string
  url: string
  type: 'image' | 'pdf'
}

interface Props {
  floorplans: Floorplan[]
  alt: string
}

const props = defineProps<Props>()

const imagePlans = computed(() => props.floorplans.filter(plan => plan.type === 'image'))
const pdfPlans = computed(() => props.floorplans.filter(plan => plan.type === 'pdf'))
const lightboxImages = computed(() =>
  imagePlans.value.map(plan => ({ category: plan.label, url: plan.url }))
)

const lightboxIndex = ref<number | null>(null)
</script>
