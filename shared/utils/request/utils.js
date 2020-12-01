import axios from 'axios';
import ErrorObj from './ErrorObj';
import ErrorType from './consts/ErrorType';
import {
  SUCCESS,
  VALIDATE_CODE_TIME_OUT,
  APPLICATION_EXCEPTION,
  NOT_LOGIN
} from './consts/ResponseCode';

export const isSuccess = responseCode => responseCode === SUCCESS;
export const isSystemError = responseCode => {
  const code = parseInt(responseCode, 10);
  return code && code < 1000;
};
export const isValidateCodeTimeOut = responseCode => responseCode === VALIDATE_CODE_TIME_OUT;
export const isNotLogin = responseCode => responseCode === NOT_LOGIN;
export const isApplicationException = responseCode => responseCode === APPLICATION_EXCEPTION;

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

const initData = { body: {}, header: {} };
class Error {
  constructor(resError) {
    const errorType = getErrorType(resError);
    this.errorType = errorType;

    this.errorResult = this[errorType](resError);
  }

  cancel(resError) {
    return { resError, title: 'Cancel Request', code: this.errorType, data: initData };
  }

  timeout(resError) {
    return { resError, title: 'timeout Request', code: this.errorType, data: initData };
  }

  networkError(resError) {
    Modal.error({
      title: 'Network Error',
      content: '本地或者服务端网络发生错误'
    });
    return { resError, title: 'Network Error', code: this.errorType, data: initData };
  }

  httpError(resError) {
    const { response } = resError;
    const errorObj = new ErrorObj(ErrorType.HTTP, this.errorType, {
      code: response.status,
      url: response.path,
      response
    });

    const { title, data } = errorObj;
    if (data.code === 404) {
      Modal.error({
        title,
        content: `请求了不存在的接口 code: ${data.code}`
      });
    }

    if (data.code === 500 || data.code === 504) {
      Modal.error({
        title,
        content: `服务器端出错了 code: ${data.code}`
      });
    }

    return errorObj;
  }
}

export const errorHandler = resError => new Error(resError);


export const getServerErrorMap = ({ code, content, response }) => ({
  code,
  title: 'business error',
  content,
  ...response
});
