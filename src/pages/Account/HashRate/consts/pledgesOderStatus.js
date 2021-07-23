import locale from '@/shared/intl/utils/locale';
// ：1->待认购,2->质押中,3->结算待确认,4->已结算,6->已还款
export const WAIT_BUY = 1; // 待认购
export const PLEDGES_ING = 2; // 质押中
export const BALANCE_PENDING = 3; // 结算待确认
export const SETTLE_ACCOUNTS = 4; // 已结算
export const CANCEL = 5;
export const END_REPAYMENT = 6; // 已还款

export const getPledgeOderStatusMap = value => {
  const mapValue = {
    [WAIT_BUY]: `${locale.t('pledgeStatusWaitBuy')} ···`,
    [PLEDGES_ING]: `${locale.t('pledgeStatusPledging')} ···`,
    [BALANCE_PENDING]: `${locale.t('pledgeStatusWaitConfirm')} ···`,
    [SETTLE_ACCOUNTS]: `${locale.t('pledgeStatusSettled')} ✓`,
    [END_REPAYMENT]: `${locale.t('pledgeStatusRepayed')} ✓`,

  };
  return mapValue[value] || mapValue;
};

export const getPledgesOderStatusList = () => [
  {
    value: null,
    text: locale.t('all'),
  },
  {
    value: WAIT_BUY,
    text: locale.t('pledgeStatusWaitBuy'),
  },
  {
    value: PLEDGES_ING,
    text: locale.t('pledgeStatusPledging'),
  },
  {
    value: BALANCE_PENDING,
    text: locale.t('pledgeStatusWaitConfirm'),
  },
  {
    value: SETTLE_ACCOUNTS,
    text: locale.t('pledgeStatusSettled'),
  },
  {
    value: END_REPAYMENT,
    text: locale.t('pledgeStatusRepayed'),
  },
];
