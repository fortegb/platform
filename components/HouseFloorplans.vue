<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Veja o Projeto da Casa</h2>
    <div class="flex flex-wrap gap-8">
      <button
        v-for="plan in imagePlans"
        :key="plan.fileUrl"
        type="button"
        class="flex flex-col items-center gap-2 group"
        @click="openPlan = plan"
      >
        <img
          :src="plan.thumbnailUrl"
          :alt="`${alt} — Planta Baixa ${plan.label}`"
          class="w-52 h-72 sm:w-72 sm:h-96 lg:w-96 lg:h-[32rem] object-contain shadow-sm group-hover:shadow-md transition-shadow"
        />
        <span class="text-sm font-semibold text-base-content/80 group-hover:text-primary-500 transition-colors">{{ plan.label }}</span>
      </button>

      <a
        v-for="plan in pdfPlans"
        :key="plan.fileUrl"
        :href="plan.fileUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center justify-center gap-2 w-52 h-72 sm:w-72 sm:h-96 lg:w-96 lg:h-[32rem] border border-base-300 rounded-lg hover:border-primary-500 transition-colors"
      >
        <svg class="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-sm font-semibold">{{ plan.label }}</p>
        <span class="text-xs text-base-content/60">Abrir PDF</span>
      </a>
    </div>

    <FloorplanViewer
      v-if="openPlan"
      :url="openPlan.fileUrl"
      :label="openPlan.label"
      :alt="`${alt} — Planta Baixa ${openPlan.label}`"
      @close="openPlan = null"
    />
  </div>
</template>

<script setup lang="ts">
interface Floorplan {
  label: string
  thumbnailUrl: string
  fileUrl: string
  type: 'image' | 'pdf'
}

interface Props {
  floorplans: Floorplan[]
  alt: string
}

const props = defineProps<Props>()

const imagePlans = computed(() => props.floorplans.filter(plan => plan.type === 'image'))
const pdfPlans = computed(() => props.floorplans.filter(plan => plan.type === 'pdf'))

const openPlan = ref<Floorplan | null>(null)
</script>
