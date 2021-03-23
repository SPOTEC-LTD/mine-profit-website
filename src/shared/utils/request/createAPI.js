/* eslint-disable global-require */
import isPlainObject from 'lodash/isPlainObject';
import { toPath } from '@/shared/utils/qsHelp';
import isServerSide from '@/shared/utils/isServerSide';
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

  const request = isServerSide() ? serverRequest : clientRequest;

  return request({
    url: finalURL,
    method,
    ...config,
  });
};

export default createAPI;
