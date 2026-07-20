<template>
  <div class="container mx-auto px-4 py-10 max-w-2xl">
    <div v-if="house">
      <HouseVisitHeader :house="house" />

      <VisitStepIndicator :current="2" :steps="steps" class="mt-8" />

      <!-- Returning client: phone possession, not a new document (D-059) -->
      <template v-if="mode === 'otp'">
        <h1 class="text-2xl font-bold text-primary-500 mt-8 mb-1">Confirme seu WhatsApp</h1>
        <p class="text-sm text-base-content/70 mb-6">
          Já reconhecemos seu cadastro. Para liberar o acesso agora, digite o código que
          enviamos por WhatsApp para <span class="font-semibold">{{ maskedPhone }}</span>.
        </p>

        <form @submit.prevent="submitOtp" class="space-y-5" novalidate>
          <div>
            <label for="otp" class="block text-sm font-medium mb-1.5">Código de 6 dígitos</label>
            <input
              id="otp"
              v-model="otp"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              maxlength="6"
              class="input input-bordered w-full font-mono text-lg tracking-[0.4em]"
              :class="otpError && 'input-error'"
              placeholder="000000"
              @input="otp = otp.replace(/\D/g, '').slice(0, 6)"
            />
            <p v-if="otpError" class="mt-1 text-sm text-error">{{ otpError }}</p>
          </div>

          <button
            type="submit"
            :disabled="submitting || otp.length < 6"
            class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            {{ submitting ? 'Confirmando…' : 'Confirmar e entrar' }}
          </button>
        </form>

        <p class="text-sm text-base-content/60 mt-4">
          Não recebeu?
          <button type="button" class="text-primary-500 font-semibold hover:underline" @click="resend">
            Reenviar código
          </button>
        </p>
      </template>

      <!-- New visitor: full identity verification handoff -->
      <template v-else>
        <h1 class="text-2xl font-bold text-primary-500 mt-8 mb-1">Verificação de identidade</h1>
        <p class="text-sm text-base-content/70 mb-6">
          A casa está vazia e você entra sozinho — por isso confirmamos quem você é antes de
          liberar o acesso.
        </p>

        <div class="rounded-lg border border-base-300 bg-base-100 p-5 space-y-4">
          <p class="text-sm font-semibold text-primary-500">O que acontece agora</p>
          <ol class="space-y-3 text-sm text-base-content/80">
            <li class="flex gap-3">
              <span class="flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white text-xs font-semibold flex-shrink-0 mt-0.5">1</span>
              <span>Abrimos a tela de verificação, onde você tira uma foto sua e fotografa seu RG ou CNH.</span>
            </li>
            <li class="flex gap-3">
              <span class="flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white text-xs font-semibold flex-shrink-0 mt-0.5">2</span>
              <span>Leva cerca de dois minutos. Tenha o documento em mãos e procure um lugar com boa luz.</span>
            </li>
            <li class="flex gap-3">
              <span class="flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white text-xs font-semibold flex-shrink-0 mt-0.5">3</span>
              <span>Aprovado, o código de acesso aparece aqui na hora e também chega pelo seu WhatsApp.</span>
            </li>
          </ol>

          <p class="text-sm text-base-content/60 border-t border-base-300 pt-4">
            Sua selfie é apagada assim que a verificação é aprovada.
            <NuxtLink to="/privacidade" class="text-primary-500 hover:underline">
              Como tratamos seus dados
            </NuxtLink>
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 mt-6">
          <button
            type="button"
            :disabled="submitting"
            class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            @click="startVerification"
          >
            {{ submitting ? 'Abrindo…' : 'Começar verificação' }}
          </button>
          <NuxtLink
            :to="`/visita/qr/${code}`"
            class="text-sm font-semibold text-primary-500 hover:underline"
          >
            ← Corrigir meus dados
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockHouses } from '~/data/mock'

const route = useRoute()
const router = useRouter()
const code = route.params.code as string

const { form, restoreForm } = useQrVisit()

const steps = ['Identificação', 'Verificação']

// ponytail: `?state=reuso` shows the returning-client OTP path; default shows the
// full verification handoff. In Execução the server decides the mode from the CPF
// lookup — a Cliente within the 12-month reuse window and under the 24-month
// `last_client_match_at` ceiling gets OTP; everyone else gets full verification
// (#81, D-059). `?preview=1` skips the cold-entry guard for design review.
const mode = computed(() => (route.query.state === 'reuso' ? 'otp' : 'full'))

const house = computed(() => mockHouses.find((h) => h.status === 'disponivel'))

const otp = ref('')
const otpError = ref('')
const submitting = ref(false)

// Arriving cold (refresh, bookmark) with nothing identified means there is
// nothing to verify against — send them back to identify. Mirrors the scheduled
// flow's guard.
onMounted(() => {
  if (route.query.preview) return
  if (!restoreForm(code)) {
    router.replace(`/visita/qr/${code}`)
  }
})

const maskedPhone = computed(() => {
  const digits = form.value.phone.replace(/\D/g, '')
  if (digits.length !== 11) return 'seu número'
  return `(${digits.slice(0, 2)}) *****-${digits.slice(7)}`
})

const startVerification = async () => {
  submitting.value = true
  // ponytail: the real flow hands off to the identity provider (D-070) and
  // returns to the result. Simulated until Execução (#80) — always approves here;
  // the decline state is reachable via /resultado?estado=recusado for review.
  await new Promise((resolve) => setTimeout(resolve, 500))
  router.push(`/visita/qr/${code}/resultado?estado=liberado`)
}

const submitOtp = async () => {
  otpError.value = ''
  submitting.value = true
  // ponytail: any 6-digit code is accepted in the simulation. A wrong/expired
  // code in Execução routes to the same immediate-decline result (D-059) —
  // reachable via /resultado?estado=recusado for review.
  await new Promise((resolve) => setTimeout(resolve, 400))
  submitting.value = false
  router.push(`/visita/qr/${code}/resultado?estado=liberado`)
}

const resend = () => {
  otpError.value = ''
}

useHead({
  title: computed(() =>
    house.value ? `Verificação — ${house.value.title} | ForteGB` : 'Verificação | ForteGB'
  ),
})
</script>
