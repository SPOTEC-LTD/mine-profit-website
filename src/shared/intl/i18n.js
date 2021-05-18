import en from '../../locales/en-US.json';
import zh from '../../locales/zh-CN.json';

export const EN = 'en';
export const ZH = 'zh';

export const I18N = {
  locales: [
    {
      code: EN,
      iso: 'en-US',
      name: 'English',
    },
    {
      code: ZH,
      iso: 'zh-CN',
      name: '中文',
    },
  ],
  defaultLocale: ZH,

  vueI18n: {
    fallbackLocale: ZH,
    messages: { en, zh },
  },
};
