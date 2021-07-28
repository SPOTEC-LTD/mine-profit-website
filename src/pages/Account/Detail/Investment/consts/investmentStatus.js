import locale from '@/shared/intl/utils/locale';

export const ALL = null;
export const GAINING = 1;
export const SETTLED = 2;

export const getInvestStatusMap = value => {
  const statusMap = {
    [ALL]: locale.intl.t('typeAll'),
    [GAINING]: `${locale.intl.t('typeInRevenue')} ···`,
    [SETTLED]: `${locale.intl.t('typeSettled')} ✓`,
  };

  return statusMap[value] || statusMap;
};
