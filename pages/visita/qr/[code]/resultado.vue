<template>
  <div class="container mx-auto px-4 py-10 max-w-2xl">
    <HouseVisitHeader v-if="house" :house="house" />

    <div class="mt-8">
      <p class="text-sm font-semibold uppercase tracking-wide mb-1" :class="tone.label">
        {{ tone.eyebrow }}
      </p>
      <h1 class="text-2xl font-bold text-primary-500 mb-2">{{ tone.title }}</h1>
      <p class="text-base-content/70">{{ tone.message }}</p>
    </div>

    <!-- Access granted — code shown only once it was written to the lock -->
    <template v-if="variant === 'liberado'">
      <div class="mt-6 rounded-lg border-2 border-secondary bg-secondary/5 p-5 text-center">
        <p class="text-sm text-base-content/70 mb-2">Código de acesso</p>
        <p class="text-4xl font-bold tracking-[0.3em] text-primary-500 font-mono">{{ accessCode }}</p>
        <p class="text-sm text-base-content/70 mt-3">
          Válido por {{ validHours }} horas, a partir de agora
        </p>
      </div>

      <div class="mt-6 rounded-lg border border-base-300 p-5">
        <p class="text-sm font-semibold text-primary-500 mb-3">Como entrar</p>
        <ol class="space-y-2 text-sm text-base-content/80 list-decimal list-inside">
          <li>Toque no teclado da fechadura para acendê-lo.</li>
          <li>Digite o código de {{ accessCode.length }} dígitos.</li>
          <li>Confirme na tecla <span class="font-semibold">#</span> e gire a maçaneta.</li>
        </ol>
        <p class="text-sm text-base-content/60 mt-3">
          Enviamos o código também pelo seu WhatsApp. Ao sair, puxe a porta e confirme que trancou.
        </p>
      </div>
    </template>

    <!-- Immediate decline — the escape hatch, never a spinner (D-059) -->
    <template v-else-if="variant === 'recusado'">
      <div class="mt-6 rounded-lg border border-base-300 bg-base-200 p-5 text-sm">
        <p class="font-semibold text-primary-500 mb-1">Como resolver agora</p>
        <p class="text-base-content/70">
          Fale com a nossa equipe pelo WhatsApp. Se estiver tudo certo, liberamos seu acesso na
          hora, mesmo com você aí na porta.
        </p>
      </div>
    </template>

    <!-- Provisioning failed — staff alerted, no code, distinct from granted -->
    <template v-else-if="variant === 'falha-acesso'">
      <div class="mt-6 rounded-lg border border-warning/40 bg-warning/10 p-5 text-sm">
        <p class="font-semibold mb-1">A fechadura não respondeu</p>
        <p class="text-base-content/70">
          Sua identidade foi confirmada, mas não conseguimos programar a fechadura desta casa.
          Nossa equipe já foi avisada e vai te passar o acesso pelo WhatsApp em instantes — não
          precisa refazer a verificação.
        </p>
      </div>
    </template>

    <!-- Actions -->
    <div class="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
      <a
        v-if="tone.showHelp"
        :href="helpWhatsappUrl"
        target="_blank"
        rel="noopener"
        class="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-transparent bg-whatsapp hover:bg-whatsapp-hover text-white px-4 py-3 sm:py-2 rounded-lg text-sm font-semibold transition-colors"
      >
        <WhatsAppIcon class="w-4 h-4" />
        Fale Conosco
      </a>
      <NuxtLink
        v-if="house"
        :to="`/portfolio/${house.slug}`"
        class="text-sm font-semibold text-primary-500 hover:underline text-center sm:text-left"
      >
        Ver a casa →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockHouses } from '~/data/mock'

const route = useRoute()

// ponytail: the result is simulated and its variant comes from `?estado=`. The
// real screen loads the visit by its code and derives the variant from the
// persisted `visit.status` server-side — never from the URL, so the two can never
// disagree (#81, D-059). No async "pending review" variant exists here: the
// instant flow declines immediately instead (unlike the scheduled flow, #198).
type Variant = 'liberado' | 'recusado' | 'falha-acesso'

const variant = computed<Variant>(() => (route.query.estado as Variant) || 'liberado')

const house = computed(() => mockHouses.find((h) => h.status === 'disponivel'))

const accessCode = '4827'
/** ponytail: window is a placeholder — the real duration is #214. */
const validHours = 2

const TONES: Record<Variant, {
  eyebrow: string
  title: string
  message: string
  label: string
  showHelp: boolean
}> = {
  'liberado': {
    eyebrow: 'Acesso liberado',
    title: 'Tudo pronto, pode entrar',
    message: 'Use o código abaixo na fechadura da casa.',
    label: 'text-success',
    showHelp: true,
  },
  'recusado': {
    eyebrow: 'Não foi possível liberar',
    title: 'Não conseguimos confirmar sua identidade',
    message:
      'Não liberamos o acesso desta vez. Isso costuma ser a foto ou a luz — nada definitivo.',
    label: 'text-error',
    showHelp: true,
  },
  'falha-acesso': {
    eyebrow: 'Quase lá',
    title: 'Sua identidade foi confirmada',
    message: 'Só faltou a fechadura responder. Já estamos resolvendo.',
    label: 'text-warning',
    showHelp: true,
  },
}

const tone = computed(() => TONES[variant.value])

const helpMessage = computed(() => {
  if (variant.value === 'recusado') {
    return `Olá! Estou na porta da ${house.value?.title ?? 'casa'} e a verificação de identidade não passou. Podem me ajudar a entrar?`
  }
  if (variant.value === 'falha-acesso') {
    return `Olá! Minha identidade foi confirmada para a ${house.value?.title ?? 'casa'}, mas a fechadura não liberou. Podem me passar o acesso?`
  }
  return `Olá! Preciso de ajuda com minha visita à ${house.value?.title ?? 'casa'}.`
})
const { whatsappUrl: helpWhatsappUrl } = useWhatsApp(helpMessage)

useHead({ title: 'Sua visita | ForteGB' })
</script>
