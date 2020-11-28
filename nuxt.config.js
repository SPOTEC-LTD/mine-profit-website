import { I18N } from './shared/intl/i18n';

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-web-desgin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  // router: {
  //   middleware: 'i18n'
  // },

  // plugins: ['@/plugins/i18n.js'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    ['nuxt-i18n', I18N],
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/ant-design-vue/],
    extractCSS: true,
    babel: {
      babelrc: true
    },

    loaders: {
      less: {
        lessOptions: {
          strictMath: false,
          javascriptEnabled: true,
        },
      }
    }

  }
}
