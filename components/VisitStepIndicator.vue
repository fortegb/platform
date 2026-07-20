<template>
  <ol class="flex items-center gap-3 text-sm">
    <li
      v-for="(step, index) in steps"
      :key="step"
      class="flex items-center gap-3"
    >
      <span class="flex items-center gap-2">
        <span
          class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold"
          :class="index + 1 <= current
            ? 'bg-secondary text-white'
            : 'border border-base-300 text-base-content/50'"
        >
          {{ index + 1 }}
        </span>
        <span :class="index + 1 === current ? 'font-semibold text-primary-500' : 'text-base-content/60'">
          {{ step }}
        </span>
      </span>
      <span
        v-if="index < steps.length - 1"
        class="w-8 h-px"
        :class="index + 1 < current ? 'bg-secondary' : 'bg-base-300'"
      />
    </li>
  </ol>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ current: number; steps?: string[] }>(), {
  steps: () => ['Seus dados', 'Verificação'],
})
</script>
