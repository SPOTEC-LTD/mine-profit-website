import axios from 'axios';
import Response from './Response';
import { isApplicationException, isNotLogin, getServerErrorMap } from './utils';


const createOptions = { baseURL: process.env.BASE_API };

const axiosInstance = axios.create(createOptions);

const request = config => axiosInstance(config);

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.timeout = 100000;
  if (config.ctx) {
    const allCookies = cookies(config.ctx);
    const { token } = allCookies;
    if (token) {
      config.headers.Authorization = token;
    }
  }
  return config;
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(res => {
  const { data } = res;
  const response = new Response(data);
  if (response.isSuccess) {
    return Promise.resolve(data);
  }

  if (isNotLogin(response.code)) {
    const errorObj = getServerErrorMap({ code: response.code, content: 'no Login' });
    return Promise.reject(errorObj);
  }

  const errorObj = getServerErrorMap({ code: response.code, content: response.message });

  if (isApplicationException(response.code)) {
    return Promise.reject(errorObj);
  }

  return Promise.reject(errorObj);

}, resError => {
  if (resError.code === 'ENOTFOUND') {
    const errorObj = { code: resError.code, title: 'system error', content: '本地或者服务端网络发生错误' };
    return Promise.reject(errorObj);
  }

  const errorObj = { code: resError.code || '0', title: 'system error', content: resError.message };

  return Promise.reject(errorObj);
});

export default request;
