// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/reports.css'
  ],
  runtimeConfig: {
    dostawyPassword: process.env.DOSTAWY_PASSWORD,
    magazynPassword: process.env.MAGAZYN_PASSWORD,
    spedycjaPassword: process.env.SPEDYCJA_PASSWORD,
    adminPassword:process.env.ADMIN_PASSWORD
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pl'
      },
      title: 'System Raportów',
      link: [
        {
          rel: 'icon', type: 'image/png', href: '/ikona.png',

        }
      ]
    }
  }

})