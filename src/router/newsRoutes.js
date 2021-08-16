import NewsAnnouncement from '@/pages/newsAnnouncement';
import RecommendDetail from '@/pages/newsAnnouncement/Recommend/RecommendDetail';
import AnnouncementDetail from '@/pages/newsAnnouncement/Announcement/AnnouncementDetail';
import * as urls from './consts/urls';

export default [
  {
    path: urls.newsAnnouncementPath,
    name: 'newsAnnouncement',
    component: NewsAnnouncement,
  },
  {
    path: urls.recommendDetailPath,
    name: 'goodNewsDetail',
    component: RecommendDetail,
  },
  {
    path: urls.announcementDetailPath,
    name: 'announcementDetail',
    component: AnnouncementDetail,
  },
];
