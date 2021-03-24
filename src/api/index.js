import createAPI from '@/shared/utils/request/createAPI';

export const getGoodNewsList = createAPI('get', '/operation/news/:type/page');
export const fetchGoodNewsDetail = createAPI('get', '/operation/news/text/:id');
export const getNewsletterList = createAPI('get', '/operation/news/:type/page');
export const getAnnouncementList = createAPI('get', '/operation/announcements/admin');
export const fetchQuestionList = createAPI('get', '/operation/questions/admin');
export const fetchQuestionDetail = createAPI('get', '/operation/questions/:id');
