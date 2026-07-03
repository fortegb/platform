<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">Entre em Contato</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 class="text-2xl font-bold mb-4">Fale Conosco</h2>
          <p class="text-base-content/70 mb-6">
            Estamos prontos para ajudar você a encontrar sua nova casa. 
            Entre em contato através do formulário ou WhatsApp.
          </p>
          
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold">Telefone / WhatsApp</p>
                <a 
                  :href="whatsappUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary-500 hover:underline"
                >
                  {{ formatPhone(whatsappNumber) }}
                </a>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold">E-mail</p>
                <a href="mailto:contato@fortegb.com" class="text-primary-500 hover:underline">
                  contato@fortegb.com
                </a>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold">Localização</p>
                <p class="text-base-content/70">Campinas-SP, Brasil</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6">
            <a 
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary w-full"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </div>
        
        <div>
          <h2 class="text-2xl font-bold mb-4">Envie uma Mensagem</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Contato - ForteGB',
  meta: [
    {
      name: 'description',
      content: 'Entre em contato com a ForteGB. Estamos prontos para ajudar você a encontrar sua nova casa em Campinas-SP.'
    }
  ]
})

const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber || '5511999999999'
const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os projetos da ForteGB.')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

const formatPhone = (phone: string | number | undefined) => {
  if (phone == null || phone === '') return '—'
  const raw = String(phone)
  const cleaned = raw.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  return phone
}
</script>



