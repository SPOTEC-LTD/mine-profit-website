// ===== mainPaths
export const homePath = '/';
export const loginPath = '/sign/login';
export const downloadPath = '/download';

// ==== accountPaths
export const accountPath = '/account';
export const accountDetailPath = `${accountPath}/detail`;
export const accountOrdersPath = `${accountPath}/orders`;
export const accountHashRateListPath = `${accountPath}/hashrateList`;
export const hashRateTurnOnPath = `${accountPath}/hashRateTurnOn/:productTemplateId`;
export const transferHashratePath = `${accountPath}/transferHashrate/:productTemplateId`;
export const pledgeHashratePath = `${accountPath}/pledgePageTitle/:productTemplateId`;
export const bindInvitationCodePath = `${accountPath}/bindInvitationCode`;
export const hashRateCouponsPath = `${accountPath}/hashRateCoupons`;
export const bindPhonePath = `${accountPath}/bindPhone`;
export const bindEmailPath = `${accountPath}/bindEmail`;
export const setDealPasswordPath = `${accountPath}/dealPasswordSet`;
export const setLoginPasswordPath = `${accountPath}/loginPasswordSet`;
export const realNameAuthPath = `${accountPath}/realNameAuth`;
export const transactionsPath = `${accountPath}/transactions`;
export const depositPath = `${accountPath}/walletAllTypesCharge`;
export const addressPath = `${accountPath}/withdrawAddressManagement`;
export const pledgeRepaymentPath = `${accountPath}/payTypeRepay/:id`;
export const pledgeRedeemPath = `${accountPath}/payTypeRedeem/:id`;
export const withdrawPath = `${accountPath}/walletAllTypesCarry`;

// ==== aboutUsPaths
export const aboutUsPaths = '/aboutUs';

// ==== newsPaths
export const newsPath = '/news';
export const newsAnnouncementPath = `${newsPath}/newsAnnouncement`;
export const recommendDetailPath = `${newsPath}/recommendDetail/:id`;
export const announcementDetailPath = `${newsPath}/announcementDetail/:id`;

// ==== officialMarketingPaths
export const marketingPaths = '/hashRateMarket';
export const officialMarketingPath = `${marketingPaths}/officialMarketing`;
export const c2cMarketingPath = `${marketingPaths}/marketC2CMarket`;
export const officialDetailsPath = `${officialMarketingPath}/marketHashDetail/:id`;
export const c2cDetailsPath = `${c2cMarketingPath}/marketHashDetail`;
export const officialSettlementPath = `${officialDetailsPath}/marketConfirmSettle/:ptId`;
export const c2cSettlementPath = `${c2cDetailsPath}/marketConfirmSettle`;

// ==== rankPaths
export const rankPath = '/rank';
export const historyRankPath = '/historyRank';
