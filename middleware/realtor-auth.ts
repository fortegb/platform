export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()
  
  // Verificar se o usuário está autenticado
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return navigateTo('/login')
  }

  // Verificar se o usuário é um corretor
  const { data: realtor, error } = await supabase
    .from('realtors')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error || !realtor) {
    return navigateTo('/login')
  }
})



