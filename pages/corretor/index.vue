<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-primary-500 text-white overflow-hidden">
      <!-- ponytail: placeholder hero image (agent handing keys to a couple). Final
           asset is a launch decision (D-021); swap the file at public/corretor-hero.jpg.
           bg-primary-500 on the section is the fallback if the image is missing. -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/corretor-hero.jpg')"
        aria-hidden="true"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500/70 to-hero-slate/55"></div>
      <div class="relative container mx-auto px-4 py-16 md:py-20 max-w-4xl text-center">
        <p class="text-sm font-semibold uppercase tracking-wide text-white/70 mb-3">
          Corretor parceiro ForteGB
        </p>
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Ofereça imóveis de qualidade, com a transparência que já é a nossa marca
        </h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto mb-8 text-balance">
          Uma parceria guiada pela mesma clareza e confiança que oferecemos aos nossos clientes.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink
            to="/corretor/onboarding"
            class="w-full sm:w-auto inline-flex items-center justify-center border border-transparent bg-white text-primary-500 hover:bg-white/90 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            Quero ser parceiro
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="w-full sm:w-auto inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            Já sou parceiro — entrar
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Como funciona -->
    <section class="container mx-auto px-4 py-16 max-w-5xl">
      <h2 class="text-2xl md:text-3xl font-bold text-primary-500 text-center mb-3">Como funciona</h2>
      <p class="text-base-content/70 text-center max-w-2xl mx-auto mb-12">
        Da aprovação ao dia a dia, um caminho curto e sem surpresas.
      </p>
      <ol class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <li v-for="(step, i) in steps" :key="i" class="rounded-lg border border-base-300 bg-base-100 p-5">
          <span class="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-white font-bold text-sm mb-3">
            {{ i + 1 }}
          </span>
          <h3 class="font-semibold text-primary-500 mb-1">{{ step.title }}</h3>
          <p class="text-sm text-base-content/70">{{ step.text }}</p>
        </li>
      </ol>
    </section>

    <!-- Modelo de trabalho e transparência (referência, sem mecânica comercial) -->
    <section class="bg-base-200">
      <div class="container mx-auto px-4 py-16 max-w-4xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div class="md:col-span-1">
            <p class="text-sm font-semibold uppercase tracking-wide text-secondary mb-2">Transparência</p>
            <h2 class="text-2xl font-bold text-primary-500">Um modelo único de trabalho entre a ForteGB e seus parceiros</h2>
          </div>
          <div class="md:col-span-2 space-y-4 text-base-content/80">
            <p>
              A transparência que definimos com quem compra uma casa vale também para quem a
              vende. A nossa parceria funciona com regras claras, combinadas e registradas por
              escrito — você sabe exatamente como tudo funciona, do começo ao fim.
            </p>
            <p>
              Ao se cadastrar, você vê o modelo de trabalho e o contrato de parceria por
              inteiro, sem nenhum compromisso. Você conhece exatamente como as coisas
              funcionam antes de dizer sim.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Por que a ForteGB (produto como argumento) -->
    <section class="container mx-auto px-4 py-16 max-w-5xl">
      <h2 class="text-2xl md:text-3xl font-bold text-primary-500 text-center mb-12">
        Um produto que se vende sozinho
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(item, i) in reasons" :key="i" class="rounded-lg border border-base-300 bg-base-100 p-6">
          <h3 class="font-semibold text-primary-500 mb-2">{{ item.title }}</h3>
          <p class="text-sm text-base-content/70">{{ item.text }}</p>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="bg-gradient-to-br from-primary-500 to-hero-slate text-white">
      <div class="container mx-auto px-4 py-14 max-w-3xl text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">Pronto para começar?</h2>
        <p class="text-white/80 mb-8">
          O cadastro leva alguns minutos. Depois de aprovado, você conhece o modelo completo e
          já pode trabalhar as casas com a gente.
        </p>
        <NuxtLink
          to="/corretor/onboarding"
          class="inline-flex items-center justify-center border border-transparent bg-white text-primary-500 hover:bg-white/90 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
        >
          Quero ser parceiro
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Public explainer + entry point for the corretor partner program. Kept
// deliberately high-level: the commercial mechanics (commission protection, lead
// registration, contract clauses) are NOT exposed here — a buyer/lead can reach
// this page from the header, and seeing themselves framed as a "registered client"
// to be claimed for commission would clash with the buyer-facing brand. Those
// details live behind cadastro (onboarding + logged-in portal). This page sells the
// opportunity, the product quality, and the transparency of the working model.
// D-062: public self-registration + staff approval. Real redirect of a logged-in
// corretor to /corretor/dashboard is Execução (#86, middleware).
const steps = [
  { title: 'Cadastre-se', text: 'Preencha seu perfil — nome, WhatsApp, CPF e CRECI (se tiver).' },
  { title: 'Seja aprovado', text: 'A ForteGB confere seu cadastro e libera seu acesso ao painel.' },
  { title: 'Conheça o modelo', text: 'Com o acesso liberado, você vê o modelo de trabalho e o contrato por completo.' },
  { title: 'Trabalhe as casas', text: 'Escolha as casas que quer trabalhar e acompanhe seus clientes pelo painel.' },
]

const reasons = [
  { title: 'Solidez construtiva', text: 'Casas em condomínio na região de Campinas, prontas para morar, executadas com mão de obra própria.' },
  { title: 'Obra documentada', text: 'Cada etapa registrada com fotos, vídeos e notas fiscais — um dossiê que dá segurança ao seu cliente.' },
  { title: 'Marca de confiança', text: 'A transparência que a ForteGB pratica com seus clientes é o seu melhor argumento de venda.' },
]

useHead({
  title: 'Seja um corretor parceiro | ForteGB',
  meta: [
    {
      name: 'description',
      content:
        'Venda casas ForteGB de qualidade, com a transparência que já é a nossa marca. Conheça o programa de corretor parceiro e cadastre-se.',
    },
  ],
})
</script>
