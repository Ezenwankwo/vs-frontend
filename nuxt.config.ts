// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
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
          Inter: true,
          Lato: true,
        },
      },
    ],
    'nuxt-security',
    ['@dargmuesli/nuxt-cookie-control', {}],
    'dayjs-nuxt',
  ],
  ui: {
    icons: ['heroicons', 'tabler'],
  },
  runtimeConfig: {
    public: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
  },
  experimental: {
    asyncContext: true,
  },
  security: {
    headers: {
      contentSecurityPolicy: false,
    },
  },
})
