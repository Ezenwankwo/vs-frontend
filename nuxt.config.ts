// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-gtag',
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/eslint-module', { lintOnStart: false }],
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@nuxtjs/i18n',
      {
        /* module options */
      },
    ],
    [
      '@nuxtjs/device',
      {
        refreshOnResize: true,
      },
    ],
    [
      '@nuxtjs/robots',
      {
        /* module options */
      },
    ],
  ],
  gtag: { id: 'G-QKF4WH7SYY' },
})
