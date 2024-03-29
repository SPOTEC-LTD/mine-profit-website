import queryString from 'qs';
import { compile } from 'path-to-regexp';

export const getQueryString = (qs = window.location.search) => {
  if (qs && qs.charAt(0) === '?') {
    return qs.substr(1);
  }

  return '';
};

export const getQueryObject = (qs = getQueryString()) => queryString.parse(qs);

export const getPathAndQueryObject = search => {
  const searchQueryObject = {};
  if (search) {
    const [path, query] = search.split('?');
    searchQueryObject.path = path;
    if (query) {
      searchQueryObject.query = getQueryObject(query);
    }
    return searchQueryObject;
  }
  return searchQueryObject;
};

export const toQueryString = object => `?${queryString.stringify(object, { encode: true })}`;

export const urlToList = url => {
  const urlList = url.split('/').filter(i => i);
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
};

export const toPath = (url, params) => compile(url, { encode: encodeURIComponent })(params);
