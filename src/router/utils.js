import { I18N } from '@/shared/intl/i18n';

export const buildRoutes = routes => {
  const finallyRoutes = [];
  routes.forEach(route => {
    I18N.locales.forEach(({ code }) => {
      let finallyPath = route.path;
      if (I18N.defaultLocale !== code) {
        finallyPath = `/${code}${finallyPath}`;
      }

      finallyRoutes.push({
        ...route,
        meta: { ...route.meta, path: route.path },
        component: route.component,
        path: finallyPath,
        name: `${route.name}___${code}`,
      });
    });
  });

  return finallyRoutes;
};
