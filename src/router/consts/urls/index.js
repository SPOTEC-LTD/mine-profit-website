// ===== mainPaths
export const homePath = '/';
export const loginPath = '/sign/login';
export const downloadPath = '/download';
export const bannerDetailPath = '/bannerDetail/:id/:userId';

// ==== accountPaths
export const accountDetailPath = '/account';
export const accountOrdersPath = `${accountDetailPath}/orders`;
export const accountHashRateListPath = `${accountDetailPath}/hashrateList`;
export const hashRateTurnOnPath = `${accountDetailPath}/hashRateTurnOn/:productTemplateId`;
export const transferHashratePath = `${accountDetailPath}/transferHashrate/:productTemplateId`;
export const pledgeHashratePath = `${accountDetailPath}/pledgePageTitle/:productTemplateId`;
export const bindInvitationCodePath = `${accountDetailPath}/inputInviteCodeBind`;
export const hashRateCouponsPath = `${accountDetailPath}/hashRateCoupons`;
export const bindPhonePath = `${accountDetailPath}/bindPhone`;
export const bindEmailPath = `${accountDetailPath}/bindEmail`;
export const setDealPasswordPath = `${accountDetailPath}/dealPasswordSet`;
export const setLoginPasswordPath = `${accountDetailPath}/loginPasswordSet`;
export const realNameAuthPath = `${accountDetailPath}/realNameAuth`;
export const transactionsPath = `${accountDetailPath}/transactions`;
export const depositPath = `${accountDetailPath}/walletAllTypesCharge`;
export const addressPath = `${accountDetailPath}/withdrawAddressManagement`;
export const pledgeRepaymentPath = `${accountDetailPath}/payTypeRepay/:id`;
export const pledgeRedeemPath = `${accountDetailPath}/payTypeRedeem/:id`;
export const withdrawPath = `${accountDetailPath}/walletAllTypesCarry`;
export const buyBackPath = `${accountDetailPath}/buyBack`;
export const pledgeHelpPath = `${accountDetailPath}/pledgeHelp/:userId`;

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
export const productTemplatePath = `${officialMarketingPath}/productTemplate/:id`;
export const c2cDetailsPath = `${c2cMarketingPath}/marketHashDetail/:id`;
export const officialSettlementPath = `${officialDetailsPath}/marketConfirmSettle/:ptId`;
export const c2cSettlementPath = `${c2cDetailsPath}/marketConfirmSettle`;

// ==== rankPaths

export const activityPath = '/activity';
export const rankPath = '/rank';
export const historyRankPath = '/historyRank';
export const activityContentPath = '/activityH5Path/:id/:userId';
export const noviceBenefitsPath = '/activity/noviceBenefits';

// ===== protocolPaths
export const investProtocolPath = '/investProtocol';
export const privacyProtocolPath = '/privacyProtocol';
export const serviceProtocolPath = '/serviceProtocol';

// ===== helpPaths
export const helpPath = '/help';
export const questionDetailPath = '/questionDetail/:id';

// ===== platformCurrencyPaths

export const platformCurrencyPath = '/platformCurrency';
export const platformCurrencyDetailPath = '/platformCurrencyDetail';
