import locale from '@/shared/intl/utils/locale';

export const WALLET_STATUS_ALL = '';
export const PROGRESSING = 1;
export const FAIL = 2;
export const SUCCESS = 3;

export const getLedgerStatusList = () => ([
  { text: locale.t('walletStatusAll'), value: WALLET_STATUS_ALL },
  { text: locale.t('walletStatusOngoing'), value: PROGRESSING },
  { text: locale.t('walletStatusFailure'), value: FAIL },
  { text: locale.t('walletStatusSuccess'), value: SUCCESS },
]);
