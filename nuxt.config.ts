// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],

  supabase: {
    redirect: false,
    // Tornar opcional - não inicializar se não houver credenciais
    url: process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'ForteGB - Construindo sonhos e realizando vidas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'ForteGB - Projetos imobiliários de qualidade em Campinas-SP. Construindo sonhos e realizando vidas através de projetos imobiliários de qualidade.' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    // Private keys (only available on server-side)
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    hubspotApiKey: process.env.HUBSPOT_API_KEY,
    tuyaAccessId: process.env.TUYA_ACCESS_ID,
    tuyaAccessSecret: process.env.TUYA_ACCESS_SECRET,
    whatsappApiKey: process.env.WHATSAPP_API_KEY,
    whatsappApiUrl: process.env.WHATSAPP_API_URL,
    googleCalendarClientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
    googleCalendarClientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    googleCalendarRefreshToken: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
    
    // Public keys (exposed to client-side)
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      whatsappNumber: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER
    }
  }
})


