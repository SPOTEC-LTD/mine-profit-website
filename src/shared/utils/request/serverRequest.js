import axios from 'axios';
import startsWith from 'lodash/startsWith';
import find from 'lodash/find';
import { I18N } from '@@/i18n';
import { isNotLogin } from '@/shared/utils/request/utils';
import { loginPath } from '@/router/consts/urls';
import getUserInfoFunc from './getUserInfoFunc';
import Response from './Response';

const { locales } = I18N;

const createOptions = { baseURL: process.env.BASE_API };
const axiosInstance = axios.create(createOptions);
const request = config => axiosInstance(config);

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  if (config.ctx) {
    const { token } = getUserInfoFunc(config.ctx);
    if (token) {
      config.headers.Authorization = token;
    }
  }

  return config;
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(res => {
  const { data, config: { ctx, catchException = true } } = res;
  const response = new Response(data);

  if (response.isSuccess) {
    return Promise.resolve(data);
  }

  if (isNotLogin(response.code) && catchException) {
    if (!startsWith(ctx.route.name, 'login')) {
      const urlLang = ctx.route.fullPath.split('/')[1];
      const urlIsLang = !!find(locales, { code: urlLang });
      if (urlIsLang) {
        ctx.redirect(`/${urlLang}${loginPath}?redirectUrl=${ctx.route.fullPath}`);
      } else {
        ctx.redirect(`${loginPath}?redirectUrl=${ctx.route.fullPath}`);
      }
    }
  }

  return Promise.reject(response);
}, resError => {
  return Promise.reject(resError);
});

export default request;
