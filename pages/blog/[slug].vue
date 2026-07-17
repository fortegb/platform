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
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
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

const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber || '5519991444862'
const message = encodeURIComponent('Olá! Vi o post no blog da ForteGB e gostaria de saber mais.')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

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



