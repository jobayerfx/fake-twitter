import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  ssr: 'false',
  target: 'static',
  generate: {
    fallback: true
  },
  server: {
    port: process.env.PORT || 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Fake Twitter',
    title: 'Fake Twitter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~layouts/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/globalPlugins.js',
    '@/plugins/axios.js',
    '~/plugins/echarts.js',
    { src: '~plugins/vueEditor.js', mode: 'client', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/dotenv', { path: './' }],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'vue2-editor/nuxt', // doesnt work with ssr false, use plugin to load
    'vue-toastification/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASEURL
  },

  publicRuntimeOptions: {
    apiBaseURL: process.env.API_BASEURL
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // defaultValue : false,
    treeShake: true,
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#B29C73',
          light: '#F5F3EE',
          background: '#E5E5E5',
          accent: '#8C8E9B',
          secondary: '#6D7079',
          accentlight: '#E5E5E5',
          secondarylight: '#E0E3EB',
          info: '#00ACEA',
          infolight: '#F7F7F7',
          active: '#7D85A1'
        }
      }
    }
  },

  auth: {
    // plugins: [{ src: '~/plugins/axios', ssr: true },],
    // watchLoggedIn: true,
    // rewriteRedirects: true,

    plugins: ['~/plugins/axios', '~/plugins/auth.js'],
    redirect: {
      login: '/auth',
      logout: '/auth',
      callback: '/auth',
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
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get' }
        }
      }
    }
  },

  router: {
    middleware: ['auth', 'checkPermission']
  }
}
