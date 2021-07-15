import axios from 'axios';
import getUserInfoFunc from './getUserInfoFunc';
import Response from './Response';

const createOptions = { baseURL: process.env.BASE_API };

const axiosInstance = axios.create(createOptions);

const request = config => axiosInstance(config);

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.timeout = 100000;

  if (config.ctx) {
    const { token } = getUserInfoFunc(config.ctx);
    if (token) {
      config.headers.Authorization = token;
    }
  } else {
    console.console.error('ctx params is required');
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
  return Promise.reject(response);
}, resError => {
  return Promise.reject(resError);
});

export default request;
