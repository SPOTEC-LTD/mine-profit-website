import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Sign/Login';
import Home from '@/pages/home';
import Help from '@/pages/help';
import QuestionDetail from '@/pages/help/QuestionDetail';
import NotFound from '@/pages/404';
import MeetError from '@/pages/500';
import Download from '@/pages/download';
import { location } from '@/shared/services/location';
import AboutUs from '@/pages/AboutUs';
import Rank from '@/pages/Rank';
import HistoryRank from '@/pages/Rank/HistoryRank';
import BannerDetail from '@/pages/home/BannerDetail';
import { buildRoutes } from './utils';
import accountRoutes from './accountRoutes';
import newsRoutes from './newsRoutes';
import productMarketingRoutes from './productMarketingRoutes';
import protocolRoutes from './protocolRoutes';
import * as urls from './consts/urls';

import { homePath, loginPath } from './consts/urls';

Vue.use(Router);

export function createRouter() {
  // route name 必须定义且唯一

  const router = new Router({
    mode: 'history',
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
    routes: buildRoutes([
      {
        path: loginPath,
        name: 'login',
        meta: { hiddenFooter: true },
        component: Login,
      },
      ...accountRoutes,
      ...newsRoutes,
      ...productMarketingRoutes,
      ...protocolRoutes,
      {
        path: homePath,
        name: 'home',
        component: Home,
      },
      {
        path: urls.aboutUsPaths,
        name: 'aboutUs',
        component: AboutUs,
      },
      {
        path: '/help',
        name: 'helpCenter',
        component: Help,
      },
      {
        path: '/questionDetail/:id',
        name: 'questionDetail',
        component: QuestionDetail,
      },
      {
        path: '/download',
        name: 'download',
        meta: { hiddenFooter: true },
        component: Download,
      },
      {
        path: urls.rankPath,
        name: 'rank',
        component: Rank,
      },
      {
        path: urls.historyRankPath,
        name: 'historyRank',
        component: HistoryRank,
      },
      {
        path: urls.bannerDetailPath,
        name: 'bannerDetail',
        component: BannerDetail,
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
