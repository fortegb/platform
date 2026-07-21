<template>
  <div class="min-h-screen flex items-center justify-center bg-primary-500 px-4">
    <div class="w-full max-w-md">
      <NuxtLink to="/" class="block" aria-label="Voltar para a página inicial">
        <img :src="logoUrl" alt="ForteGB" class="h-14 w-auto mx-auto mb-6" />
      </NuxtLink>
      <div class="rounded-2xl bg-base-100 shadow-xl">
        <div class="p-6 sm:p-8">
          <h1 class="text-2xl font-bold text-primary-500 text-center mb-1">{{ heading }}</h1>
          <p class="text-center text-sm text-base-content/60 mb-6">
            {{ subheading }}
          </p>

          <div v-if="error" class="rounded-lg border border-error/40 bg-error/10 p-3 mb-4 text-sm text-error">
            {{ error }}
          </div>

          <!-- Etapa 1: Social + E-mail -->
          <div v-if="step === 'email'">
            <div class="space-y-3">
              <button
                type="button"
                @click="handleSocialLogin('google')"
                class="w-full inline-flex items-center justify-center gap-3 border border-base-300 rounded-lg py-2.5 text-sm font-medium hover:bg-base-200 transition-colors"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar com Google
              </button>
              <button
                type="button"
                @click="handleSocialLogin('facebook')"
                class="w-full inline-flex items-center justify-center gap-3 border border-base-300 rounded-lg py-2.5 text-sm font-medium hover:bg-base-200 transition-colors"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z"/>
                </svg>
                Continuar com Facebook
              </button>
            </div>

            <div class="flex items-center gap-3 my-6">
              <div class="flex-1 h-px bg-base-300"></div>
              <span class="text-xs text-base-content/50">ou</span>
              <div class="flex-1 h-px bg-base-300"></div>
            </div>

            <form @submit.prevent="handleContinue" class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium mb-2">E-mail</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="username"
                  required
                  class="input input-bordered w-full"
                  placeholder="seu@email.com"
                />
              </div>
              <button type="submit" class="w-full inline-flex items-center justify-center gap-2 border border-transparent bg-secondary text-white hover:bg-primary-500 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                Continuar
              </button>
              <p class="text-center text-sm text-base-content/60">
                É corretor e ainda não tem conta?
                <NuxtLink to="/corretor" class="text-secondary hover:underline">Conheça o programa parceiro</NuxtLink>.
              </p>
            </form>
          </div>

          <!-- Etapa 2: Senha (conta existente) -->
          <div v-else-if="step === 'password'">
            <div class="flex items-center justify-between text-sm mb-4">
              <span class="text-base-content/70 truncate">{{ form.email }}</span>
              <button
                type="button"
                @click="backToEmail"
                class="text-secondary hover:underline shrink-0 ml-2"
              >
                Alterar
              </button>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-4">
              <input
                type="text"
                name="username"
                autocomplete="username"
                :value="form.email"
                class="hidden"
                readonly
              />
              <div>
                <label for="password" class="block text-sm font-medium mb-2">Senha</label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    autocomplete="current-password"
                    required
                    autofocus
                    class="input input-bordered w-full pr-10"
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-base-content"
                    :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
                  >
                    <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full inline-flex items-center justify-center gap-2 border border-transparent bg-secondary text-white hover:bg-primary-500 disabled:opacity-60 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                <span v-if="loading" class="loading loading-spinner"></span>
                <span v-else>Entrar</span>
              </button>
            </form>

            <div class="text-center mt-6">
              <NuxtLink to="/recuperar-senha" class="text-sm text-secondary hover:underline">
                Esqueci a senha
              </NuxtLink>
            </div>
          </div>

          <!-- Etapa 3: Conta não encontrada — cadastro público vive em /corretor -->
          <div v-else-if="step === 'create'">
            <div class="flex items-center justify-between text-sm mb-4">
              <span class="text-base-content/70 truncate">{{ form.email }}</span>
              <button
                type="button"
                @click="backToEmail"
                class="text-secondary hover:underline shrink-0 ml-2"
              >
                Alterar
              </button>
            </div>

            <p class="text-sm text-base-content/70 mb-6">
              Não encontramos uma conta com esse e-mail. Se você quer atuar como corretor
              parceiro da ForteGB, comece pelo programa — em poucos minutos você faz seu cadastro.
            </p>

            <div class="space-y-3">
              <NuxtLink
                to="/corretor"
                class="w-full inline-flex items-center justify-center border border-transparent bg-secondary text-white hover:bg-primary-500 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Conhecer o programa de corretor
              </NuxtLink>
              <button
                type="button"
                @click="backToEmail"
                class="w-full inline-flex items-center justify-center border border-base-300 text-base-content hover:bg-base-200 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Tentar outro e-mail
              </button>
            </div>
          </div>

          <p class="text-center text-xs text-base-content/50 mt-6">
            Ao continuar, você concorda com os
            <NuxtLink to="/termos" class="underline hover:text-base-content">Termos de Uso</NuxtLink>
            e a
            <NuxtLink to="/privacidade" class="underline hover:text-base-content">Política de Privacidade</NuxtLink>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['guest']
})

const logoUrl = usePublicAsset('/logo.png')

const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const step = ref<'email' | 'password' | 'create'>('email')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const heading = computed(() => step.value === 'create' ? 'Conta não encontrada' : 'Acesse sua conta')
const subheading = computed(() =>
  step.value === 'create'
    ? 'Esse e-mail ainda não tem acesso'
    : 'Entre para acessar sua área'
)

// MOCK (UI): e-mails tratados como "conta já existente".
// Substituir pela verificação real no back-end (endpoint /api/auth/check-email).
const mockExistingEmails = ['a@b.com']

const handleContinue = () => {
  error.value = ''
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)
  if (!emailValid) {
    error.value = 'Informe um e-mail válido.'
    return
  }

  // MOCK da diferenciação: e-mail conhecido -> login; demais -> cadastro.
  const exists = mockExistingEmails.includes(form.email.trim().toLowerCase())
  step.value = exists ? 'password' : 'create'
}

const backToEmail = () => {
  error.value = ''
  form.password = ''
  form.confirmPassword = ''
  showPassword.value = false
  step.value = 'email'
}

const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  error.value = ''

  try {
    const supabase = useSupabaseClient()
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/corretor/dashboard`
      }
    })

    if (authError) {
      error.value = 'Não foi possível iniciar o login. Tente novamente.'
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao fazer login. Tente novamente.'
  }
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const supabase = useSupabaseClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })

    if (authError) {
      error.value = 'E-mail ou senha incorretos.'
      return
    }

    // Verificar se o usuário é um corretor
    const { data: realtor, error: realtorError } = await supabase
      .from('realtors')
      .select('*')
      .eq('user_id', data.user.id)
      .single()

    if (realtorError || !realtor) {
      error.value = 'Você não tem permissão para acessar este portal.'
      await supabase.auth.signOut()
      return
    }

    // Redirecionar para o dashboard
    await navigateTo('/corretor/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Erro ao fazer login. Tente novamente.'
  } finally {
    loading.value = false
  }
}

// Public corretor sign-up lives at /corretor (D-062 self-registration); the login
// screen only authenticates. An unknown e-mail lands on the "conta não encontrada"
// step, which points to /corretor. ponytail: real account-existence check is
// Execução (#48) — the mock treats unknown e-mails as new.
</script>
