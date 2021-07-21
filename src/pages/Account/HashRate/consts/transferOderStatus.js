import locale from '@/shared/intl/utils/locale';

// 状态 1=转让中 2=已完成 3=取消确认中
export const TRANSFER_ING = 1;
export const TRANSFER_DONE = 2;
export const TRANSFER_CANCEL = 3;

export const getTransferStatusMap = status => {
  const statusMap = {
    [TRANSFER_ING]: locale.t('transferStatusTransfering'), // '转让中 ···',
    [TRANSFER_DONE]: locale.t('transferStatusDone'), // '已完成 ✓',
    [TRANSFER_CANCEL]: locale.t('transferStatusConfirming'), // '取消确认中 ···',
  };
  return statusMap[status] || statusMap;
};
