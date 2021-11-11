/* eslint-disable consistent-return */
import Cookies from 'universal-cookie';
import startsWith from 'lodash/startsWith';

export default function i18nChange(ctx) {
  if (ctx.isHMR) { return; }

  const { defaultLocale, locale } = ctx.app.i18n;
  const header = (ctx.req && ctx.req.headers) || {};

  const headerCookie = header.cookie;
  const { language } = new Cookies(headerCookie).cookies;
  console.log('2323', language, locale, ctx.route.fullPath);
  if (!language && header['accept-language']) {
    const [clientLang] = header['accept-language'].split(',');

    if (clientLang.toLowerCase().indexOf('zh') === -1) {
      if (locale !== 'en') {
        return ctx.redirect(ctx.route.fullPath.replace(/^\/\w+\//, '/'));
      }
    } else if (locale !== 'zh') {
      return ctx.redirect(`/zh${ctx.route.fullPath.replace(/^\/\w+\//, '/')}`);
    }
  }

  if (language && language !== defaultLocale) {
    if (!startsWith(ctx.route.fullPath, `/${language}`)) {
      return ctx.redirect(
        `/${language}${ctx.route.fullPath}`,
      );
    }
  }

  if (!startsWith(ctx.route.fullPath, `/${locale}`)) {
    return ctx.redirect(
      `/${locale}${ctx.route.fullPath}`,
    );
  }
}
