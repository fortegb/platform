<template>
  <div class="container mx-auto px-4 py-10 max-w-2xl">
    <!-- Invalid / unknown token. One message for any non-resolving token, on
         purpose: telling them apart would reveal which links were ever real.
         Same surface as the scheduled-visit result (#198). -->
    <div v-if="!visit" class="text-center py-12">
      <h1 class="text-2xl font-bold text-primary-500 mb-3">Link inválido</h1>
      <p class="text-base-content/70 mb-8 max-w-md mx-auto">
        Este link não está mais válido. Se você agendou uma visita e precisa alterá-la,
        fale com a gente pelo WhatsApp.
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

    <div v-else>
      <HouseVisitHeader :house="visit.house" />

      <div class="mt-8">
        <p class="text-sm font-semibold uppercase tracking-wide mb-1" :class="tone.label">
          {{ tone.eyebrow }}
        </p>
        <h1 class="text-2xl font-bold text-primary-500 mb-2">{{ tone.title }}</h1>
        <p class="text-base-content/70">{{ tone.message }}</p>
      </div>

      <!-- Visit details -->
      <dl class="mt-6 rounded-lg border border-base-300 bg-base-100 divide-y divide-base-300">
        <div class="flex items-baseline gap-4 p-4">
          <dt class="text-sm text-base-content/60 w-24 flex-shrink-0">Data</dt>
          <dd class="font-semibold" :class="isInactive && 'text-base-content/50'">{{ formattedDate }}</dd>
        </div>
        <div class="flex items-baseline gap-4 p-4">
          <dt class="text-sm text-base-content/60 w-24 flex-shrink-0">Horário</dt>
          <dd class="font-semibold" :class="isInactive && 'text-base-content/50'">{{ visit.time }}</dd>
        </div>
        <div class="flex items-baseline gap-4 p-4">
          <dt class="text-sm text-base-content/60 w-24 flex-shrink-0">Endereço</dt>
          <dd>
            <a
              :href="mapsUrl"
              target="_blank"
              rel="noopener"
              class="font-semibold text-primary-500 hover:underline"
            >
              {{ visit.house.location }}
            </a>
            <p class="text-sm text-base-content/60 mt-0.5">Toque para abrir no mapa</p>
          </dd>
        </div>
      </dl>

      <!-- Access code reference — only when it is live (access provisioned), so the
           cancel warning below can name a concrete code the visitor still has. -->
      <div v-if="tone.provisioned" class="mt-4 flex items-center gap-3 rounded-lg border border-base-300 bg-base-200 p-4">
        <div>
          <p class="text-xs uppercase tracking-wide text-base-content/50 mb-0.5">Código de acesso ativo</p>
          <p class="text-xl font-bold tracking-[0.25em] text-primary-500 font-mono">{{ visit.code }}</p>
        </div>
        <p class="text-sm text-base-content/60 ml-auto text-right">
          Válido no dia da visita, das {{ visit.time }} às {{ codeValidUntil }}
        </p>
      </div>

      <!-- Condominium / portaria notice. ponytail: universal because every ForteGB
           house is inside a condomínio today; a non-condomínio house is a separate
           future development that would reintroduce a per-house conditional (#140,
           Q-017 — access strategy stays deferred, this is only a heads-up). -->
      <div
        v-if="tone.actionable"
        class="mt-4 flex items-start gap-3 rounded-lg border border-base-300 bg-base-200 p-4"
      >
        <svg class="w-5 h-5 flex-shrink-0 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-primary-500 mb-0.5">Casa em condomínio</p>
          <p class="text-sm text-base-content/70">
            Ao chegar, identifique-se na portaria antes de seguir até a casa.
          </p>
        </div>
      </div>

      <!-- Cancel confirmation — an in-page state, not a one-click action. The copy
           is state-aware: only the provisioned branch warns about the live code. -->
      <div
        v-if="confirmingCancel"
        class="mt-6 rounded-lg border-2 border-error bg-error/5 p-5"
      >
        <p class="font-semibold text-primary-500 mb-1">Cancelar esta visita?</p>
        <p class="text-sm text-base-content/70">
          <template v-if="tone.provisioned">
            O código de acesso <span class="font-mono font-semibold">{{ visit.code }}</span> será
            desativado imediatamente e não funcionará mais na fechadura. Esta ação não pode ser desfeita.
          </template>
          <template v-else>
            Você poderá agendar uma nova visita quando quiser. Esta ação não pode ser desfeita.
          </template>
        </p>
        <div class="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            class="inline-flex items-center justify-center border border-transparent bg-error text-white hover:bg-error/90 px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-full sm:w-auto"
            @click="confirmCancel"
          >
            Sim, cancelar visita
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center border border-base-300 text-base-content hover:bg-base-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-full sm:w-auto"
            @click="confirmingCancel = false"
          >
            Voltar
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div v-if="!confirmingCancel" class="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
        <!-- Reschedule = constructive primary. ponytail: the original visit stays
             active; it is cancelled only when the new booking is confirmed (amends
             D-061 — see decisions.md). Pre-fill of name/phone is Execução (#141). -->
        <NuxtLink
          v-if="tone.actionable"
          :to="rescheduleTo"
          class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold transition-colors w-full sm:w-auto"
        >
          Remarcar visita
        </NuxtLink>
        <!-- Cancel = destructive; outlined in error tone, opens the confirmation above. -->
        <button
          v-if="tone.actionable"
          type="button"
          class="inline-flex items-center justify-center border border-error text-error hover:bg-error hover:text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold transition-colors w-full sm:w-auto"
          @click="confirmingCancel = true"
        >
          Cancelar visita
        </button>
        <!-- Rebook — terminal states that invite scheduling again. -->
        <NuxtLink
          v-if="tone.showRebook"
          :to="`/visita/agendar/${visit.house.id}`"
          class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold transition-colors w-full sm:w-auto"
        >
          Agendar nova visita
        </NuxtLink>
        <a
          v-if="tone.showHelp"
          :href="helpWhatsappUrl"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center gap-2 border border-transparent bg-whatsapp hover:bg-whatsapp-hover text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold transition-colors w-full sm:w-auto"
        >
          <WhatsAppIcon class="w-4 h-4" />
          Fale Conosco
        </a>
        <NuxtLink
          :to="`/portfolio/${visit.house.slug}`"
          class="text-sm font-semibold text-primary-500 hover:underline text-center sm:text-left"
        >
          Ver a casa →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockHouses } from '~/data/mock'

const route = useRoute()

// ponytail: the visit is simulated and its state comes from `?estado=`. The real
// screen loads the visit by token (no auth) and derives the variant from
// `visit.status` server-side — never from the URL, so the two can never disagree.
// Real cancel/revoke/rebook + the Telegram alert are Execução (#141, #81).
type Variant =
  | 'agendada'        // manageable, before access provisioned — cancel does not revoke
  | 'confirmada'      // manageable, access provisioned (code live) — cancel revokes
  | 'em-analise'      // manageable, verification pending staff review
  | 'cancelada'       // terminal — already cancelled (also where a confirmed cancel lands)
  | 'realizada'       // terminal — visit already happened
  | 'recusada'        // terminal — verification declined (security signal, kept distinct)
  | 'expirada'        // scheduled time passed without completing
  | 'invalida'        // token resolves to no visit

const urlVariant = computed<Variant>(() => (route.query.estado as Variant) || 'agendada')

// A confirmed cancel flips the view to the cancelled state locally, so the mock
// mirrors the real transition without a page reload.
const confirmingCancel = ref(false)
const locallyCancelled = ref(false)
const variant = computed<Variant>(() => (locallyCancelled.value ? 'cancelada' : urlVariant.value))

function confirmCancel() {
  locallyCancelled.value = true
  confirmingCancel.value = false
}

const visit = computed(() => {
  if (variant.value === 'invalida') return null
  const house = mockHouses.find((h) => h.status === 'disponivel')
  if (!house) return null
  return {
    house,
    date: variant.value === 'realizada' || variant.value === 'expirada' ? '2026-07-12' : '2026-07-25',
    time: '15:00',
    code: '4827',
  }
})

const isInactive = computed(() =>
  ['cancelada', 'realizada', 'recusada', 'expirada'].includes(variant.value)
)

interface Tone {
  eyebrow: string
  title: string
  message: string
  label: string
  actionable: boolean   // shows Cancel + Reschedule + condominium notice
  provisioned: boolean  // code is live: cancel warns deactivation, code shown
  showRebook: boolean
  showHelp: boolean
}

const TONES: Record<Variant, Tone> = {
  'agendada': {
    eyebrow: 'Visita agendada',
    title: 'Gerencie sua visita',
    message: 'Você pode remarcar ou cancelar esta visita a qualquer momento antes do horário marcado.',
    label: 'text-success',
    actionable: true,
    provisioned: false,
    showRebook: false,
    showHelp: true,
  },
  'confirmada': {
    eyebrow: 'Visita confirmada',
    title: 'Gerencie sua visita',
    message: 'Seu código de acesso já está liberado. Você ainda pode remarcar ou cancelar antes do horário.',
    label: 'text-success',
    actionable: true,
    provisioned: true,
    showRebook: false,
    showHelp: true,
  },
  'em-analise': {
    eyebrow: 'Agendamento em análise',
    title: 'Gerencie sua visita',
    message:
      'Sua verificação de identidade está em conferência pela nossa equipe. Você já pode remarcar ou cancelar, se precisar.',
    label: 'text-base-content/60',
    actionable: true,
    provisioned: false,
    showRebook: false,
    showHelp: true,
  },
  'cancelada': {
    eyebrow: 'Visita cancelada',
    title: 'Sua visita foi cancelada',
    message: 'O código de acesso foi desativado. Você pode agendar uma nova visita quando quiser.',
    label: 'text-base-content/60',
    actionable: false,
    provisioned: false,
    showRebook: true,
    showHelp: true,
  },
  'realizada': {
    eyebrow: 'Visita realizada',
    title: 'Esta visita já aconteceu',
    message:
      'Não há mais nada para gerenciar nesta visita. Se quiser voltar à casa, é só agendar uma nova.',
    label: 'text-base-content/60',
    actionable: false,
    provisioned: false,
    showRebook: true,
    showHelp: true,
  },
  'recusada': {
    eyebrow: 'Visita não autorizada',
    title: 'Não foi possível liberar esta visita',
    message:
      'A verificação de identidade não foi aprovada, então esta visita não pode ser gerenciada aqui. Fale com a nossa equipe para entender os próximos passos.',
    label: 'text-error',
    actionable: false,
    provisioned: false,
    showRebook: false,
    showHelp: true,
  },
  'expirada': {
    eyebrow: 'Prazo encerrado',
    title: 'O horário desta visita já passou',
    message:
      'Esta visita não aconteceu dentro do horário marcado e não pode mais ser remarcada por aqui. Você pode agendar uma nova visita.',
    label: 'text-base-content/60',
    actionable: false,
    provisioned: false,
    showRebook: true,
    showHelp: true,
  },
  'invalida': {
    eyebrow: '',
    title: '',
    message: '',
    label: '',
    actionable: false,
    provisioned: false,
    showRebook: false,
    showHelp: true,
  },
}

const tone = computed(() => TONES[variant.value])

const formattedDate = computed(() => {
  if (!visit.value) return ''
  const [year, month, day] = visit.value.date.split('-').map(Number)
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, day))
})

/** ponytail: two-hour window is a placeholder — the real duration is #214. */
const codeValidUntil = computed(() => {
  if (!visit.value) return ''
  const [hour, minute] = visit.value.time.split(':').map(Number)
  return `${String(hour + 2).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
})

// Reschedule routes into the standard booking flow (D-061), carrying the original
// date/time so the form can show the reschedule context (#200). ponytail: the real
// flow resolves the visit by token server-side; here it rides on the query. The
// original visit is cancelled only when the new slot is confirmed (D-071).
const rescheduleTo = computed(() => {
  if (!visit.value) return '/visita/agendar'
  return `/visita/agendar/${visit.value.house.id}?remarcar=1&data=${visit.value.date}&hora=${visit.value.time}`
})

const mapsUrl = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      visit.value?.house.location || ''
    )}`
)

const helpMessage = computed(
  () => `Olá! Preciso de ajuda com minha visita à ${visit.value?.house.title ?? 'uma casa'}.`
)
const { whatsappUrl: helpWhatsappUrl } = useWhatsApp(helpMessage)

useHead({ title: 'Gerenciar visita | ForteGB' })
</script>
