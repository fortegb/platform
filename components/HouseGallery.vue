<template>
  <div>
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="category in categories"
        :key="category.name"
        type="button"
        class="px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
        :class="activeCategory === category.name
          ? 'bg-primary-500 text-white'
          : 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'"
        @click="activeCategory = category.name"
      >
        {{ category.name }} ({{ category.count }})
      </button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-xl overflow-hidden">
      <img
        v-for="(image, index) in filteredImages"
        :key="image.url"
        :src="image.url"
        :alt="`${alt} — ${image.category} ${index + 1}`"
        class="w-full aspect-[4/3] object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  category: string
  url: string
}

interface Props {
  images: GalleryImage[]
  alt: string
}

const props = defineProps<Props>()

const categories = computed(() => {
  const counts = new Map<string, number>()
  for (const image of props.images) {
    counts.set(image.category, (counts.get(image.category) ?? 0) + 1)
  }
  return Array.from(counts, ([name, count]) => ({ name, count }))
})

const activeCategory = ref(props.images[0]?.category ?? '')

const filteredImages = computed(() =>
  props.images.filter(image => image.category === activeCategory.value)
)
</script>
