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
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
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

const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber || '5519991444862'
const message = encodeURIComponent('Olá! Gostaria de saber mais sobre a ForteGB.')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
</script>



