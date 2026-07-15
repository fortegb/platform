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

    <div v-if="activeCategory === VIDEO" class="space-y-4">
      <div v-for="url in videoEmbedUrls" :key="url" class="aspect-video rounded-xl overflow-hidden">
        <iframe
          :src="url"
          class="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </div>

    <div v-else class="max-h-[500px] overflow-y-auto rounded-xl">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
        <img
          v-for="(image, index) in filteredImages"
          :key="image.url"
          :src="image.url"
          :alt="`${alt} — ${image.category} ${index + 1}`"
          class="w-full aspect-[4/3] object-cover cursor-pointer hover:opacity-90 transition-opacity"
          @click="lightboxIndex = index"
        />
      </div>
    </div>

    <ImageLightbox
      v-if="lightboxIndex !== null"
      :images="filteredImages"
      :index="lightboxIndex"
      :alt="alt"
      @close="lightboxIndex = null"
      @prev="lightboxIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length"
      @next="lightboxIndex = (lightboxIndex + 1) % filteredImages.length"
    />
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  category: string
  url: string
}

interface Props {
  images: GalleryImage[]
  videos?: string[]
  alt: string
}

const props = defineProps<Props>()

const ALL = 'Todas'
const VIDEO = 'Vídeo'

const videoEmbedUrls = computed(() =>
  (props.videos ?? [])
    .map(url => getVideoEmbedUrl(url))
    .filter((url): url is string => url !== null)
)

const categories = computed(() => {
  const counts = new Map<string, number>()
  for (const image of props.images) {
    counts.set(image.category, (counts.get(image.category) ?? 0) + 1)
  }
  const list = [
    { name: ALL, count: props.images.length },
    ...Array.from(counts, ([name, count]) => ({ name, count }))
  ]
  if (videoEmbedUrls.value.length) {
    list.splice(1, 0, { name: VIDEO, count: videoEmbedUrls.value.length })
  }
  return list
})

const activeCategory = ref(props.images[0]?.category ?? ALL)

const filteredImages = computed(() =>
  activeCategory.value === ALL
    ? props.images
    : props.images.filter(image => image.category === activeCategory.value)
)

const lightboxIndex = ref<number | null>(null)

watch(activeCategory, () => {
  lightboxIndex.value = null
})
</script>
