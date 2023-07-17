// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-gtag',
    '@nuxtjs/tailwindcss'
  ],
  gtag: { id: 'G-QKF4WH7SYY' }
})
