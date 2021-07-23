/// 失效原因: 1 -> 发放错误，2 -> 违规获得，3 -> 其他原因, 4 -> 到期
import locale from '@/shared/intl/utils/locale';

export const DISTRIBUTION_ERROR = 1;
export const ILLEGAL_ACQUISITION = 2;
export const OTHER_REASONS = 3;
export const BECOME_OVERDUE = 4;

export function getExpiredReasonList() {
  return [
    { name: locale.t('hashrateShutDownReasonOne'), value: DISTRIBUTION_ERROR },
    { name: locale.t('hashrateShutDownReasonTwo'), value: ILLEGAL_ACQUISITION },
    { name: locale.t('hashrateShutDownReasonThree'), value: OTHER_REASONS },
    { name: locale.t('shareOutdate'), value: BECOME_OVERDUE },
  ];
}

export function getExpiredReason(status) {
  const statusMap = {
    [DISTRIBUTION_ERROR]: locale.t('hashrateShutDownReasonOne'),
    [ILLEGAL_ACQUISITION]: locale.t('hashrateShutDownReasonTwo'),
    [OTHER_REASONS]: locale.t('hashrateShutDownReasonThree'),
    [BECOME_OVERDUE]: locale.t('shareOutdate'),
  };
  return statusMap[status];
}
