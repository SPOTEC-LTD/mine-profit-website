import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Help from '@/pages/help';
import NewsAnnouncement from '@/pages/newsAnnouncement';
import RecommendDetail from '@/pages/newsAnnouncement/recommend/detail';
import QuestionDetail from '@/pages/help/detail';
import { location } from '@/shared/services/location';

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/help',
        component: Help,
      },
      {
        path: '/newsAnnouncement',
        component: NewsAnnouncement,
      },
      {
        path: '/recommendDetail/:id',
        component: RecommendDetail,
      },
      {
        path: '/questionDetail/:id',
        component: QuestionDetail,
      },
    ],
  });

  location.initialize(router);
  return router;
}
