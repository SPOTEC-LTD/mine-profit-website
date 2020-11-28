import en from '../../locales/en-US.js'
import zh from '../../locales/zh-CN.js'

export const I18N = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English'
    },
    {
      code: 'zh',
      iso: 'zh-CN',
      name: '中文'
    }
  ],
  defaultLocale: 'en',
  // routes: {
  //   about: {
  //     zh: '/a-propos',
  //     en: '/about-us'
  //   },
  //   posts: {
  //     zh: '/articles'
  //   },
  //   'post/_id': {
  //     zh: '/article/:id?',
  //     es: '/articulo/:id?'
  //   },
  //   'dynamicNested/_category': {
  //     zh: 'imbrication-dynamique/:category'
  //   }
  // },
  vueI18n: {
    fallbackLocale: 'en',
    messages: { en, zh }
  }
}
