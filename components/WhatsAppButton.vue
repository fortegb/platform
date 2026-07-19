<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 bg-whatsapp text-white rounded-full p-4 shadow-lg hover:bg-whatsapp-hover transition-all duration-300 z-50 group"
    aria-label="Fale conosco no WhatsApp"
  >
    <WhatsAppIcon class="w-6 h-6" />
    <span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-neutral text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Fale conosco no WhatsApp
    </span>
  </a>
</template>

<script setup lang="ts">
const { whatsappUrl } = useWhatsApp('Olá! Gostaria de saber mais sobre os projetos da ForteGB.')
</script>
