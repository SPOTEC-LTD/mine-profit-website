import createAPI from '@/shared/utils/request/createAPI';

export const getGoodNewsList = createAPI('get', '/operation/news/:type/page');
export const fetchGoodNewsDetail = createAPI('get', '/operation/news/text/:id');
export const getNewsletterList = createAPI('get', '/operation/news/:type/page');
export const getAnnouncementList = createAPI('get', '/operation/announcements/admin');
export const fetchQuestionList = createAPI('get', '/operation/questions/admin');
export const fetchQuestionDetail = createAPI('get', '/operation/questions/:id');
export const fetchAnnouncementDetail = createAPI('get', '/operation/announcements/:id');
export const getMineDatalist = createAPI('get', '/block/market/website/coins');
export const getZendesk = createAPI('get', '/sys/api/config/zendesk');
export const fetchAppVersion = createAPI('get', '/sys/app/version/current');
export const fetchBizSocialInfo = createAPI('get', '/sys/basis/biz/other');
