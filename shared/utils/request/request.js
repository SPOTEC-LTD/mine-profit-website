import axios from 'axios';
import localStorage from '@/shared/utils/localStorage';
import ErrorObj from './ErrorObj';
import ErrorType from './consts/ErrorType';
import Response from './Response';
import { errorHandler } from './utils';

const request = config => axios(config);

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.baseURL = __BASE_URL__;
  config.timeout = 100000;
  config.headers.Authorization = localStorage.get('token');
  return config;
});

// 添加响应拦截器
axios.interceptors.response.use(({ data }) => {
  const response = new Response(data);

  if (response.isSuccess) {
    return Promise.resolve(data);
  }

  if (response.isSystemError) {
    return Promise.reject(new ErrorObj(ErrorType.SERVICE, 'system error', {
      code: response.code,
      message: response.message,
    }));
  }

  return Promise.reject(new ErrorObj(ErrorType.BUSINESS, 'business error', {
    code: response.code,
    ...response,
  }));
}, resError => {
  const { errorResult } = errorHandler(resError);
  let res = resError;
  if (errorResult) {
    res = errorResult;
  }

  return Promise.reject(res);
});

export default request;
