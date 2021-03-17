import isPlainObject from 'lodash/isPlainObject';
import { toPath } from '@/shared/utils/qsHelp';
import request from './request';
import httpMethod from './consts/httpMethod';

// eslint-disable-next-line
let createAPI = (method, url) => (params = {}, config = {}) => {
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

  return request({
    url: finalURL,
    method,
    ...config
  });
};

if (__TESTING__) {
  createAPI = (_, url) => function tTequest() { return Promise.resolve(url); };
}

export default createAPI;
