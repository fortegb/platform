<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-8">Sobre a ForteGB</h1>
      
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Nossa História</h2>
        <div class="space-y-4 text-base-content/80">
          <p>
            A ForteGB nasceu em 2016, em Campinas-SP, da união de três sócios investidores
            com o mesmo sonho: atuar no mercado de construção civil oferecendo às famílias
            de seus clientes a mesma qualidade que desejavam para suas próprias famílias
            ao adquirir uma casa. Hoje,
            especializados em casas em condomínio na região de Campinas, entregamos sempre
            produtos prontos para morar, com cuidado e capricho em cada detalhe da execução.
          </p>
          <p>
            Por isso, nosso compromisso com qualidade e solidez construtiva é inegociável:
            toda obra é executada com mão de obra própria e capacitada, seguindo
            rigorosamente os projetos aprovados, da fundação ao acabamento.
          </p>
          <p>
            E para que você tenha total tranquilidade, documentamos cada etapa da
            construção — ao comprar uma casa ForteGB, você recebe um dossiê completo com
            fotos e vídeos demonstrando a evolução da construção em todas as etapas, notas
            fiscais dos materiais utilizados, e toda a documentação oficial (matrícula,
            habite-se e demais registros), para que você saiba exatamente como e com o que
            sua casa foi construída. Transparência de verdade: cada etapa documentada,
            pronta para você conferir.
          </p>
          <p>
            É esse cuidado e essa qualidade que constroem, ao longo dos anos,
            a confiança de quem já comprou com a gente — e é o que queremos manter conforme
            crescemos: continuar sendo uma empresa de família, que constrói para famílias.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="card bg-base-200 shadow-xl p-6">
          <h3 class="text-2xl font-bold mb-4">Nossa Missão</h3>
          <p>
            Construir sonhos e realizar vidas através de casas em condomínio prontas para
            morar, com a qualidade construtiva e o cuidado que reservaríamos para a nossa
            própria família.
          </p>
        </div>

        <div class="card bg-base-200 shadow-xl p-6">
          <h3 class="text-2xl font-bold mb-4">Nossa Visão</h3>
          <p>
            Ser reconhecida como a construtora de referência em qualidade construtiva na
            região de Campinas, crescendo sem nunca perder o que nos diferencia: sermos
            uma empresa de família.
          </p>
        </div>
      </div>

      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4">Entre em Contato</h2>
        <p class="text-lg text-base-content/70 mb-6">
          Quer saber mais sobre nossos projetos?<br>Estamos prontos para ajudar você a encontrar sua nova casa.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-44 inline-flex items-center justify-center gap-2 bg-whatsapp text-white hover:bg-whatsapp-hover px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <WhatsAppIcon class="w-4 h-4" />
            Fale Conosco
          </a>
          <NuxtLink
            to="/contato"
            class="w-44 inline-flex items-center justify-center bg-primary-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors"
          >
            Enviar Mensagem
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Sobre Nós - ForteGB',
  meta: [
    {
      name: 'description',
      content: 'Conheça a história da ForteGB, construtora familiar especializada em casas em condomínio na região de Campinas-SP, com qualidade construtiva e processo documentado do início ao fim.'
    }
  ]
})

const { whatsappUrl } = useWhatsApp('Olá! Gostaria de saber mais sobre a ForteGB.')
</script>



