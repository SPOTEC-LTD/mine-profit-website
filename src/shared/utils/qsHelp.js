import queryString from 'qs';
import { compile } from 'path-to-regexp';

export const getQueryString = (qs = window.location.search) => {
  if (qs && qs.charAt(0) === '?') {
    return qs.substr(1);
  }

  return '';
};

export const getQueryObject = (qs = getQueryString()) => queryString.parse(qs);

export const toQueryString = object => `?${queryString.stringify(object, { encode: true })}`;

export const urlToList = url => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
};

export const toPath = (url, params) => compile(url, { encode: encodeURIComponent })(params);
