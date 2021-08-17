import Cookies from 'universal-cookie';
import startsWith from 'lodash/startsWith';

export default function (ctx) {
  if (ctx.isHMR) { return; }

  const { defaultLocale } = ctx.app.i18n;

  const header = ctx.req && ctx.req.headers && ctx.req.headers.cookie;
  const { language } = new Cookies(header).cookies;

  if (language && language !== defaultLocale) {
    if (!startsWith(ctx.route.fullPath, `/${language}`)) {
      // eslint-disable-next-line consistent-return
      return ctx.redirect(
        `/${language}${ctx.route.fullPath}`,
      );
    }
  }
}
