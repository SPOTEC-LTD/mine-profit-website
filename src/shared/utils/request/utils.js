import axios from 'axios';
import errorModal from './errorModal';
import {
  SUCCESS, SERVER_EXCEPTION, GLOBAL_BUSINESS_EXCEPTION, NOT_LOGIN,
} from './consts/ResponseCode';

export const isSuccess = responseCode => responseCode === SUCCESS;
export const isSystemError = responseCode => responseCode === SERVER_EXCEPTION;
export const isGlobalBusinessError = responseCode => responseCode === GLOBAL_BUSINESS_EXCEPTION;
export const isNotLogin = responseCode => responseCode === NOT_LOGIN;

const isCancel = resError => axios.isCancel(resError);
const isTimeout = resError => resError.code === 'ECONNABORTED';
const isNetworkError = resError => resError.message === 'Network Error';
const isHttpError = ({ response: { status } }) => status < 200 || status >= 300 || !status;

const getErrorType = resError => {
  if (isCancel(resError)) {
    return 'cancel';
  }

  if (isTimeout(resError)) {
    return 'timeout';
  }

  if (isNetworkError(resError)) {
    return 'networkError';
  }

  if (isHttpError(resError)) {
    return 'httpError';
  }

  return '';
};

class Error {
  constructor(resError) {
    const errorType = getErrorType(resError);
    this.errorType = errorType;

    this.errorResult = this[errorType](resError);
  }

  cancel(resError) {
    return { resError, title: 'Cancel Request', code: this.errorType };
  }

  timeout(resError) {
    const title = 'timeout Request';
    errorModal({ title, content: '请求超时' });
    return { resError, title: 'timeout Request', code: this.errorType };
  }

  networkError(resError) {
    const title = 'Network Error';
    errorModal({ title, content: '服务器网络断开' });

    return { resError, title, code: this.errorType };
  }

  httpError = resError => {
    const { response } = resError;
    const httpCode = response.status;

    if (httpCode === 404) {
      const errorObj = { title: 'httpError', content: `请求了不存在的接口 code: ${httpCode}` };
      errorModal(errorObj);
      return errorObj;
    }

    if (httpCode === 500 || httpCode === 504) {
      const errorObj = { title: 'httpError', content: `服务器端出错了 code: ${httpCode}` };
      errorModal(errorObj);
      return errorObj;
    }

    if (httpCode === 503) {
      const errorObj = { title: 'httpError', content: `系统正在升级，请稍后再试 code: ${httpCode}` };
      errorModal(errorObj);
      return errorObj;
    }

    return { title: 'httpError', content: '' };
  }
}

export const errorHandler = resError => new Error(resError);
