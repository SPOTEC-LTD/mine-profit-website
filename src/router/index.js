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
import HistoryRank from '@/pages/Rank/HistoryRank';
import BannerDetail from '@/pages/home/BannerDetail';
import ActivityH5ContentDetails from '@/pages/Activity/H5ContentDetails';
import PlatformCurrency from '@/pages/PlatformCurrency';
import PlatformCurrencyDetail from '@/pages/PlatformCurrency/PlatformCurrencyDetail';
import { buildRoutes } from './utils';
import accountRoutes from './accountRoutes';
import newsRoutes from './newsRoutes';
import productMarketingRoutes from './productMarketingRoutes';
import protocolRoutes from './protocolRoutes';
import activityRoutes from './activityRoutes';
import * as urls from './consts/urls';

import { homePath, loginPath } from './consts/urls';

Vue.use(Router);

export const pathRoutes = [
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
  ...activityRoutes,
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
    path: urls.questionDetailPath,
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
    path: urls.historyRankPath,
    name: 'historyRank',
    component: HistoryRank,
  },
  {
    path: urls.platformCurrencyPath,
    name: 'platformCurrency',
    component: PlatformCurrency,
  },
  {
    path: urls.platformCurrencyDetailPath,
    name: 'platformCurrencyDetail',
    component: PlatformCurrencyDetail,
  },
  {
    path: urls.bannerDetailPath,
    name: 'bannerDetail',
    component: BannerDetail,
  },
  {
    path: urls.activityContentPath,
    name: 'contentDetails',
    component: ActivityH5ContentDetails,
  },
  {
    path: '/500',
    name: '500',
    component: MeetError,
  },
  {
    path: '/*',
    name: '404',
    component: NotFound,
  },
];

export function createRouter() {
  // route name 必须定义且唯一

  const router = new Router({
    mode: 'history',
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
    routes: buildRoutes(pathRoutes),
  });

  location.initialize(router);
  return router;
}
