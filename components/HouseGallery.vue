<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:h-[420px] rounded-xl overflow-hidden">
    <img
      :src="images[0]"
      :alt="`${alt} — foto 1`"
      class="w-full h-64 md:h-full md:col-span-2 object-cover"
    />
    <div v-if="images.length > 1" class="grid grid-rows-3 gap-2 h-64 md:h-full">
      <img
        v-for="(image, index) in images.slice(1, 4)"
        :key="image"
        :src="image"
        :alt="`${alt} — foto ${index + 2}`"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: string[]
  alt: string
}

defineProps<Props>()
</script>
