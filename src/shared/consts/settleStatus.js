import locale from '@/shared/intl/utils/locale';

export const INVEST_RISK = 1; // 风控结算
export const INVEST_REDEEM = 2; // 赎回
export const INVEST_REPAY = 3; // 到期还款
export const INVEST_BREAK_CONTRACT = 4; // 违约结算
export const INVEST_OUTPUT_LOW = 5; // 产出无法支付利息

export const getSettleStatusMessage = statusValue => {
  const messageMap = {
    [INVEST_RISK]: locale.t('investResonRisk'),
    [INVEST_REDEEM]: locale.t('investResonRedeem'),
    [INVEST_REPAY]: locale.t('investResonRepay'),
    [INVEST_BREAK_CONTRACT]: locale.t('investResonBreakContract'),
    [INVEST_OUTPUT_LOW]: locale.t('investResonOutputLow'),
  };

  return messageMap[statusValue] || locale.t('investNoReason');
};
