<template>
  <div v-if="loading" class="container mx-auto px-4 py-8 text-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  
  <article v-else-if="post" class="container mx-auto px-4 py-8 max-w-4xl">
    <NuxtLink to="/blog" class="text-primary-500 hover:underline mb-4 inline-block">
      ← Voltar ao Blog
    </NuxtLink>
    
    <div v-if="post.category" class="text-primary-500 font-semibold uppercase tracking-wide text-xs mb-4">
      {{ post.category }}
    </div>
    
    <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ post.title }}</h1>
    
    <div class="text-sm text-base-content/50 mb-8">
      Publicado em {{ formatDate(post.publishedAt) }}
    </div>
    
    <div v-if="post.image" class="mb-8">
      <img 
        :src="post.image" 
        :alt="post.title"
        class="w-full h-96 object-cover rounded-lg"
      />
    </div>
    
    <div class="prose prose-lg max-w-none">
      <div v-html="post.content"></div>
    </div>
    
    <div class="mt-12 pt-8 border-t">
      <h2 class="text-2xl font-bold mb-4">Gostou do conteúdo?</h2>
      <p class="mb-4">Entre em contato conosco e descubra como podemos ajudar você a encontrar sua nova casa.</p>
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="w-44 inline-flex items-center justify-center gap-2 bg-whatsapp text-white hover:bg-whatsapp-hover px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
      >
        <WhatsAppIcon class="w-4 h-4" />
        Fale Conosco
      </a>
    </div>
  </article>
  
  <div v-else class="container mx-auto px-4 py-8 text-center">
    <h1 class="text-4xl font-bold mb-4">Post não encontrado</h1>
    <NuxtLink to="/blog" class="btn btn-primary">
      Voltar ao Blog
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const loading = ref(true)
const post = ref<any>(null)

const { whatsappUrl } = useWhatsApp('Olá! Vi o post no blog da ForteGB e gostaria de saber mais.')

// Mock data temporário - será carregado no onMounted
onMounted(async () => {
  const { mockBlogPosts } = await import('~/data/mock')
  setTimeout(() => {
    post.value = mockBlogPosts.find((p: any) => p.slug === slug) || null
    loading.value = false
    
    if (post.value) {
      useHead({
        title: `${post.value.title} - Blog ForteGB`,
        meta: [
          {
            name: 'description',
            content: post.value.excerpt
          }
        ]
      })
    }
  }, 300)
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>



