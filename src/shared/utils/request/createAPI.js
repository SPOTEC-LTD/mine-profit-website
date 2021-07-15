/* eslint-disable global-require */
import isPlainObject from 'lodash/isPlainObject';
import { toPath } from '@/shared/utils/qsHelp';
import isServerSide from '@/shared/utils/isServerSide';
import languages from '@/shared/intl/consts/languages';
import locale from '@/shared/intl/utils/locale';
import clientRequest from './clientRequest';
import serverRequest from './serverRequest';
import httpMethod from './consts/httpMethod';

const createAPI = (method, url) => (params = {}, config = {}) => {
  const { pathParams, data } = params;
  const isPostOrPut = (method === httpMethod.POST || method === httpMethod.PUT);

  let finalURL = url;
  if (isPlainObject(pathParams)) {
    finalURL = toPath(url, pathParams);
  }

  if (isPostOrPut) {
    config.data = data;
  } else {
    config.params = data;
  }

  config.headers = {
    lang: languages[locale.currentLocale],
  };

  if (config.ctx) { // fix product evn axios error bug
    config.headers = {
      lang: languages[config.ctx.app.i18n.locale],
    };

    config.ctx = {
      req: config.ctx.req,
      redirect: config.ctx.redirect,
      route: config.ctx.route,
      locale: config.ctx.app.i18n.locale,
    };
  }

  const request = isServerSide() ? serverRequest : clientRequest;

  return request({
    url: finalURL,
    method,
    ...config,
  });
};

export default createAPI;
