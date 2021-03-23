import axios from 'axios';
import Response from './Response';

const createOptions = { baseURL: 'http://192.168.0.126:10000' };

const axiosInstance = axios.create(createOptions);

const request = config => axiosInstance(config);

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.timeout = 100000;
  return config;
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(res => {
  const { data } = res;
  const response = new Response(data);
  if (response.isSuccess) {
    return Promise.resolve(data);
  }
  return Promise.reject(response);
}, resError => {
  return Promise.reject(resError);
});

export default request;
