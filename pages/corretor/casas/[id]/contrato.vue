<template>
  <div class="container mx-auto px-4 py-10 max-w-3xl">
    <!-- Inaccessible — claim not found or not this corretor's. One generic message
         either way, so it never reveals another corretor's claim. ponytail: real
         access control is RLS + middleware (D-055), Execução. -->
    <div v-if="variant === 'inacessivel' || !house" class="text-center py-12">
      <h1 class="text-2xl font-bold text-primary-500 mb-3">Contrato não disponível</h1>
      <p class="text-base-content/70 mb-8 max-w-md mx-auto">
        Este contrato não está disponível para a sua conta. Se você reivindicou esta casa e
        precisa do contrato, fale com a nossa equipe.
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
          to="/corretor/casas"
          class="inline-flex items-center justify-center border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Ver as casas
        </NuxtLink>
      </div>
    </div>

    <div v-else>
      <!-- House context -->
      <NuxtLink
        :to="`/portfolio/${house.slug}`"
        class="flex items-center gap-4 rounded-lg border border-base-300 bg-base-100 p-3 hover:border-primary-500 transition-colors"
      >
        <img :src="house.image" :alt="house.title" class="w-20 h-16 object-cover rounded-md flex-shrink-0" />
        <div class="min-w-0">
          <p class="text-xs uppercase tracking-wide text-base-content/50 mb-0.5">Contrato da casa</p>
          <p class="font-semibold text-primary-500 truncate">{{ house.title }}</p>
          <p class="text-sm text-base-content/70 truncate">{{ house.location }}</p>
        </div>
      </NuxtLink>

      <div class="mt-8">
        <p class="text-sm font-semibold uppercase tracking-wide mb-1" :class="tone.label">
          {{ tone.eyebrow }}
        </p>
        <h1 class="text-2xl font-bold text-primary-500 mb-2">{{ tone.title }}</h1>
        <p class="text-base-content/70">{{ tone.message }}</p>
      </div>

      <!-- Pending — off-platform (Gov.br) signing flow, guided. Signing and the
           signed-file handoff stay off-platform (D-062): the corretor sends the
           signed PDF by WhatsApp; only staff uploads the final, which is the
           approval act. The staff side of this is leaf #204 (/staff/corretores). -->
      <div v-if="variant === 'pending'" class="mt-6 rounded-lg border border-secondary/40 bg-secondary/5 p-5">
        <p class="text-sm font-semibold text-primary-500 mb-3">Como assinar seu contrato</p>
        <ol class="space-y-2 text-sm text-base-content/70 list-decimal list-inside mb-4">
          <li>Revise a minuta abaixo e <span class="font-semibold text-primary-500">baixe o PDF</span> desta casa.</li>
          <li>Assine pelo <span class="font-semibold text-primary-500">Gov.br</span> — a assinatura eletrônica é gratuita e tem validade jurídica.</li>
          <li>Envie o PDF assinado para a ForteGB <span class="font-semibold text-primary-500">pelo WhatsApp</span>.</li>
          <li>A ForteGB assina e conclui. Quando o contrato assinado aparecer aqui, sua reivindicação está aprovada.</li>
        </ol>
        <div class="flex flex-col sm:flex-row gap-3">
          <a
            :href="minutaUrl"
            download
            class="inline-flex items-center justify-center gap-2 border border-transparent bg-secondary text-white hover:bg-primary-500 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Baixar minuta para assinar
          </a>
          <a
            :href="sendWhatsappUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center gap-2 border border-transparent bg-whatsapp hover:bg-whatsapp-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <WhatsAppIcon class="w-4 h-4" />
            Enviar assinado pelo WhatsApp
          </a>
        </div>
        <p class="mt-3 text-xs text-base-content/60">Aguardando sua assinatura e a da ForteGB.</p>
      </div>

      <!-- Approved — signed contract available -->
      <div v-if="variant === 'approved'" class="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-success/40 bg-success/5 p-4">
        <div class="min-w-0">
          <p class="text-sm font-semibold text-primary-500">Contrato assinado</p>
          <p class="text-sm text-base-content/70 truncate">contrato-{{ house.slug }}-assinado.pdf</p>
        </div>
        <a
          :href="signedContractUrl"
          target="_blank"
          rel="noopener"
          class="ml-auto inline-flex items-center justify-center gap-2 border border-transparent bg-secondary text-white hover:bg-primary-500 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Ver contrato assinado
        </a>
      </div>

      <!-- Minuta (draft) — rendered from the template with house-specific terms.
           ponytail: mock content; the real minuta renders from the existing legal
           template (D-062). Execução wires the stored PDF for the approved case. -->
      <article class="mt-6 rounded-lg border border-base-300 bg-base-100 p-6">
        <p class="text-xs uppercase tracking-wide text-base-content/50 mb-3">
          {{ variant === 'approved' ? 'Contrato' : 'Minuta — sujeita a assinatura' }}
        </p>
        <h2 class="text-lg font-bold text-primary-500 mb-1">Contrato de Parceria de Corretagem</h2>
        <p class="text-sm text-base-content/60 mb-4">
          ForteGB Incorporações e o corretor parceiro, referente à casa
          <span class="font-semibold">{{ house.title }}</span> ({{ house.location }}).
        </p>
        <div class="space-y-3 text-sm text-base-content/80 leading-relaxed">
          <p><span class="font-semibold text-primary-500">1. Objeto.</span> Autorização para intermediar a venda da casa {{ house.title }}, sem exclusividade, mantida a proteção de comissão por cliente registrado.</p>
          <p><span class="font-semibold text-primary-500">2. Comissão.</span> Devida ao corretor que registrou o cliente comprador primeiro, conforme as regras de proteção de comissão da ForteGB.</p>
          <p><span class="font-semibold text-primary-500">3. Registro de clientes.</span> Feito pelo painel do corretor; o carimbo de data e hora do registro determina a titularidade da comissão.</p>
          <p><span class="font-semibold text-primary-500">4. Vigência.</span> Enquanto a casa estiver disponível para venda e a parceria estiver ativa.</p>
        </div>
      </article>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <NuxtLink
          to="/corretor/casas"
          class="text-sm font-semibold text-primary-500 hover:underline"
        >
          ← Voltar às casas
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockHouses } from '~/data/mock'

