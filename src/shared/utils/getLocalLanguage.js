import { EN, ZH, languages } from '@@/i18n';
import locale from '@/shared/intl/utils/locale';

export const getIsEnglish = () => locale.currentLocale === EN;
export const getIsChinese = () => locale.currentLocale === ZH;

export const getLocalLanguage = () => languages[locale.currentLocale];

export default getLocalLanguage;
