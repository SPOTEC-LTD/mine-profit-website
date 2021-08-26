import createAPI from '@/shared/utils/request/createAPI';

export const getGoodNewsList = createAPI('get', '/operation/news/text');
export const fetchGoodNewsDetail = createAPI('get', '/operation/news/text/:id');
export const getNewsletterList = createAPI('get', '/operation/news/express');
export const getAnnouncementList = createAPI('get', '/operation/announcements/app');
export const fetchQuestionList = createAPI('get', '/operation/questions/app');
export const fetchQuestionDetail = createAPI('get', '/operation/questions/:id');
export const fetchAnnouncementDetail = createAPI('get', '/operation/announcements/:id');
export const getMineDatalist = createAPI('get', '/wallet/market/website/coins');
export const getZendesk = createAPI('get', '/sys/api/config/zendesk');
export const fetchAppVersion = createAPI('get', '/sys/app/version/current');
export const fetchBizSocialInfo = createAPI('get', '/sys/basis/biz/other');
export const getMarketsList = createAPI('get', '/wallet/market/app/coins');
