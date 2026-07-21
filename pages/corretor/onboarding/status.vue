<template>
  <div class="min-h-screen flex items-center justify-center bg-primary-500 px-4 py-10">
    <div class="w-full max-w-md">
      <NuxtLink to="/" class="block" aria-label="Voltar para a página inicial">
        <img :src="logoUrl" alt="ForteGB" class="h-14 w-auto mx-auto mb-6" />
      </NuxtLink>

      <div class="rounded-2xl bg-base-100 shadow-xl">
        <div class="p-6 sm:p-8 text-center">
          <div
            class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
            :class="tone.iconWrap"
          >
            <!-- pending: clock -->
            <svg v-if="variant === 'pending'" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z" />
            </svg>
            <!-- rejected: x -->
            <svg v-else-if="variant === 'rejected'" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <!-- approved: check -->
            <svg v-else class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p class="text-sm font-semibold uppercase tracking-wide mb-1" :class="tone.label">
            {{ tone.eyebrow }}
          </p>
          <h1 class="text-2xl font-bold text-primary-500 mb-2">{{ tone.title }}</h1>
          <p class="text-base-content/70">{{ tone.message }}</p>

          <div class="mt-8 flex flex-col gap-3">
            <!-- approved -> dashboard -->
            <NuxtLink
              v-if="variant === 'approved'"
              to="/corretor/dashboard"
              class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Ir para o painel
            </NuxtLink>

            <!-- rejected -> WhatsApp (terminal, no resubmit) -->
            <a
              v-if="variant === 'rejected'"
              :href="helpWhatsappUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center gap-2 border border-transparent bg-whatsapp hover:bg-whatsapp-hover text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <WhatsAppIcon class="w-4 h-4" />
              Falar com a ForteGB
            </a>

            <button
              type="button"
              class="inline-flex items-center justify-center border border-base-300 text-base-content hover:bg-base-200 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              @click="handleLogout"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ponytail: design/mock only (#201). The real screen derives the variant from the
// corretor's stored `status` server-side and is the gate a non-approved corretor
// sees instead of the dashboard (Execução #86/#50). Here it rides on `?estado=`.
definePageMeta({ layout: false })

const route = useRoute()
const logoUrl = usePublicAsset('/logo.png')

type Variant = 'pending' | 'rejected' | 'approved'
const variant = computed<Variant>(() => (route.query.estado as Variant) || 'pending')

const TONES: Record<Variant, {
  eyebrow: string
  title: string
  message: string
  label: string
  iconWrap: string
}> = {
  pending: {
    eyebrow: 'Cadastro em análise',
    title: 'Estamos conferindo seus dados',
    message:
      'A ForteGB revisa seu cadastro em pouco tempo e avisa você pelo WhatsApp assim que estiver aprovado. Você pode fechar esta página — nada se perde.',
    label: 'text-warning',
    iconWrap: 'bg-warning/10 text-warning',
  },
  rejected: {
    eyebrow: 'Cadastro não aprovado',
    title: 'Não foi possível aprovar seu cadastro',
    message:
      'Sua solicitação para atuar como corretor parceiro não foi aprovada desta vez. Fale com a nossa equipe pelo WhatsApp para entender os motivos e os próximos passos.',
    label: 'text-error',
    iconWrap: 'bg-error/10 text-error',
  },
  approved: {
    eyebrow: 'Cadastro aprovado',
    title: 'Tudo certo, bem-vindo!',
    message:
      'Seu cadastro foi aprovado. Você já pode acessar o painel, ver as casas disponíveis e registrar seus clientes.',
    label: 'text-success',
    iconWrap: 'bg-success/10 text-success',
  },
}

const tone = computed(() => TONES[variant.value])

const helpMessage = computed(
  () => 'Olá! Meu cadastro como corretor não foi aprovado e gostaria de entender os próximos passos.'
)
const { whatsappUrl: helpWhatsappUrl } = useWhatsApp(helpMessage)

const handleLogout = () => {
  // ponytail: mock — real sign-out is Execução. Send the user back to login.
  navigateTo('/login')
}

useHead({ title: 'Status do cadastro | ForteGB' })
</script>
