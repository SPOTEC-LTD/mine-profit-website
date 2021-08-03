// ===== mainPaths
export const homePath = '/';
export const loginPath = '/sign/login';
export const downloadPath = '/download';
export const rankPath = '/rank';

// ==== accountPaths
export const accountPath = '/account';
export const accountDetailPath = `${accountPath}/detail`;
export const accountOrdersPath = `${accountPath}/orders`;
export const accountHashRateListPath = `${accountPath}/hashrateList`;
export const hashRateTurnOnPath = `${accountPath}/hashRateTurnOn/:productTemplateId`;
export const transferHashratePath = `${accountPath}/transferHashrate/:productTemplateId`;
export const bindInvitationCodePath = `${accountPath}/bindInvitationCode`;
export const hashRateCouponsPath = `${accountPath}/hashRateCoupons`;
export const bindPhonePath = `${accountPath}/bindPhone`;
export const bindEmailPath = `${accountPath}/bindEmail`;
export const setDealPasswordPath = `${accountPath}/dealPasswordSet`;
export const setLoginPasswordPath = `${accountPath}/loginPasswordSet`;
export const realNameAuthPath = `${accountPath}/realNameAuth`;
export const transactionsPath = `${accountPath}/transactions`;
export const depositPath = `${accountPath}/walletAllTypesCharge`;

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
export const officialDetailsPath = `${officialMarketingPath}/marketHashDetail`;
export const c2cDetailsPath = `${c2cMarketingPath}/marketHashDetail`;
