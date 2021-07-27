import locale from '@/shared/intl/utils/locale';

export const COUPON_ALL = '';
export const COUPON_UNUSED = 'UNUSED';
export const COUPON_USED = 'USED';
export const COUPON_EXPIRE = 'EXPIRE';

export function getCouponsTypesList() {
  return [
    { name: locale.t('allStatus'), value: COUPON_ALL },
    { name: locale.t('unused'), value: COUPON_UNUSED },
    { name: locale.t('used'), value: COUPON_USED },
    { name: locale.t('expired'), value: COUPON_EXPIRE },
  ];
}

export function getCouponsTypes(status) {
  const statusMap = {
    [COUPON_ALL]: locale.t('allStatus'),
    [COUPON_UNUSED]: locale.t('unused'),
    [COUPON_USED]: locale.t('used'),
    [COUPON_EXPIRE]: locale.t('expired'),
  };
  return statusMap[status];
}
