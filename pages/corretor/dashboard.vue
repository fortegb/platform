<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Dashboard</h1>
      <button @click="handleLogout" class="btn btn-outline">
        Sair
      </button>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-primary-500">Total de Leads</h2>
          <p class="text-4xl font-bold">{{ stats.totalLeads }}</p>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-success">Leads Ativos</h2>
          <p class="text-4xl font-bold">{{ stats.activeLeads }}</p>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-warning">Em Negociação</h2>
          <p class="text-4xl font-bold">{{ stats.negotiating }}</p>
        </div>
      </div>
    </div>

    <!-- Ações Rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <NuxtLink to="/corretor/leads/novo" class="card bg-primary-500 text-primary-content shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
          <h2 class="card-title">Registrar Novo Lead</h2>
          <p>Cadastre um novo lead e garanta sua comissão</p>
        </div>
      </NuxtLink>
      
      <NuxtLink to="/corretor/casas" class="card bg-secondary text-secondary-content shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
          <h2 class="card-title">Ver Casas Disponíveis</h2>
          <p>Consulte todas as propriedades disponíveis</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Leads Recentes -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Leads Recentes</h2>
          <NuxtLink to="/corretor/leads" class="btn btn-sm btn-outline">
            Ver Todos
          </NuxtLink>
        </div>
        
        <div v-if="loading" class="text-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        
        <div v-else-if="recentLeads.length === 0" class="text-center py-8 text-base-content/70">
          Nenhum lead registrado ainda.
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Casa</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lead in recentLeads" :key="lead.id">
                <td>{{ lead.name }}</td>
                <td>{{ lead.phone }}</td>
                <td>{{ lead.house_title || '-' }}</td>
                <td>
                  <span class="badge" :class="getStatusBadgeClass(lead.status)">
                    {{ formatStatus(lead.status) }}
                  </span>
                </td>
                <td>{{ formatDate(lead.created_at) }}</td>
                <td>
                  <NuxtLink :to="`/corretor/leads/${lead.id}`" class="btn btn-sm btn-ghost">
                    Ver
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'realtor-auth'
})

const loading = ref(true)
const stats = reactive({
  totalLeads: 0,
  activeLeads: 0,
  negotiating: 0
})
const recentLeads = ref<any[]>([])

onMounted(async () => {
  await loadDashboardData()
})

const loadDashboardData = async () => {
  try {
    const response = await $fetch('/api/corretor/dashboard')
    stats.totalLeads = response.stats.totalLeads
    stats.activeLeads = response.stats.activeLeads
    stats.negotiating = response.stats.negotiating
    recentLeads.value = response.recentLeads
  } catch (err) {
    console.error('Error loading dashboard:', err)
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  await navigateTo('/login')
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString))
}

const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    'new': 'Novo',
    'contacted': 'Contatado',
    'visit_scheduled': 'Visita Agendada',
    'visit_completed': 'Visita Realizada',
    'negotiating': 'Em Negociação',
    'closed_won': 'Fechado',
    'closed_lost': 'Perdido'
  }
  return statusMap[status] || status
}

const getStatusBadgeClass = (status: string) => {
  const classMap: Record<string, string> = {
    'new': 'badge-info',
    'contacted': 'badge-primary',
    'visit_scheduled': 'badge-warning',
    'visit_completed': 'badge-warning',
    'negotiating': 'badge-warning',
    'closed_won': 'badge-success',
    'closed_lost': 'badge-error'
  }
  return classMap[status] || 'badge-neutral'
}

useHead({
  title: 'Dashboard - Portal do Corretor'
})
</script>