// ponytail: design/mock only (#201). Variant rides on `?estado=`; the real page
// derives it from the `corretor_casa` claim status + ownership server-side. The
// claim itself is triggered from /corretor/casas (#203); this page is where it
// lands. Staff upload + approval are Execução (#86/#50).
const route = useRoute()

type Variant = 'pending' | 'approved' | 'inacessivel'
const variant = computed<Variant>(() => (route.query.estado as Variant) || 'pending')

const house = computed(() => {
  if (variant.value === 'inacessivel') return null
  const id = route.params.id as string
  return mockHouses.find((h) => String(h.id) === id || h.slug === id) || mockHouses[1]
})

const TONES: Record<'pending' | 'approved', { eyebrow: string; title: string; message: string; label: string }> = {
  pending: {
    eyebrow: 'Reivindicação em andamento',
    title: 'Contrato desta casa',
    message: 'Você reivindicou esta casa. Revise a minuta e siga com a assinatura combinada com a ForteGB.',
    label: 'text-warning',
  },
  approved: {
    eyebrow: 'Casa atribuída a você',
    title: 'Contrato desta casa',
    message: 'Esta casa está atribuída a você. O contrato assinado fica disponível abaixo.',
    label: 'text-success',
  },
}
const tone = computed(() => TONES[variant.value === 'approved' ? 'approved' : 'pending'])

// ponytail: placeholder — the real signed PDF comes from the private bucket (D-016/D-030).
const signedContractUrl = computed(() => '#')

// ponytail: placeholder — the real minuta PDF is generated on the fly from the CMS
// contract template + this house's terms (D-036/Execução). Here the download is inert.
const minutaUrl = computed(() => '#')

const sendMessage = computed(
  () => `Olá! Segue em anexo o contrato assinado da casa ${house.value?.title ?? ''}.`
)
const { whatsappUrl: sendWhatsappUrl } = useWhatsApp(sendMessage)

const helpMessage = computed(() => 'Olá! Preciso de ajuda com o contrato de uma casa no meu painel de corretor.')
const { whatsappUrl: helpWhatsappUrl } = useWhatsApp(helpMessage)

useHead({ title: 'Contrato da casa | ForteGB' })
</script>
