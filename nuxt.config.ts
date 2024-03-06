// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    ['nuxt-gtag', { id: 'G-QKF4WH7SYY' }],
    ['@nuxtjs/eslint-module', { lintOnStart: false }],
    ['@nuxtjs/i18n', {}],
    [
      '@nuxtjs/device',
      {
        refreshOnResize: true,
      },
    ],
    ['@nuxtjs/robots', {}],
    ['@nuxt/image', {}],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Nanum+Gothic': true,
          Lato: true,
          Inter: true,
        },
      },
    ],
    'nuxt-security',
    ['@dargmuesli/nuxt-cookie-control', {}],
    'dayjs-nuxt',
  ],
})
