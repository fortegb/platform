<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium mb-2">Nome *</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        class="input w-full bg-base-100 border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Seu nome completo"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium mb-2">E-mail *</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="input w-full bg-base-100 border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="seu@email.com"
      />
    </div>

    <div>
      <label for="phone" class="block text-sm font-medium mb-2">Telefone *</label>
      <input
        id="phone"
        v-model="form.phone"
        type="tel"
        required
        class="input w-full bg-base-100 border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="(19) 99999-9999"
      />
    </div>

    <div>
      <label for="subject" class="block text-sm font-medium mb-2">Assunto</label>
      <select
        id="subject"
        v-model="form.subject"
        class="select w-full bg-base-100 border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="">Selecione um assunto</option>
        <option value="info">Informações sobre projetos</option>
        <option value="visit">Agendar visita</option>
        <option value="partnership">Parceria</option>
        <option value="other">Outro</option>
      </select>
    </div>

    <div>
      <label for="message" class="block text-sm font-medium mb-2">Mensagem *</label>
      <textarea
        id="message"
        v-model="form.message"
        required
        rows="5"
        class="textarea w-full bg-base-100 border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Sua mensagem..."
      ></textarea>
    </div>

    <div v-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <div v-if="success" class="alert alert-success">
      <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="btn btn-primary w-full"
    >
      <span v-if="loading" class="loading loading-spinner"></span>
      <span v-else>Enviar Mensagem</span>
    </button>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form
    })

    if (response.success) {
      success.value = true
      // Reset form
      form.name = ''
      form.email = ''
      form.phone = ''
      form.subject = ''
      form.message = ''
    } else {
      error.value = response.error || 'Erro ao enviar mensagem. Tente novamente.'
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao enviar mensagem. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>



