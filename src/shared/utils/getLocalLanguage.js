import { EN } from '@/shared/intl/i18n';
import { CN, US } from '@/shared/intl/consts/languages';
import dateUtils from '@/shared/intl/utils/dateUtils';

export const getLocalLanguage = () => {
  const isEnglish = dateUtils.locale === EN;
  const locale = isEnglish ? US : CN;
  return locale;
};

export default getLocalLanguage;
