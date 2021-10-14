import { I18N } from './i18n';

const path = require('path');

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

const baseAPiMap = {
  static: 'http://127.0.0.1:4008',
  dev: 'http://192.168.0.129:10000',
  test: 'http://192.168.0.126:10000',
  onlineTest: 'https://mp.testmego.com/__api',
  pro: 'http://27.102.113.188:10000',
};

const mobileSiteHostMap = {
  dev: 'http://192.168.0.129:7010',
  test: 'http://192.168.0.129:7010',
  onlineTest: 'http://h5.mp.testmego.com',
  pro: 'http://h5.mp.testmego.com',
}

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head).
  head: {
    title: '盈算力',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: '/checkBrowserVersion.js', type: 'text/javascript', charset: 'utf-8'},
    ]
  },

  telemetry:false,

  srcDir: 'src/',
  globalName: 'app',
  css: [ ],

  router: {
    middleware: 'i18n'
  },
  // plugins: ['@/plugins/i18n.js'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/svg",
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/router', {
      path: 'src/router',
      fileName: 'index.js'
    }]
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
      cssModules: {
        modules: {
          localIdentName: '[local]_[hash:base64:5]'
        }
      },
      less: {
        lessOptions: {
          strictMath: false,
          modifyVars: {
            'ant-prefix': 'mp',
            'primary-color': '#02a6e3'
          },
          javascriptEnabled: true,
        },
      },
    },
  },

  env: {
    API_TYPE: process.env.API,
    BASE_API: baseAPiMap[process.env.API],
    MOBILE_SITE_HOST: mobileSiteHostMap[process.env.API]
  }
};
