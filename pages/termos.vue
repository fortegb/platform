<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-4xl md:text-5xl font-bold mb-8">Termos de Uso</h1>

    <div>
      <p class="text-sm text-base-content/70 mb-8">
        Última atualização: {{ currentDate }}
      </p>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
        <p class="text-base-content/80">
          Ao acessar e usar o site da ForteGB, você concorda em cumprir e estar vinculado a
          estes Termos de Uso. Se você não concordar com qualquer parte destes termos,
          não deve usar nosso site.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">2. Uso do Site</h2>
        <p class="text-base-content/80 mb-3">
          Você concorda em usar o site apenas para fins legais e de acordo com estes termos.
          É proibido:
        </p>
        <ul class="list-disc list-inside space-y-1 text-base-content/80">
          <li>Usar o site de forma que viole qualquer lei ou regulamento</li>
          <li>Transmitir qualquer conteúdo malicioso ou prejudicial</li>
          <li>Tentar acessar áreas restritas do site</li>
          <li>Interferir no funcionamento do site</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">3. Agendamento de Visitas</h2>
        <p class="text-base-content/80 mb-3">
          Ao agendar uma visita através do site, você concorda em:
        </p>
        <ul class="list-disc list-inside space-y-1 text-base-content/80">
          <li>Fornecer informações verdadeiras e precisas</li>
          <li>Permitir verificação de identidade</li>
          <li>Respeitar as regras de acesso às propriedades</li>
          <li>Usar a senha de acesso apenas durante o período autorizado</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">4. Propriedade Intelectual</h2>
        <p class="text-base-content/80">
          Todo o conteúdo do site, incluindo textos, imagens, logos e design, é propriedade
          da ForteGB e está protegido por leis de direitos autorais.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">5. Limitação de Responsabilidade</h2>
        <p class="text-base-content/80">
          A ForteGB não se responsabiliza por danos diretos, indiretos ou consequenciais
          resultantes do uso ou incapacidade de usar o site.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">6. Modificações</h2>
        <p class="text-base-content/80">
          Reservamos o direito de modificar estes termos a qualquer momento. Alterações
          significativas serão comunicadas através do site.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">7. Lei Aplicável</h2>
        <p class="text-base-content/80">
          Estes termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida
          nos tribunais competentes de Campinas-SP.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">8. Contato</h2>
        <p class="text-base-content/80 mb-3">
          Para questões sobre estes Termos de Uso, entre em contato:
        </p>
        <p class="text-base-content/80">
          <strong>E-mail:</strong>
          <a href="mailto:contato@fortegb.com" class="text-primary-500 hover:underline">
            contato@fortegb.com
          </a>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Termos de Uso - ForteGB',
  meta: [
    {
      name: 'description',
      content: 'Termos de Uso do site ForteGB'
    }
  ]
})

const currentDate = new Date().toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
</script>
