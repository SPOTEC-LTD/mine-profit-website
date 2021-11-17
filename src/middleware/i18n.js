/* eslint-disable consistent-return */
import Cookies from 'universal-cookie';
import find from 'lodash/find';
import { I18N, ZH, EN } from '@@/i18n';

const { locales } = I18N;

export default function i18nChange(ctx) {
  if (ctx.isHMR) { return; }

  const { locale } = ctx.app.i18n;
  const header = (ctx.req && ctx.req.headers) || {};

  const headerCookie = header.cookie;
  const { language } = new Cookies(headerCookie).cookies;
  const urlLang = ctx.route.fullPath.split('/')[1];
  const urlIsLang = !!find(locales, { code: urlLang });
  let sourcePath = ctx.route.fullPath;

  if (urlIsLang) {
    sourcePath = ctx.route.fullPath.replace(`/${urlLang}`, '');
  }

  // 没有设置语言根据游览器显示中文还是英文
  if (!language && header['accept-language']) {
    const [browserLang] = header['accept-language'].split(',');

    if (browserLang.toLowerCase().indexOf('zh') === -1) {
      if (locale !== I18N.defaultLocale) {
        return ctx.redirect(`${I18N.defaultLocale}${sourcePath}`);
      }
    } else if (locale !== ZH) {
      return ctx.redirect(`/${ZH}${sourcePath}`);
    }
  }

  if (language && language !== urlLang) {
    if (find(locales, { code: language })) {
      return ctx.redirect(`/${language}${sourcePath}`);
    }
    return ctx.redirect(`/${EN}${sourcePath}`);
  }

  if (!urlIsLang) {
    return ctx.redirect(`/${locale}${sourcePath}`);
  }
}
