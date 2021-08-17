import axios from 'axios';
import localStorage from '@/shared/utils/localStorage';
import { loginPath } from '@/router/consts/urls';
import { location } from '@/shared/services/location';
import Response from './Response';
import { errorHandler, isGlobalBusinessError, isNotLogin } from './utils';
import errorModal from './errorModal';

const createOptions = { baseURL: process.env.BASE_API };

const axiosInstance = axios.create(createOptions);

const request = config => axiosInstance(config);

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.headers.Authorization = localStorage.get('token');
  return config;
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(res => {
  const { data, config: { responseType, catchException = true, fullPath } } = res;
  if (responseType === 'blob') {
    return data;
  }

  const response = new Response(data);

  if (response.isSuccess) {
    return data;
  }

  if (response.isSystemError) {
    errorModal({ title: response.message });
  }

  if (isGlobalBusinessError(response.code) && catchException) {
    errorModal({ title: response.message });
  }

  if (isNotLogin(response.code)) {
    location.push(loginPath, { query: { redirectUrl: fullPath || `${window.location.pathname}${window.location.search}` } });
  }

  return Promise.reject(response);
}, resError => {
  const { errorResult } = errorHandler(resError);
  let res = resError;
  if (errorResult) {
    res = errorResult;
  }

  return Promise.reject(res);
});

export default request;
