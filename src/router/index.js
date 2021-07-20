import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Sign/Login';
import Home from '@/pages/home';
import Help from '@/pages/help';
import NewsAnnouncement from '@/pages/newsAnnouncement';
import RecommendDetail from '@/pages/newsAnnouncement/Recommend/detail';
import AnnouncementDetail from '@/pages/newsAnnouncement/Announcement/detail';
import QuestionDetail from '@/pages/help/Detail';
import NotFound from '@/pages/404';
import MeetError from '@/pages/500';
import Download from '@/pages/download';
import { location } from '@/shared/services/location';
import Ecosphere from '@/pages/ecosphere';
import { buildRoutes } from './utils';
import accountRoutes from './accountRoutes';

import { homePath, loginPath } from './consts/urls';

Vue.use(Router);

export function createRouter() {
  // route name 必须定义且唯一

  const router = new Router({
    mode: 'history',
    routes: buildRoutes([
      {
        path: loginPath,
        name: 'login',
        component: Login,
      },
      ...accountRoutes,
      {
        path: homePath,
        name: 'home',
        component: Home,
      },
      {
        path: '/ecosphere',
        name: 'ecosphere',
        component: Ecosphere,
      },
      {
        path: '/help',
        name: 'help',
        component: Help,
      },
      {
        path: '/newsAnnouncement',
        name: 'newsAnnouncement',
        component: NewsAnnouncement,
      },
      {
        path: '/recommendDetail/:id',
        name: 'recommendDetail',
        component: RecommendDetail,
      },
      {
        path: '/announcementDetail/:id',
        name: 'announcementDetail',
        component: AnnouncementDetail,
      },
      {
        path: '/questionDetail/:id',
        name: 'questionDetail',
        component: QuestionDetail,
      },
      {
        path: '/download',
        name: 'download',
        component: Download,
      },
      {
        path: '/500',
        name: '500',
        component: MeetError,
      },
      {
        path: '*',
        name: '404',
        component: NotFound,
      },
    ]),
  });

  location.initialize(router);
  return router;
}
