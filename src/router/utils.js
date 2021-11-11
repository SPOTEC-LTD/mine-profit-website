import locale from '@/shared/intl/utils/locale';
import { I18N } from '@@/i18n';

export const buildRoutes = routes => {
  const finallyRoutes = [];
  routes.forEach(route => {
    I18N.locales.forEach(({ code }) => {
      let finallyPath = route.path;
      let { redirect } = route;

      if (I18N.defaultLocale !== code) {
        finallyPath = `/${code}${finallyPath}`;
        redirect = `/${code}${route.redirect}`;
      }

      finallyRoutes.push({
        ...route,
        // redirect,
        meta: { ...route.meta, path: route.path },
        component: route.component,
        path: finallyPath,
        name: `${route.name}___${code}`,
      });
    });
  });

  return finallyRoutes;
};
