import locale from '@/shared/intl/utils/locale';

export const SEND_ERROR = 1; // 发放错误
export const VIOLATION_OBTAIN = 2; // 违规获得
export const OTHER_REASON = 3; // 其他原因
export const EXPIRE = 4; // 临时算力到期
export const HASHRATE_PRICE_LOWER = 5; // 算力价值过低产出不能支付成本

export const getShutDownReasonMap = statusValue => {
  const messageMap = {
    [SEND_ERROR]: locale.t('hashrateShutDownReasonOne'),
    [VIOLATION_OBTAIN]: locale.t('hashrateShutDownReasonTwo'),
    [OTHER_REASON]: locale.t('hashrateShutDownReasonThree'),
    [EXPIRE]: locale.t('hashrateShutDownReasonFour'),
    [HASHRATE_PRICE_LOWER]: locale.t('hashrateShutDownReasonFive'),
  };

  return messageMap[statusValue] || locale.t('investNoReason');
};
