<template>
  <div class="container mx-auto px-4 py-12 max-w-lg">
    <div class="mb-8">
      <NuxtLink to="/corretor" class="text-sm font-semibold text-primary-500 hover:underline">
        ← Programa de corretor parceiro
      </NuxtLink>
      <h1 class="text-3xl font-bold text-primary-500 mt-3 mb-1">Cadastro de corretor</h1>
      <p class="text-base-content/70">
        Preencha seus dados. Depois de enviar, a ForteGB confere seu cadastro e libera seu
        acesso ao painel.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5 rounded-lg border border-base-300 bg-base-100 p-6" novalidate>
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
        <label for="email" class="block text-sm font-medium mb-1.5">E-mail</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          class="input input-bordered w-full"
          :class="errors.email && 'input-error'"
          placeholder="seu@email.com"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-error">{{ errors.email }}</p>
      </div>

      <div>
        <label for="senha" class="block text-sm font-medium mb-1.5">Senha</label>
        <input
          id="senha"
          v-model="form.senha"
          type="password"
          autocomplete="new-password"
          class="input input-bordered w-full"
          :class="errors.senha && 'input-error'"
          placeholder="Crie uma senha"
        />
        <p v-if="errors.senha" class="mt-1 text-sm text-error">{{ errors.senha }}</p>
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

      <p class="text-center text-sm text-base-content/60">
        Já tem conta?
        <NuxtLink to="/login" class="text-secondary hover:underline">Entrar</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { maskPhone, maskCpf, isValidCpf } from '~/composables/useVisitBooking'

// Self-registration form (D-062: public sign-up + staff approval). The corretor
// arrives from /corretor logged out and creates account + profile in one step.
// ponytail: design/mock — real signup (supabase.auth.signUp) + corretor.status =
// pending_approval is Execução (#86/#50). Submitting navigates to the status page.
const router = useRouter()

const form = reactive({
  nome: '',
  email: '',
  senha: '',
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
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Informe um e-mail válido.'
  if (form.senha.length < 8) e.senha = 'A senha deve ter pelo menos 8 caracteres.'
  if (!form.whatsapp.trim()) e.whatsapp = 'Informe seu WhatsApp.'
  if (!form.cpf.trim()) e.cpf = 'Informe seu CPF.'
  else if (!isValidCpf(form.cpf)) e.cpf = 'Esse CPF não confere. Verifique os números.'
  if (!form.termos) e.termos = 'É preciso aceitar os termos para continuar.'
  errors.value = e
  if (Object.keys(e).length > 0) return

  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 400))
  router.push('/corretor/onboarding/status?estado=pending')
}

useHead({ title: 'Cadastro de corretor | ForteGB' })
</script>
