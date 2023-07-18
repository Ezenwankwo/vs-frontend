// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['nuxt-gtag', { id: 'G-QKF4WH7SYY' }],
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/eslint-module', { lintOnStart: false }],
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    ['@nuxtjs/i18n', {}],
    [
      '@nuxtjs/device',
      {
        refreshOnResize: true,
      },
    ],
    ['@nuxtjs/robots', {}],
    ['@nuxt/image', {}],
    '@nuxtjs/color-mode',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Lora: true,
          'Open+Sans': true,
        },
      },
    ],
    'nuxt-icon',
    '@formkit/nuxt',
    'nuxt-headlessui',
    'nuxt-security',
    ['@dargmuesli/nuxt-cookie-control', {}],
    'dayjs-nuxt',
  ],
})
