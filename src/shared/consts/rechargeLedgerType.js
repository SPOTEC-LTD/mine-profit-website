import locale from '@/shared/intl/utils/locale';

export const WALLET_TYPE_ALL = ''; // 所有
export const RECHARGE = '1'; // 充币
export const WITHDRAWAL = '2'; // 提币
export const PURCHASE_POWER = '3'; // 购买算力
export const SELL_POWER = '4'; // 出售算力
export const PLEDGE_REDEMPTION = '5'; // 质押赎回
export const PLEDGE_REPAYMENT = '6'; // 质押还款
export const PLEDGE_INVESTMENT = '7'; // 投资质押
export const INVESTMENT_EARNING = '8'; // 投资收益
export const INVESTMENT_SETTLEMENT = '9'; // 投资结算
export const MINING_OUTPUT = '10'; // 挖矿产出
export const PROMOTION_AWARD = '11'; // 推广奖励

export const getLedgerTypeList = () => ([
  { text: locale.t('walletAllTypesAll'), value: WALLET_TYPE_ALL },
  { text: locale.t('walletAllTypesCharge'), value: RECHARGE },
  { text: locale.t('walletAllTypesCarry'), value: WITHDRAWAL },
  { text: locale.t('walletAllTypesBuyHashrate'), value: PURCHASE_POWER },
  { text: locale.t('walletAllTypesSaleHashrate'), value: SELL_POWER },
  { text: locale.t('walletAllTypesRedeem'), value: PLEDGE_REDEMPTION },
  { text: locale.t('walletAllTypesRepay'), value: PLEDGE_REPAYMENT },
  { text: locale.t('walletAllTypesInvestPledge'), value: PLEDGE_INVESTMENT },
  { text: locale.t('walletAllTypesInvestEarning'), value: INVESTMENT_EARNING },
  { text: locale.t('walletAllTypesInvestAccounts'), value: INVESTMENT_SETTLEMENT },
  { text: locale.t('walletAllTypesMining'), value: MINING_OUTPUT },
  { text: locale.t('walletAllTypesAward'), value: PROMOTION_AWARD },
]);

export const getLedgerTypeMap = ledgerType => {
  const ledgerTypeMap = {
    [RECHARGE]: locale.t('walletAllTypesCharge'),
    [WITHDRAWAL]: locale.t('walletAllTypesCarry'),
    [PURCHASE_POWER]: locale.t('walletAllTypesBuyHashrate'),
    [SELL_POWER]: locale.t('walletAllTypesSaleHashrate'),
    [PLEDGE_REDEMPTION]: locale.t('walletAllTypesRedeem'),
    [PLEDGE_REPAYMENT]: locale.t('walletAllTypesRepay'),
    [PLEDGE_INVESTMENT]: locale.t('walletAllTypesInvestPledge'),
    [INVESTMENT_EARNING]: locale.t('walletAllTypesInvestEarning'),
    [INVESTMENT_SETTLEMENT]: locale.t('walletAllTypesInvestAccounts'),
    [MINING_OUTPUT]: locale.t('walletAllTypesMining'),
    [PROMOTION_AWARD]: locale.t('walletAllTypesAward'),
  };
  return ledgerTypeMap[ledgerType];
};
