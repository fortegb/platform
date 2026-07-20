<template>
  <div class="container mx-auto px-4 py-10 max-w-2xl">
    <div v-if="house">
      <HouseVisitHeader :house="house" />

      <VisitStepIndicator :current="2" class="mt-8" />

      <h1 class="text-2xl font-bold text-primary-500 mt-8 mb-1">Verificação de identidade</h1>
      <p class="text-sm text-base-content/70 mb-6">
        A casa está vazia e você entra sozinho — por isso confirmamos quem você é antes de liberar o acesso.
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
            <span>Você volta para cá e recebe a confirmação da visita pelo WhatsApp.</span>
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
          :disabled="redirecting"
          class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          @click="startVerification"
        >
          {{ redirecting ? 'Abrindo…' : 'Começar verificação' }}
        </button>
        <NuxtLink
          :to="`/visita/agendar/${houseId}`"
          class="text-sm font-semibold text-primary-500 hover:underline"
        >
          ← Voltar e corrigir meus dados
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockHouses } from '~/data/mock'

const route = useRoute()
const router = useRouter()
const houseId = route.params.houseId as string

const { restoreForm } = useVisitBooking()

const house = computed(() =>
  mockHouses.find((h) => String(h.id) === houseId || h.slug === houseId)
)

const redirecting = ref(false)

// State 8 — arriving here cold (refresh, bookmark, back button) with nothing
// stored means there is nothing to verify against. Send them to the form.
// ponytail: `?preview=1` skips the guard so the screen can be reviewed without
// filling the form first. Removed with the other preview triggers in Execução (#81).
onMounted(() => {
  if (route.query.preview) return
  if (!restoreForm(houseId)) {
    router.replace(`/visita/agendar/${houseId}`)
  }
})

const startVerification = async () => {
  redirecting.value = true
  // ponytail: the real flow redirects to the identity provider (D-070) and
  // returns to /visita/[token]. Simulated until Execução (#80).
  await new Promise((resolve) => setTimeout(resolve, 500))
  router.push('/visita/demo-token?estado=confirmada')
}

useHead({
  title: computed(() =>
    house.value ? `Verificação — ${house.value.title} | ForteGB` : 'Verificação | ForteGB'
  ),
})
</script>
