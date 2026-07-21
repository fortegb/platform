<template>
  <div class="container mx-auto px-4 py-10 max-w-2xl">
    <!-- State 2 — house not found -->
    <div v-if="!house" class="text-center py-12">
      <h1 class="text-3xl font-bold text-primary-500 mb-3">Casa não encontrada</h1>
      <p class="text-base-content/70 mb-8 max-w-md mx-auto">
        Este link não corresponde a nenhuma casa do nosso portfólio. Ela pode ter saído da lista.
      </p>
      <NuxtLink
        to="/portfolio"
        class="inline-flex items-center justify-center border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
      >
        Ver o portfólio
      </NuxtLink>
    </div>

    <!-- State 3 — house exists but is not open for a self-guided visit -->
    <div v-else-if="!allowsSelfGuidedVisit(house.status)" class="py-4">
      <HouseVisitHeader :house="house" />
      <div class="mt-8 text-center">
        <h1 class="text-2xl font-bold text-primary-500 mb-3">{{ blockedTitle }}</h1>
        <p class="text-base-content/70 mb-8 max-w-md mx-auto">{{ blockedMessage }}</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            v-if="allowsGuidedVisit(house.status)"
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

    <!-- State 1 — the form -->
    <div v-else>
      <HouseVisitHeader :house="house" />

      <VisitStepIndicator :current="1" class="mt-8" />

      <h1 class="text-2xl font-bold text-primary-500 mt-8 mb-1">
        {{ rescheduling ? 'Remarcar visita' : 'Agendar visita' }}
      </h1>
      <p class="text-sm text-base-content/70 mb-6">
        A visita é autoguiada: você recebe um código e entra sozinho, no horário escolhido.
      </p>

      <!-- Reschedule context — shown when the visitor arrived from the manage-visit
           screen's "Remarcar" action. Restates D-071: the current visit stays active
           and is cancelled only when this new slot is confirmed. -->
      <div
        v-if="rescheduling"
        class="mb-6 rounded-lg border border-secondary/40 bg-secondary/5 p-4"
      >
        <p class="text-sm font-semibold text-primary-500 mb-1">Você está remarcando sua visita</p>
        <p class="text-sm text-base-content/70">
          <template v-if="anteriorLabel">Sua visita de <span class="font-semibold">{{ anteriorLabel }}</span> continua ativa. </template>
          Ao confirmar o novo horário abaixo, ela é cancelada automaticamente — e o código de acesso, se já tiver sido emitido, deixa de funcionar.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
        <div>
          <label for="name" class="block text-sm font-medium mb-1.5">Nome completo</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            class="input input-bordered w-full"
            :class="errors.name && 'input-error'"
            placeholder="Como no seu documento"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-error">{{ errors.name }}</p>
        </div>

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
            É por aqui que enviamos a confirmação e o código de acesso.
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

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="date" class="block text-sm font-medium mb-1.5">Data</label>
            <input
              id="date"
              v-model="form.date"
              type="date"
              :min="minDate"
              class="input input-bordered w-full"
              :class="errors.date && 'input-error'"
            />
            <p v-if="errors.date" class="mt-1 text-sm text-error">{{ errors.date }}</p>
          </div>

          <div>
            <label for="time" class="block text-sm font-medium mb-1.5">Horário</label>
            <select
              id="time"
              v-model="form.time"
              class="select select-bordered w-full"
              :class="errors.time && 'input-error'"
            >
              <option value="">Selecione</option>
              <option
                v-for="slot in timeSlots"
                :key="slot.value"
                :value="slot.value"
                :disabled="slot.taken"
              >
                {{ slot.value }}{{ slot.taken ? ' — indisponível' : '' }}
              </option>
            </select>
            <p v-if="errors.time" class="mt-1 text-sm text-error">{{ errors.time }}</p>
          </div>
        </div>

        <!-- State 5 — slot taken between load and submit -->
        <div v-if="slotConflict" class="rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm">
          <p class="font-semibold mb-1">Esse horário acabou de ser reservado</p>
          <p class="text-base-content/70">Escolha outro horário — o resto do formulário continua preenchido.</p>
        </div>

        <!-- State 6 — submission failed -->
        <div v-if="submitError" class="rounded-lg border border-error/40 bg-error/10 p-4 text-sm">
          <p class="font-semibold mb-1">Não conseguimos enviar seu agendamento</p>
          <p class="text-base-content/70 mb-3">{{ submitError }}</p>
          <div class="flex flex-wrap gap-3">
            <button
              type="submit"
              class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Tentar de novo
            </button>
            <a
              v-if="submitAttempts > 1"
              :href="retryWhatsappUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center gap-2 border border-transparent bg-whatsapp hover:bg-whatsapp-hover text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <WhatsAppIcon class="w-4 h-4" />
              Agendar pelo WhatsApp
            </a>
          </div>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {{ submitting ? 'Enviando…' : 'Continuar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockHouses } from '~/data/mock'

const route = useRoute()
const router = useRouter()
const houseId = route.params.houseId as string

const { allowsSelfGuidedVisit, allowsGuidedVisit, statusLabel } = useHouseStatus()
const { form, saveForm, restoreForm, timeSlots, maskPhone, maskCpf, validate } = useVisitBooking()

// ponytail: design-review triggers for states that a simulated backend never
// produces. Removed when the real endpoint lands in Execução (#81).
const previewState = computed(() => route.query.state as string | undefined)

// Reschedule context. ponytail: driven by `?remarcar=1&data=…&hora=…` from the
// manage-visit screen (#200). The real flow resolves the original visit by token
// server-side and pre-fills name/phone; here name/phone stay blank until Execução
// (#141). The original visit is cancelled only on confirmation of this new slot (D-071).
const rescheduling = computed(() => !!route.query.remarcar)
const anteriorLabel = computed(() => {
  const d = route.query.data as string | undefined
  const h = route.query.hora as string | undefined
  if (!d) return ''
  const [year, month, day] = d.split('-').map(Number)
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, day))
  return h ? `${formatted}, às ${h}` : formatted
})

