<template>
  <div>
    <div class="carousel carousel-center w-full rounded-xl overflow-hidden">
      <div
        v-for="(image, index) in images"
        :id="`${idPrefix}-slide-${index}`"
        :key="image"
        class="carousel-item relative w-full"
      >
        <img
          :src="image"
          :alt="`${alt} — foto ${index + 1}`"
          class="w-full h-96 object-cover"
        />
        <div
          v-if="images.length > 1"
          class="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between"
        >
          <a
            :href="`#${idPrefix}-slide-${index === 0 ? images.length - 1 : index - 1}`"
            class="flex items-center justify-center w-9 h-9 rounded-full bg-primary-500/70 hover:bg-primary-500 text-white transition-colors"
          >
            ❮
          </a>
          <a
            :href="`#${idPrefix}-slide-${index === images.length - 1 ? 0 : index + 1}`"
            class="flex items-center justify-center w-9 h-9 rounded-full bg-primary-500/70 hover:bg-primary-500 text-white transition-colors"
          >
            ❯
          </a>
        </div>
      </div>
    </div>

    <div v-if="images.length > 1" class="flex w-full justify-center gap-2 py-3">
      <a
        v-for="(image, index) in images"
        :key="`dot-${index}`"
        :href="`#${idPrefix}-slide-${index}`"
        class="w-2 h-2 rounded-full bg-primary-300 hover:bg-primary-500 transition-colors"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: string[]
  alt: string
  idPrefix?: string
}

withDefaults(defineProps<Props>(), {
  idPrefix: 'gallery'
})
</script>
