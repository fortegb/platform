<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Blog</h1>
    
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="posts.length === 0" class="text-center py-12">
      <p class="text-xl text-base-content/70">Nenhum post encontrado.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      <article v-for="post in posts" :key="post.id">
        <NuxtLink :to="`/blog/${post.slug}`">
          <figure v-if="post.image" class="h-48 rounded-xl overflow-hidden mb-4">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover"
            />
          </figure>
        </NuxtLink>

        <div class="flex items-center gap-2 text-xs mb-2">
          <span v-if="post.category" class="text-primary-500 font-semibold uppercase tracking-wide">
            {{ post.category }}
          </span>
          <span v-if="post.category" class="text-base-content/30">•</span>
          <span class="text-base-content/50">{{ formatDate(post.publishedAt) }}</span>
        </div>

        <NuxtLink :to="`/blog/${post.slug}`">
          <h2 class="text-xl font-bold mb-2 hover:text-primary-500 transition-colors">
            {{ post.title }}
          </h2>
        </NuxtLink>

        <p class="text-base-content/70 line-clamp-3 mb-3">{{ post.excerpt }}</p>

        <NuxtLink
          :to="`/blog/${post.slug}`"
          class="inline-flex items-center gap-1 text-primary-500 font-semibold text-sm hover:underline"
        >
          Ler Mais <span aria-hidden="true">→</span>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Blog - ForteGB',
  meta: [
    {
      name: 'description',
      content: 'Dicas, informações e novidades sobre construção, compra de imóveis e mercado imobiliário em Campinas-SP.'
    }
  ]
})

const loading = ref(false)

// Mock data temporário - usando dados do arquivo mock.ts
const mockData = await import('~/data/mock')

const posts = ref(mockData.mockBlogPosts)

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>



