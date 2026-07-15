<template>
  <div
    class="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <button
      type="button"
      class="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      aria-label="Fechar"
      @click="$emit('close')"
    >
      ✕
    </button>

    <button
      v-if="images.length > 1"
      type="button"
      class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      aria-label="Foto anterior"
      @click="$emit('prev')"
    >
      ❮
    </button>
    <button
      v-if="images.length > 1"
      type="button"
      class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      aria-label="Próxima foto"
      @click="$emit('next')"
    >
      ❯
    </button>

    <img
      :src="images[index]?.url"
      :alt="`${alt} — ${images[index]?.category} ${index + 1}`"
      class="max-w-[90vw] max-h-[85vh] object-contain"
    />

    <div v-if="images.length > 1" class="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-lg">
      {{ index + 1 }} / {{ images.length }}
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
  index: number
  alt: string
}

defineProps<Props>()
const emit = defineEmits<{
  close: []
  prev: []
  next: []
}>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') emit('prev')
  if (e.key === 'ArrowRight') emit('next')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