onMounted(() => {
  restoreForm(houseId)
  if (previewState.value === 'conflito') slotConflict.value = true
  if (previewState.value === 'falha') {
    submitError.value = 'A conexão falhou antes de chegar até nós.'
    submitAttempts.value = 2
  }
})

const house = computed(() =>
  mockHouses.find((h) => String(h.id) === houseId || h.slug === houseId)
)

const errors = ref<Record<string, string>>({})
const submitting = ref(false)
const submitError = ref('')
const submitAttempts = ref(0)
const slotConflict = ref(false)

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const blockedTitle = computed(() => {
  if (!house.value) return ''
  return allowsGuidedVisit(house.value.status)
    ? 'Esta casa ainda está em obra'
    : 'Esta casa não está aberta para visitas'
})

const blockedMessage = computed(() => {
  if (!house.value) return ''
  if (allowsGuidedVisit(house.value.status)) {
    return 'Por segurança, casas em construção só podem ser visitadas acompanhadas por alguém da ForteGB. Fale com a gente e combinamos uma visita guiada.'
  }
  return `Esta casa está com status "${statusLabel(house.value.status)}". Veja as casas disponíveis para visita no nosso portfólio.`
})

const blockedWhatsappMessage = computed(
  () => `Olá! Gostaria de agendar uma visita guiada à ${house.value?.title}.`
)

const retryWhatsappMessage = computed(
  () => `Olá! Tentei agendar uma visita à ${house.value?.title} pelo site e não consegui concluir.`
)

const { whatsappUrl: blockedWhatsappUrl } = useWhatsApp(blockedWhatsappMessage)
const { whatsappUrl: retryWhatsappUrl } = useWhatsApp(retryWhatsappMessage)

const handleSubmit = async () => {
  slotConflict.value = false
  errors.value = validate()
  if (Object.keys(errors.value).length > 0) return

  submitting.value = true
  submitError.value = ''
  submitAttempts.value++

  try {
    // ponytail: the booking endpoint is a stub until Execução (#81) — this leaf
    // designs the screens, so the call is simulated and always succeeds.
    await new Promise((resolve) => setTimeout(resolve, 400))
    saveForm(houseId)
    router.push(`/visita/agendar/${houseId}/verificacao`)
  } catch (err: any) {
    submitError.value = err?.message || 'A conexão falhou antes de chegar até nós.'
  } finally {
    submitting.value = false
  }
}

useHead({
  title: computed(() =>
    house.value ? `Agendar visita — ${house.value.title} | ForteGB` : 'Agendar visita | ForteGB'
  ),
})
</script>
