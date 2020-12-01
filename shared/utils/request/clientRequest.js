import axios from 'axios';
import ErrorObj from './ErrorObj';
import ErrorType from './consts/ErrorType';
import Response from './Response';
import {
  errorHandler,
  getServerErrorMap,
  isApplicationException,
  isNotLogin,
  isValidateCodeTimeOut
} from './utils';

const createOptions = { baseURL: process.env.BASE_API };

const axiosInstance = axios.create(createOptions);

const request = config => axiosInstance(config);

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // config.headers.Authorization = getCookie().get('token');
  config.timeout = 100000;
  return config;
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(res => {
  const { data, config: { loadingKey, catchException = true } } = res;
  if (loadingKey) {
    const { dispatch } = window.__store;
    setTimeout(() => {
      dispatch(hideloading({ key: loadingKey }));
    }, 200);
  }

  const response = new Response(data);
  if (response.isSuccess) {
    return Promise.resolve(data);
  }

  // TODO 临时加入请求参数有误的提示
  if (response.code === '1705') {
    message.error('请求参数有误');
  }

  if (isValidateCodeTimeOut(response.code)) {
    const { dispatch } = window.__store;
    const errorObj = getServerErrorMap({ code: response.code, content: messages.sessionTimeoutReGetcode });
    dispatch(updateServerError(errorObj));

    return Promise.reject(new ErrorObj(ErrorType.BUSINESS, 'business error', {
      code: response.code,
      ...response
    }));
  }

  if (isNotLogin(response.code)) {
    const { dispatch } = window.__store;
    const errorObj = getServerErrorMap({ code: response.code, content: 'no Login' });
    dispatch(updateServerError(errorObj));
  }

  if (isApplicationException(response.code) && catchException) {
    const { dispatch } = window.__store;
    const errorObj = getServerErrorMap({ code: response.code, content: response.message });
    dispatch(updateServerError(errorObj));
  }

  if (response.isSystemError) {
    Modal.error({
      title: response.message,
      content: `系统错误 code: ${response.code}`
    });
    return Promise.reject(new ErrorObj(ErrorType.SERVICE, 'system error', {
      code: response.code,
      message: response.message
    }));
  }

  return Promise.reject(new ErrorObj(ErrorType.BUSINESS, 'business error', {
    code: response.code,
    ...response
  }));

}, resError => {
  // const { errorResult } = errorHandler(resError);
  // let res = resError;
  // if (errorResult) {
  //   res = errorResult;
  // }

  return Promise.reject(resError);
});

export default request;
