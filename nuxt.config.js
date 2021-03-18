import { I18N } from './src/shared/intl/i18n';

const path = require('path');

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head).
  head: {
    title: 'nuxt-web-desgin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  srcDir: 'src/',
  globalName: 'app',
  css: [ ],

  // router: {
  //   middleware: 'i18n'
  // },

  // plugins: ['@/plugins/i18n.js'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    ['nuxt-i18n', I18N],
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      // config.resolve.modules.push(resolveCwd('src'));
      // config.resolve.alias['@'] = resolveCwd('src');
    },

    transpile: [/ant-design-vue/],
    extractCSS: true,
    babel: {
      babelrc: false,
      plugins: [
        ['import', { libraryName: 'ant-design-vue', style: true }], // `style: true` 会加载 less 文件
      ],
    },

    loaders: {
      less: {
        lessOptions: {
          strictMath: false,
          modifyVars: {
            'ant-prefix': 'mp',
            'primary-color': 'red'
          },
          javascriptEnabled: true,
        },
      },
    },

  },
};
