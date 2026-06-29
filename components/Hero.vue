<template>
  <section class="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-700 text-white">
    <div 
      v-if="backgroundImage"
      class="absolute inset-0 bg-cover bg-center opacity-30"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>
    <div class="container mx-auto px-4 relative z-10 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">
        {{ title }}
      </h1>
      <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto whitespace-pre-line">
        {{ subtitle }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Fale Conosco
        </a>
        <NuxtLink 
          to="/portfolio"
          class="bg-white text-primary-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Ver Portfólio
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  backgroundImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Construindo sonhos e realizando vidas',
  subtitle: 'Através de projetos imobiliários de qualidade.\nSua nova casa está aqui.',
  backgroundImage: '/images/hero.png'
})

const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber || '5511999999999'
const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os projetos da ForteGB.')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
</script>



