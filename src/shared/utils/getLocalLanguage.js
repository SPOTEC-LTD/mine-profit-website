import { EN, ZH } from '@/shared/intl/i18n';
import { CN, US } from '@/shared/intl/consts/languages';
import locale from '@/shared/intl/utils/locale';

export const getIsEnglish = () => locale.currentLocale.locale === EN;
export const getIsChinese = () => locale.currentLocale.locale === ZH;

export const getLocalLanguage = () => {
  const isEnglish = getIsEnglish();
  const localLanguage = isEnglish ? US : CN;
  return localLanguage;
};

export default getLocalLanguage;
