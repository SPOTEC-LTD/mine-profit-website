import locale from '@/shared/intl/utils/locale';

/** 所有类型 */
// export const WALLET_TYPE_ALL = '';
/** 所有状态，所有类型 */
export const ALL = '';
export const PROGRESSING = 1;
export const FAIL = 2;
export const SUCCESS = 3;

export const getLedgerStatusList = () => ([
  { text: locale.t('walletStatusAll'), value: ALL },
  { text: locale.t('walletStatusOngoing'), value: PROGRESSING },
  { text: locale.t('walletStatusFailure'), value: FAIL },
  { text: locale.t('walletStatusSuccess'), value: SUCCESS },
]);
