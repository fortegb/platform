<template>
  <div class="container mx-auto px-4 py-10 max-w-2xl">
    <!-- State 17 — unknown or expired token. One message for both cases, on
         purpose: telling them apart would reveal which links were ever real. -->
    <div v-if="!visit" class="text-center py-12">
      <h1 class="text-2xl font-bold text-primary-500 mb-3">Link inválido</h1>
      <p class="text-base-content/70 mb-8 max-w-md mx-auto">
        Este link não está mais válido. Se você agendou uma visita e precisa dos dados de acesso,
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
          <dd class="font-semibold" :class="isPast && 'text-base-content/50'">{{ formattedDate }}</dd>
        </div>
        <div class="flex items-baseline gap-4 p-4">
          <dt class="text-sm text-base-content/60 w-24 flex-shrink-0">Horário</dt>
          <dd class="font-semibold" :class="isPast && 'text-base-content/50'">{{ visit.time }}</dd>
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

      <!-- State 13/14 — access code, only when it was actually written to the lock -->
      <div v-if="showCode" class="mt-6 rounded-lg border-2 border-secondary bg-secondary/5 p-5 text-center">
        <p class="text-sm text-base-content/70 mb-2">Código de acesso</p>
        <p class="text-4xl font-bold tracking-[0.3em] text-primary-500 font-mono">{{ visit.code }}</p>
        <p class="text-sm text-base-content/70 mt-3">
          Válido das {{ visit.time }} às {{ codeValidUntil }}
        </p>
      </div>

      <!-- State 14 — the returning client, told why no document was asked for -->
      <div v-if="variant === 'confirmada-reuso'" class="mt-4 rounded-lg border border-base-300 bg-base-200 p-4 text-sm">
        <p class="font-semibold mb-1">Não pedimos seu documento desta vez</p>
        <p class="text-base-content/70">
          Sua verificação de identidade de {{ previousVerification }} continua válida — vale até {{ verificationValidUntil }}.
        </p>
      </div>

      <!-- Lock instructions, mirrored from the WhatsApp message -->
      <div v-if="showCode" class="mt-6 rounded-lg border border-base-300 p-5">
        <p class="text-sm font-semibold text-primary-500 mb-3">Como entrar</p>
        <ol class="space-y-2 text-sm text-base-content/80 list-decimal list-inside">
          <li>Toque no teclado da fechadura para acendê-lo.</li>
          <li>Digite o código de {{ visit.code.length }} dígitos.</li>
          <li>Confirme na tecla <span class="font-semibold">#</span> e gire a maçaneta.</li>
        </ol>
        <p class="text-sm text-base-content/60 mt-3">
          Ao sair, puxe a porta e confirme que trancou.
        </p>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          v-if="tone.showHelp"
          :href="helpWhatsappUrl"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center gap-2 border border-transparent bg-whatsapp hover:bg-whatsapp-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <WhatsAppIcon class="w-4 h-4" />
          Fale Conosco
        </a>
        <NuxtLink
          v-if="tone.showManage"
          :to="`/visita/gerenciar/${token}`"
          class="inline-flex items-center justify-center border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Cancelar ou remarcar
        </NuxtLink>
        <NuxtLink
          v-if="tone.showRebook"
          :to="`/visita/agendar/${visit.house.id}`"
          class="inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Agendar outra visita
        </NuxtLink>
        <NuxtLink
          :to="`/portfolio/${visit.house.slug}`"
          class="text-sm font-semibold text-primary-500 hover:underline"
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
const token = route.params.token as string

// ponytail: the visit is simulated and its state comes from `?estado=`. The real
// screen loads the visit by token and derives the variant from `visit.status`
// server-side — never from the URL, so the two can never disagree (#81).
type Variant =
  | 'confirmada'
  | 'confirmada-reuso'
  | 'em-analise'
  | 'acesso-pendente'
  | 'cancelada'
  | 'passada'
  | 'invalida'

const variant = computed<Variant>(() => (route.query.estado as Variant) || 'confirmada')

const visit = computed(() => {
  if (variant.value === 'invalida') return null
  const house = mockHouses.find((h) => h.status === 'disponivel')
  if (!house) return null
  return {
    house,
    date: variant.value === 'passada' ? '2026-07-12' : '2026-07-25',
    time: '15:00',
    code: '4827',
  }
})

const isPast = computed(() => variant.value === 'passada')
const showCode = computed(
  () => variant.value === 'confirmada' || variant.value === 'confirmada-reuso'
)

const TONES: Record<Variant, {
  eyebrow: string
  title: string
  message: string
  label: string
  showHelp: boolean
  showManage: boolean
  showRebook: boolean
}> = {
  'confirmada': {
    eyebrow: 'Visita confirmada',
    title: 'Tudo pronto para sua visita',
    message: 'Enviamos estes dados também pelo seu WhatsApp, para você ter em mãos na hora.',
    label: 'text-success',
    showHelp: true,
    showManage: true,
    showRebook: false,
  },
  'confirmada-reuso': {
    eyebrow: 'Visita confirmada',
    title: 'Tudo pronto para sua visita',
    message: 'Enviamos estes dados também pelo seu WhatsApp, para você ter em mãos na hora.',
    label: 'text-success',
    showHelp: true,
    showManage: true,
    showRebook: false,
  },
  'em-analise': {
    eyebrow: 'Agendamento recebido',
    title: 'Recebemos seu agendamento',
    message:
      'Sua verificação de identidade precisa de uma conferência rápida da nossa equipe. Confirmamos pelo WhatsApp em até 24 horas, sempre antes da data da visita.',
    label: 'text-base-content/60',
    showHelp: true,
    showManage: true,
    showRebook: false,
  },
  'acesso-pendente': {
    eyebrow: 'Visita confirmada',
    title: 'Sua visita está confirmada',
    message:
      'O código de acesso ainda está sendo liberado na fechadura. Nossa equipe já foi avisada e envia os dados de acesso pelo WhatsApp antes da sua visita.',
    label: 'text-warning',
    showHelp: true,
    showManage: true,
    showRebook: false,
  },
  'cancelada': {
    eyebrow: 'Visita cancelada',
    title: 'Sua visita foi cancelada',
    message: 'O código de acesso foi desativado. Você pode agendar uma nova visita quando quiser.',
    label: 'text-base-content/60',
    showHelp: false,
    showManage: false,
    showRebook: true,
  },
  'passada': {
    eyebrow: 'Visita realizada',
    title: 'Esta visita já aconteceu',
    message:
      'O código de acesso desta visita não funciona mais. Se quiser voltar à casa ou tirar alguma dúvida, é só chamar.',
    label: 'text-base-content/60',
    showHelp: true,
    showManage: false,
    showRebook: true,
  },
  'invalida': {
    eyebrow: '',
    title: '',
    message: '',
    label: '',
    showHelp: true,
    showManage: false,
    showRebook: false,
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

const previousVerification = computed(() => 'março de 2026')
const verificationValidUntil = computed(() => 'março de 2027')

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

useHead({ title: 'Sua visita | ForteGB' })
</script>
