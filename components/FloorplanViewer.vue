<template>
  <div class="fixed inset-0 bg-black/90 z-[100] flex flex-col">
    <div class="flex items-center justify-between px-4 py-3 text-white flex-shrink-0">
      <span class="text-sm font-semibold">{{ label }}</span>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 transition-colors"
          aria-label="Diminuir zoom"
          :disabled="scale <= minScale"
          @click="zoomOut"
        >
          −
        </button>
        <span class="text-sm w-14 text-center tabular-nums">{{ Math.round(scale * 100) }}%</span>
        <button
          type="button"
          class="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 transition-colors"
          aria-label="Aumentar zoom"
          :disabled="scale >= maxScale"
          @click="zoomIn"
        >
          +
        </button>
        <button
          type="button"
          class="px-3 h-9 rounded-full bg-white/10 hover:bg-white/20 text-sm transition-colors"
          @click="reset"
        >
          Redefinir
        </button>
        <button
          type="button"
          class="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Fechar"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>
    </div>

    <div
      ref="scrollContainer"
      class="flex-1 overflow-auto"
      :class="scale > initialScale ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'"
      @mousedown="startPan"
      @wheel="onWheel"
    >
      <img
        :src="url"
        :alt="alt"
        :style="{ width: scale * 100 + '%' }"
        class="mx-auto select-none block max-w-none"
        draggable="false"
        @dragstart.prevent
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  url: string
  label: string
  alt: string
}

defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const minScale = 0.5
const maxScale = 4
const zoomStep = 0.1
const initialScale = 1
const scale = ref(initialScale)
const scrollContainer = ref<HTMLElement | null>(null)

function zoomIn() {
  scale.value = Math.min(maxScale, +(scale.value + zoomStep).toFixed(2))
}
function zoomOut() {
  scale.value = Math.max(minScale, +(scale.value - zoomStep).toFixed(2))
}
function reset() {
  scale.value = initialScale
}
function onWheel(e: WheelEvent) {
  if (!e.ctrlKey && !e.metaKey) return
  e.preventDefault()
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

let panning = false
let startX = 0
let startY = 0
let startScrollLeft = 0
let startScrollTop = 0

function startPan(e: MouseEvent) {
  if (scale.value <= initialScale || !scrollContainer.value) return
  panning = true
  startX = e.clientX
  startY = e.clientY
  startScrollLeft = scrollContainer.value.scrollLeft
  startScrollTop = scrollContainer.value.scrollTop
  window.addEventListener('mousemove', onPan)
  window.addEventListener('mouseup', stopPan)
}
function onPan(e: MouseEvent) {
  if (!panning || !scrollContainer.value) return
  scrollContainer.value.scrollLeft = startScrollLeft - (e.clientX - startX)
  scrollContainer.value.scrollTop = startScrollTop - (e.clientY - startY)
}
function stopPan() {
  panning = false
  window.removeEventListener('mousemove', onPan)
  window.removeEventListener('mouseup', stopPan)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('mousemove', onPan)
  window.removeEventListener('mouseup', stopPan)
})
</script>
