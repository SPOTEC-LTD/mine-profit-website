import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from '@/locales/en-US.js';
import zhCN from '@/locales/zh-CN.js'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      en: enUS,
      zh: zhCN
    }
  })


  app.i18n.path = (link) => {
    console.log('link', link);

    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${app.i18n.locale}/${link}`
  }
}
