import { CancelToken } from 'axios';
import ErrorType from './consts/ErrorType';
import httpMethod from './consts/httpMethod';
import * as ResponseCode from './consts/ResponseCode';
import createAPI from './createAPI';

export {
  createAPI,
  ErrorType,
  httpMethod,
  ResponseCode,
  CancelToken
};
