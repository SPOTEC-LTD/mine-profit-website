import en from '../../locales/en-US';
import zh from '../../locales/zh-CN';

export const I18N = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
    },
    {
      code: 'zh',
      iso: 'zh-CN',
      name: '中文',
    },
  ],
  defaultLocale: 'zh',

  vueI18n: {
    fallbackLocale: 'zh',
    messages: { en, zh },
  },
};
