/* eslint-disable consistent-return */
import Cookies from 'universal-cookie';
import startsWith from 'lodash/startsWith';

export default function (ctx) {
  if (ctx.isHMR) { return; }

  const { defaultLocale, locale } = ctx.app.i18n;
  const header = (ctx.req && ctx.req.headers) || {};

  const headerCookie = header.cookie;
  const { language } = new Cookies(headerCookie).cookies;
  if (!language && header['accept-language']) {
    const [clientLang] = header['accept-language'].split(',');

    if (clientLang.toLowerCase().indexOf('zh') === -1) {
      if (locale !== 'en') {
        return ctx.redirect(`/en${ctx.route.fullPath}`);
      }
    } else if (locale !== 'zh') {
      return ctx.redirect(ctx.route.fullPath.replace(/^\/en/, ''));
    }
  }

  if (language && language !== defaultLocale) {
    if (!startsWith(ctx.route.fullPath, `/${language}`)) {
      return ctx.redirect(
        `/${language}${ctx.route.fullPath}`,
      );
    }
  }
}
