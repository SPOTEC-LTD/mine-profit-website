import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Help from '@/pages/help';
import NewsAnnouncement from '@/pages/newsAnnouncement';
import RecommendDetail from '@/pages/newsAnnouncement/recommend/detail';
import QuestionDetail from '@/pages/help/detail';
import NotFound from '@/pages/404';
import { location } from '@/shared/services/location';
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
        path: '/login',
        name: 'login',
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
        path: '/questionDetail/:id',
        name: 'questionDetail',
        component: QuestionDetail,
      },
      {
        path: '*',
        component: NotFound,
      },
    ]),
  });

  location.initialize(router);
  return router;
}
