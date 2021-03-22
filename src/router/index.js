import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Help from '@/pages/help';

Vue.use(Router);

export function createRouter() {
  return new Router({
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
    ],
  });
}
