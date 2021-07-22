import NewsAnnouncement from '@/pages/newsAnnouncement';
import RecommendDetail from '@/pages/newsAnnouncement/Recommend/detail';
import AnnouncementDetail from '@/pages/newsAnnouncement/Announcement/detail';
import * as urls from './consts/urls';

export default [
  {
    path: urls.newsAnnouncementPath,
    name: 'newsAnnouncement',
    component: NewsAnnouncement,
  },
  {
    path: urls.recommendDetailPath,
    name: 'recommendDetail',
    component: RecommendDetail,
  },
  {
    path: urls.announcementDetailPath,
    name: 'announcementDetail',
    component: AnnouncementDetail,
  },
];
