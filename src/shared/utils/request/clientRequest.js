import axios from 'axios';
import localStorage from '@/shared/utils/localStorage';
import Response from './Response';
import { errorHandler, isGlobalBusinessError } from './utils';
import errorModal from './errorModal';

const createOptions = { baseURL: 'http://192.168.0.126:10000' };

const axiosInstance = axios.create(createOptions);

const request = config => axiosInstance(config);

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.timeout = 100000;
  config.headers.Authorization = localStorage.get('token');
  config.headers.platformType = 'HOME';
  return config;
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(res => {
  const { data, config: { responseType, catchException = true } } = res;
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
