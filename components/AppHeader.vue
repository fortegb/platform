<template>
  <header class="bg-primary-500 shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img 
            :src="logoUrl" 
            alt="ForteGB Logo" 
            class="h-16 w-auto"
          />
        </NuxtLink>
        
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink
            to="/portfolio"
            class="text-white hover:text-primary-100 transition-colors"
            active-class="text-primary-100 font-semibold"
          >
            Portfólio
          </NuxtLink>
          <NuxtLink
            to="/corretor"
            class="text-white hover:text-primary-100 transition-colors"
            active-class="text-primary-100 font-semibold"
          >
            Corretores
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="text-white hover:text-primary-100 transition-colors"
            active-class="text-primary-100 font-semibold"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="/sobre" 
            class="text-white hover:text-primary-100 transition-colors"
            active-class="text-primary-100 font-semibold"
          >
            Sobre
          </NuxtLink>
          <NuxtLink
            to="/contato"
            class="bg-white text-primary-500 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors"
          >
            Contato
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="text-white hover:text-primary-100 transition-colors"
            aria-label="Entrar"
            title="Entrar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-white"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-2">
        <NuxtLink
          to="/portfolio"
          class="block py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          Portfólio
        </NuxtLink>
        <NuxtLink
          to="/corretor"
          class="block py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          Corretores
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="block py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          Blog
        </NuxtLink>
        <NuxtLink 
          to="/sobre" 
          class="block py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          Sobre
        </NuxtLink>
        <NuxtLink
          to="/contato"
          class="block py-2 bg-white text-primary-500 rounded-lg text-center text-sm font-semibold hover:bg-opacity-90 transition-colors"
          @click="mobileMenuOpen = false"
        >
          Contato
        </NuxtLink>
        <NuxtLink
          to="/login"
          class="flex items-center gap-2 py-2 text-white hover:text-primary-100"
          @click="mobileMenuOpen = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          Entrar
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const logoUrl = usePublicAsset('/logo.png')
</script>



