<template>
  <div class="container mx-auto px-4 py-10 max-w-2xl">
    <!-- Resolving the QR code -->
    <div v-if="loading" class="text-center py-16">
      <span class="loading loading-spinner loading-lg text-primary-500"></span>
    </div>

    <!-- Invalid / expired QR code — one message for both, on purpose -->
    <div v-else-if="!house" class="text-center py-12">
      <h1 class="text-2xl font-bold text-primary-500 mb-3">Código inválido</h1>
      <p class="text-base-content/70 mb-8 max-w-md mx-auto">
        Este QR não corresponde a nenhuma casa. A placa pode ter sido substituída.
        Se você está em frente à casa e quer visitá-la, fale com a gente pelo WhatsApp.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <a
          :href="helpWhatsappUrl"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center gap-2 border border-transparent bg-whatsapp hover:bg-whatsapp-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <WhatsAppIcon class="w-4 h-4" />
          Fale Conosco
        </a>
        <NuxtLink
          to="/portfolio"
          class="inline-flex items-center justify-center border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Ver o portfólio
        </NuxtLink>
      </div>
    </div>

    <!-- House exists but the placa outlived its "disponível" status -->
    <div v-else-if="!allowsSelfGuidedVisit(house.status)" class="py-4">
      <HouseVisitHeader :house="house" />
      <div class="mt-8 text-center">
        <h1 class="text-2xl font-bold text-primary-500 mb-3">{{ blockedTitle }}</h1>
        <p class="text-base-content/70 mb-8 max-w-md mx-auto">{{ blockedMessage }}</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            :href="blockedWhatsappUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center gap-2 border border-transparent bg-whatsapp hover:bg-whatsapp-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <WhatsAppIcon class="w-4 h-4" />
            Fale Conosco
          </a>
          <NuxtLink
            to="/portfolio"
            class="inline-flex items-center justify-center border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Ver outras casas
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Identify — the door is right here, so we ask only who you are -->
    <div v-else>
      <HouseVisitHeader :house="house" />

      <VisitStepIndicator :current="1" :steps="steps" class="mt-8" />

      <h1 class="text-2xl font-bold text-primary-500 mt-8 mb-1">Entrar nesta casa agora</h1>
      <p class="text-sm text-base-content/70 mb-6">
        A visita é autoguiada. Confirmamos quem você é e liberamos o acesso na hora,
        aqui mesmo.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
        <div>
          <label for="phone" class="block text-sm font-medium mb-1.5">WhatsApp</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            class="input input-bordered w-full"
            :class="errors.phone && 'input-error'"
            placeholder="(19) 99999-9999"
            @input="form.phone = maskPhone(form.phone)"
          />
          <p v-if="errors.phone" class="mt-1 text-sm text-error">{{ errors.phone }}</p>
          <p v-else class="mt-1 text-sm text-base-content/60">
            É por aqui que enviamos o código de acesso.
          </p>
        </div>

        <div>
          <label for="cpf" class="block text-sm font-medium mb-1.5">CPF</label>
          <input
            id="cpf"
            v-model="form.cpf"
            type="text"
            inputmode="numeric"
            class="input input-bordered w-full"
            :class="errors.cpf && 'input-error'"
            placeholder="000.000.000-00"
            @input="form.cpf = maskCpf(form.cpf)"
          />
          <p v-if="errors.cpf" class="mt-1 text-sm text-error">{{ errors.cpf }}</p>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="inline-flex w-full sm:w-auto items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 disabled:opacity-60 px-5 py-3 sm:py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {{ submitting ? 'Verificando…' : 'Continuar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockHouses } from '~/data/mock'

const route = useRoute()
const router = useRouter()
const code = route.params.code as string

const { allowsSelfGuidedVisit, statusLabel } = useHouseStatus()
const { form, saveForm, restoreForm, validate, maskPhone, maskCpf } = useQrVisit()

const steps = ['Identificação', 'Verificação']

const loading = ref(true)
const house = ref<any>(null)
const errors = ref<Record<string, string>>({})
const submitting = ref(false)

// ponytail: the house is resolved from the mock set. The real screen loads it
// from GET /api/visits/qr/[code] and only reaches this page for a valid code
// (#81). `?preview=invalido` and `?state=<status>` force the sad states a
// simulated backend never produces — removed with the endpoint in Execução.
onMounted(async () => {
  restoreForm(code)
  if (route.query.preview === 'invalido') {
    loading.value = false
    return
  }
  await new Promise((resolve) => setTimeout(resolve, 300))
  const forced = route.query.state as string | undefined
  house.value = forced
    ? { ...disponivelHouse(), status: forced }
    : disponivelHouse()
  loading.value = false
})

function disponivelHouse() {
  return mockHouses.find((h) => h.status === 'disponivel') ?? null
}

const blockedTitle = computed(() =>
  house.value?.status === 'em-construcao'
    ? 'Esta casa ainda está em obra'
    : 'Esta casa não está aberta para visitas'
)

const blockedMessage = computed(() => {
  if (!house.value) return ''
  if (house.value.status === 'em-construcao') {
    return 'Por segurança, casas em construção só podem ser visitadas acompanhadas por alguém da ForteGB. Fale com a gente e combinamos uma visita guiada.'
  }
  return `Esta casa está com status "${statusLabel(house.value.status)}". Veja as casas disponíveis para visita no nosso portfólio.`
})

const helpMessage = computed(
  () => `Olá! Escaneei o QR de uma casa mas o código não abriu a página de visita.`
)
const blockedWhatsappMessage = computed(
  () => `Olá! Gostaria de visitar a ${house.value?.title}.`
)
const { whatsappUrl: helpWhatsappUrl } = useWhatsApp(helpMessage)
const { whatsappUrl: blockedWhatsappUrl } = useWhatsApp(blockedWhatsappMessage)

const handleSubmit = async () => {
  errors.value = validate()
  if (Object.keys(errors.value).length > 0) return

  submitting.value = true
  // ponytail: the instant endpoint is a stub until Execução (#81). This leaf
  // designs the screens, so the call is simulated and always advances.
  await new Promise((resolve) => setTimeout(resolve, 400))
  saveForm(code)
  submitting.value = false
  router.push(`/visita/qr/${code}/verificacao`)
}

useHead({
  title: computed(() =>
    house.value ? `Visita — ${house.value.title} | ForteGB` : 'Visita | ForteGB'
  ),
})
</script>
