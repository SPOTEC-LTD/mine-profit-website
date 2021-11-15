import en from './locales/en-US.json';
import zh from './locales/zh-CN.json';
import zh_Hant from './locales/zh_Hant.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import de from './locales/de.json';
import ru from './locales/ru.json';
import it from './locales/it.json';
import ar from './locales/ar.json';

export const EN = 'en-US';
export const ZH = 'zh-CN';
export const ZH_TW = 'zh-TW';
export const KO = 'ko-KR';
export const JA = 'ja-JP';
export const ES = 'es-ES';
export const FR = 'fr-FR';
export const PT = 'pt-PT';
export const DE = 'de-DE';
export const RU = 'ru-RU';
export const IT = 'it-IT';
export const AR = 'ar-sa';

export const languages = {
  [EN]: EN,
  [ZH]: ZH,
  [ZH_TW]: ZH_TW,
  [KO]: KO,
  [JA]: JA,
  [ES]: ES,
  [FR]: FR,
  [PT]: PT,
  [DE]: DE,
  [RU]: RU,
  [IT]: IT,
  [AR]: AR,
};

export const I18N = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
    },
    {
      code: ZH,
      iso: ZH,
      name: '简体',
    },
    {
      code: ZH_TW,
      iso: ZH_TW,
      name: '繁体',
    },
    {
      code: KO,
      iso: KO,
      name: '한국인',
    },
    {
      code: JA,
      iso: JA,
      name: '日本語',
    },
    {
      code: ES,
      iso: ES,
      name: 'Español',
    },
    {
      code: FR,
      iso: FR,
      name: 'Français',
    },
    {
      code: PT,
      iso: PT,
      name: 'Português',
    },
    {
      code: DE,
      iso: DE,
      name: 'Deutsch',
    },
    {
      code: RU,
      iso: RU,
      name: 'Русский язык',
    },
    {
      code: IT,
      iso: IT,
      name: 'Italiano',
    },
    {
      code: AR,
      iso: AR,
      name: 'العربية',
    },
  ],
  defaultLocale: 'en',

  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en,
      [ZH]: zh,
      [ZH_TW]: zh_Hant,
      [KO]: ko,
      [JA]: ja,
      [ES]: es,
      [FR]: fr,
      [PT]: pt,
      [DE]: de,
      [RU]: ru,
      [IT]: it,
      [AR]: ar,
    },
  },
};
