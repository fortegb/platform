<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
      <p class="text-lg text-base-content/70 mb-8">
        Estamos prontos para ajudar você a encontrar sua nova casa.
        Entre em contato através do formulário ou WhatsApp.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 class="text-2xl font-bold mb-4">Fale Conosco</h2>
          <div class="bg-base-200 rounded-xl p-6 sm:p-8">
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div class="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div class="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                class="inline-flex items-center justify-center gap-2 bg-whatsapp text-white hover:bg-whatsapp-hover w-full px-5 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                <WhatsAppIcon class="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Envie uma Mensagem</h2>
          <div class="bg-base-200 rounded-xl p-6 sm:p-8">
            <ContactForm />
          </div>
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

const { whatsappNumber, whatsappUrl } = useWhatsApp('Olá! Gostaria de saber mais sobre os projetos da ForteGB.')

const formatPhone = (phone: string | number | undefined) => {
  if (phone == null || phone === '') return '—'
  const raw = String(phone)
  let cleaned = raw.replace(/\D/g, '')
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    cleaned = cleaned.slice(2)
  }
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  return phone
}
</script>



