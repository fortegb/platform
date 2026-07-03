<template>
  <footer class="bg-primary-500 text-white mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo e Slogan -->
        <div class="col-span-1 md:col-span-2">
          <img 
            :src="logoUrl" 
            alt="ForteGB Logo" 
            class="h-12 w-auto mb-4 -ml-6"
          />
          <p class="text-sm opacity-80 mb-4">
            Construindo sonhos e realizando vidas<br>através de projetos imobiliários de qualidade.<br>Sua nova casa está aqui.
          </p>
        </div>

        <!-- Links Rápidos -->
        <div>
          <h4 class="font-semibold mb-4">Links Rápidos</h4>
          <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <NuxtLink to="/" class="hover:text-primary transition-colors">
                Início
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/portfolio" class="hover:text-primary transition-colors">
                Portfólio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="hover:text-primary transition-colors">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sobre" class="hover:text-primary transition-colors">
                Sobre
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h4 class="font-semibold mb-4">Legal</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/privacidade" class="hover:text-primary transition-colors">
                Política de Privacidade
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/termos" class="hover:text-primary transition-colors">
                Termos de Uso
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/20 mt-8 pt-4 text-center text-sm opacity-80">
        <p>&copy; {{ currentYear }} ForteGB. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const logoUrl = usePublicAsset('/logo.png')
</script>



