<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-2">Blog</h1>
    <p class="text-base-content/70 mb-6 max-w-2xl">
      Dicas, guias e novidades para te ajudar a decidir com segurança em cada etapa da compra da sua casa.
    </p>

    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-12">
      <p class="text-xl text-base-content/70">Nenhum post encontrado.</p>
    </div>

    <div v-else>
      <div class="flex flex-wrap gap-x-6 gap-y-1 mb-8 border-b border-base-300">
        <button
          v-for="category in categories"
          :key="category.name"
          type="button"
          class="pb-2 -mb-px border-b-2 text-sm font-semibold transition-colors"
          :class="activeCategory === category.name
            ? 'border-primary-500 text-primary-500'
            : 'border-transparent text-base-content/60 hover:text-primary-500'"
          @click="activeCategory = category.name"
        >
          {{ category.name }}
          <span class="text-xs font-normal opacity-70">{{ category.count }}</span>
        </button>
      </div>

      <p v-if="filteredPosts.length === 0" class="text-base-content/70 py-8">
        Nenhum post nesta categoria ainda.
      </p>

      <template v-else>
        <NuxtLink
          :to="`/blog/${featuredPost.slug}`"
          class="group grid md:grid-cols-2 gap-6 bg-base-200 rounded-xl overflow-hidden mb-8"
        >
          <figure v-if="featuredPost.image" class="h-56 md:h-96">
            <img
              :src="featuredPost.image"
              :alt="featuredPost.title"
              class="w-full h-full object-cover"
            />
          </figure>
          <div class="p-6 sm:p-8 flex flex-col justify-center">
            <div class="flex items-center gap-2 text-xs mb-3">
              <span class="text-primary-500 font-semibold uppercase tracking-wide">Destaque</span>
              <span v-if="featuredPost.category" class="text-base-content/30">•</span>
              <span v-if="featuredPost.category" class="text-base-content/50">{{ featuredPost.category }}</span>
              <span class="text-base-content/30">•</span>
              <span class="text-base-content/50">{{ formatDate(featuredPost.publishedAt) }}</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary-500 transition-colors">
              {{ featuredPost.title }}
            </h2>
            <p class="text-base-content/70 line-clamp-3 mb-4">{{ featuredPost.excerpt }}</p>
            <span class="inline-flex items-center gap-1 text-primary-500 font-semibold text-sm">
              Ler Mais <span aria-hidden="true">→</span>
            </span>
          </div>
        </NuxtLink>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-10">
          <article v-for="post in restPosts" :key="post.id">
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
      </template>
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

const ALL = 'Todas'

const categories = computed(() => {
  const counts = new Map<string, number>()
  for (const post of posts.value) {
    if (post.category) counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
  }
  return [
    { name: ALL, count: posts.value.length },
    ...Array.from(counts, ([name, count]) => ({ name, count }))
  ]
})

const activeCategory = ref(ALL)

const filteredPosts = computed(() => {
  const list = activeCategory.value === ALL
    ? posts.value
    : posts.value.filter(post => post.category === activeCategory.value)
  return [...list].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
})

const featuredPost = computed(() => filteredPosts.value[0])
const restPosts = computed(() => filteredPosts.value.slice(1))

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>
