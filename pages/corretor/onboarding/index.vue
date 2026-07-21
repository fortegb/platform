<template>
  <div class="min-h-screen flex items-center justify-center bg-primary-500 px-4 py-10">
    <div class="w-full max-w-md">
      <NuxtLink to="/" class="block" aria-label="Voltar para a página inicial">
        <img :src="logoUrl" alt="ForteGB" class="h-14 w-auto mx-auto mb-6" />
      </NuxtLink>

      <div class="rounded-2xl bg-base-100 shadow-xl">
        <div class="p-6 sm:p-8">
          <h1 class="text-2xl font-bold text-primary-500 mb-1">Complete seu cadastro</h1>
          <p class="text-sm text-base-content/60 mb-6">
            Faltam alguns dados para você atuar como corretor parceiro da ForteGB.
          </p>

          <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
            <div>
              <label for="nome" class="block text-sm font-medium mb-1.5">Nome completo</label>
              <input
                id="nome"
                v-model="form.nome"
                type="text"
                autocomplete="name"
                class="input input-bordered w-full"
                :class="errors.nome && 'input-error'"
                placeholder="Como no seu documento"
              />
              <p v-if="errors.nome" class="mt-1 text-sm text-error">{{ errors.nome }}</p>
            </div>

            <div>
              <label for="whatsapp" class="block text-sm font-medium mb-1.5">WhatsApp</label>
              <input
                id="whatsapp"
                v-model="form.whatsapp"
                type="tel"
                inputmode="numeric"
                autocomplete="tel"
                class="input input-bordered w-full"
                :class="errors.whatsapp && 'input-error'"
                placeholder="(19) 99999-9999"
                @input="form.whatsapp = maskPhone(form.whatsapp)"
              />
              <p v-if="errors.whatsapp" class="mt-1 text-sm text-error">{{ errors.whatsapp }}</p>
              <p v-else class="mt-1 text-sm text-base-content/60">
                É por aqui que a ForteGB fala com você sobre casas e comissões.
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

            <div>
              <label for="creci" class="block text-sm font-medium mb-1.5">
                CRECI <span class="text-base-content/50 font-normal">(opcional)</span>
              </label>
              <input
                id="creci"
                v-model="form.creci"
                type="text"
                class="input input-bordered w-full"
                placeholder="Ex.: CRECI-SP 123456"
              />
            </div>

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="form.termos"
                type="checkbox"
                class="checkbox checkbox-sm mt-0.5"
                :class="errors.termos && 'border-error'"
              />
              <span class="text-sm text-base-content/70">
                Li e aceito os
                <NuxtLink to="/termos" class="text-secondary hover:underline" target="_blank">Termos de Uso</NuxtLink>
                e a
                <NuxtLink to="/privacidade" class="text-secondary hover:underline" target="_blank">Política de Privacidade</NuxtLink>.
              </span>
            </label>
            <p v-if="errors.termos" class="-mt-3 text-sm text-error">{{ errors.termos }}</p>

            <button
              type="submit"
              :disabled="submitting"
              class="w-full inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              {{ submitting ? 'Enviando…' : 'Enviar para análise' }}
            </button>
          </form>
        </div>
      </div>

      <p class="text-center text-xs text-white/60 mt-6">
        Depois de enviar, sua conta passa por uma análise rápida da ForteGB.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { maskPhone, maskCpf, isValidCpf } from '~/composables/useVisitBooking'

// ponytail: design/mock only — this leaf (#201) designs the screen. Real signup,
// the corretor.status = pending_approval write, and the post-approval gating are
// Execução (#86/#50). Submitting just navigates to the simulated status page.
definePageMeta({ layout: false })

const logoUrl = usePublicAsset('/logo.png')
const router = useRouter()

const form = reactive({
  nome: '',
  whatsapp: '',
  cpf: '',
  creci: '',
  termos: false,
})

const errors = ref<Record<string, string>>({})
const submitting = ref(false)

const handleSubmit = async () => {
  const e: Record<string, string> = {}
  if (!form.nome.trim()) e.nome = 'Informe seu nome completo.'
  if (!form.whatsapp.trim()) e.whatsapp = 'Informe seu WhatsApp.'
  if (!form.cpf.trim()) e.cpf = 'Informe seu CPF.'
  else if (!isValidCpf(form.cpf)) e.cpf = 'Esse CPF não confere. Verifique os números.'
  if (!form.termos) e.termos = 'É preciso aceitar os termos para continuar.'
  errors.value = e
  if (Object.keys(e).length > 0) return

  submitting.value = true
  // ponytail: simulated — the real endpoint creates the account with
  // corretor.status = pending_approval (Execução #86/#50).
  await new Promise((resolve) => setTimeout(resolve, 400))
  router.push('/corretor/onboarding/status?estado=pending')
}

useHead({ title: 'Complete seu cadastro | ForteGB' })
</script>
