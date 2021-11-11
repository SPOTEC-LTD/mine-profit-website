import { I18N } from '@@/i18n';

export const buildRoutes = routes => {
  const finallyRoutes = [];
  routes.forEach(route => {
    I18N.locales.forEach(({ code }) => {
      finallyRoutes.push({
        ...route,
        meta: { ...route.meta, path: route.path },
        component: route.component,
        path: `/${code}${route.path}`,
        name: `${route.name}___${code}`,
      });
    });
  });

  return finallyRoutes.concat(routes);
};
