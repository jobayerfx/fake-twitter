import colors from 'vuetify/es5/util/colors'
export default {
  head: {
    titleTemplate: '%s - fake-twitter',
    title: 'fake-twitter',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [],

  plugins: ['@/plugins/axios', '@/plugins/globalPlugins.js'],

  components: true,

  buildModules: ['@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'vue-toastification/nuxt',
    'cookie-universal-nuxt'
  ],

  axios: {
    baseURL: process.env.API_BASEURL
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#1DA1F2',
          secondaryBlack: '#14171A',
          secondaryDarkGray: '#657786',
          secondaryLightGray: '#AAB8C2',
          secondaryExtraLightGray: '#E1E8ED',
          secondaryExtraExtraLightGray: '#F5F8FA',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          errorPink: '#FBDEE7',
          error: colors.red.darken1,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {},
  auth: {
    plugins: ['~/plugins/axios', '~/plugins/auth.js'],
    redirect: {
      login: '/',
      logout: '/login',
      callback: '/login',
      home: '/home'
    },
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/me', method: 'get' }
        }
      }
    }
  },

  pageTransition: 'fade-transition',
  router: {
    middleware: ['auth']
  }
}
