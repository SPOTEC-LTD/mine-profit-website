import axios from 'axios';
import { Dialog } from 'vant';
import ErrorObj from './ErrorObj';
import ErrorType from './consts/ErrorType';
import { SUCCESS } from './consts/ResponseCode';

export const isSuccess = responseCode => responseCode === SUCCESS;
export const isSystemError = responseCode => {
  const code = parseInt(responseCode, 10);
  return code && code < 1000;
};

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
    return { resError, title: 'timeout Request', code: this.errorType };
  }

  networkError(resError) {
    return { resError, title: 'Network Error', code: this.errorType };
  }

  httpError(resError) {
    const { response } = resError;
    const errorObj = new ErrorObj(ErrorType.HTTP, this.errorType, {
      code: response.status,
      url: response.path,
      response,
    });

    const { title, data } = errorObj;
    if (data.code === 404) {
      Dialog.alert({
        title,
        message: `请求了不存在的接口 code: ${data.code}`,
      });
    }

    if (data.code === 500 || data.code === 504) {
      Dialog.alert({
        title,
        message: `服务器端出错了 code: ${data.code}`,
      });
    }

    return errorObj;
  }
}

export const errorHandler = resError => new Error(resError);
