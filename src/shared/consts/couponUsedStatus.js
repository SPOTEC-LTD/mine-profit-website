import locale from '@/shared/intl/utils/locale';
/// 当前状态：1->未使用,2->已使用,3->已关机,4->已失效
export const ALL_STATUS = null;
export const UNUSED = 1;
export const USED = 2;
export const POWER_OFF = 3;
export const EXPIRE = 4;

export function getCouponsStatusList() {
  return [
    { name: locale.t('allStatus'), value: ALL_STATUS },
    { name: locale.t('unused'), value: UNUSED },
    { name: locale.t('used'), value: USED },
    { name: locale.t('powerOff'), value: POWER_OFF },
    { name: locale.t('expired'), value: EXPIRE },
  ];
}

export function getCouponsStatus(status) {
  const statusMap = {
    [ALL_STATUS]: locale.t('allStatus'),
    [UNUSED]: locale.t('unused'),
    [USED]: locale.t('used'),
    [POWER_OFF]: locale.t('powerOff'),
    [EXPIRE]: locale.t('expired'),
  };
  return statusMap[status];
}
