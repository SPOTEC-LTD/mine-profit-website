import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Help from '@/pages/help';
import NewsAnnouncement from '@/pages/newsAnnouncement';
import RecommendDetail from '@/pages/newsAnnouncement/recommend/detail';
import AnnouncementDetail from '@/pages/newsAnnouncement/announcement/detail';
import QuestionDetail from '@/pages/help/detail';
import NotFound from '@/pages/404';
import MeetError from '@/pages/500';
import Download from '@/pages/download';
import { location } from '@/shared/services/location';
import Ecosphere from '@/pages/ecosphere';
import { buildRoutes } from './utils';

Vue.use(Router);

export function createRouter() {
  // route name 必须定义且唯一

  const router = new Router({
    mode: 'history',
    routes: buildRoutes([
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/ecosphere',
        name: 'ecosphere',
        component: Ecosphere,
      },
      {
        path: '/loginTest',
        name: 'loginTest',
        component: Login,
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
