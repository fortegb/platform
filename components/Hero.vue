<template>
  <section class="bg-gradient-to-r text-white" :class="gradientClass">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <!-- Texto -->
        <div class="order-2 md:order-1 py-8 md:py-12 text-center md:text-left">
          <h1 class="text-2xl md:text-4xl font-bold mb-3">
            {{ title }}
          </h1>
          <p class="text-base md:text-lg mb-6 max-w-xl mx-auto md:mx-0 whitespace-pre-line opacity-90">
            {{ subtitle }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-40 inline-flex items-center justify-center gap-2 bg-whatsapp text-white hover:bg-whatsapp-hover px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <WhatsAppIcon class="w-4 h-4" />
              Fale Conosco
            </a>
            <NuxtLink
              to="/portfolio"
              class="w-40 inline-flex items-center justify-center bg-white text-primary-500 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors"
            >
              Ver Portfólio
            </NuxtLink>
          </div>
        </div>

        <!-- Imagem -->
        <div class="order-1 md:order-2">
          <img
            v-if="backgroundImage"
            :src="heroImageUrl"
            alt="Imóvel ForteGB"
            class="w-full h-48 md:h-[320px] object-cover rounded-xl md:rounded-2xl shadow-lg mt-8 md:mt-0"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'split' | 'slate' | 'azul'
  title?: string
  subtitle?: string
  backgroundImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'split',
  title: 'Construindo sonhos e realizando vidas',
  subtitle: 'Através de projetos imobiliários de qualidade.\nSua nova casa está aqui.',
  backgroundImage: '/images/hero.png'
})

const gradientClass = computed(() => ({
  split: 'from-primary-500 to-primary-700',
  slate: 'from-primary-500 to-hero-slate',
  azul: 'from-primary-500 to-primary-400',
}[props.variant]))

const heroImageUrl = usePublicAsset(() => props.backgroundImage)

const { whatsappUrl } = useWhatsApp('Olá! Gostaria de saber mais sobre os projetos da ForteGB.')
</script>
