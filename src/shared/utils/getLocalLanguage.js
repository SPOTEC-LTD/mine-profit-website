import { EN, ZH } from '@@/i18n';
import locale from '@/shared/intl/utils/locale';

export const getIsEnglish = () => locale.currentLocale === EN;
export const getIsChinese = () => locale.currentLocale === ZH;

export const getLocalLanguage = () => {
  const isEnglish = getIsEnglish();
  const localLanguage = isEnglish ? EN : ZH;
  return localLanguage;
};

export default getLocalLanguage;
