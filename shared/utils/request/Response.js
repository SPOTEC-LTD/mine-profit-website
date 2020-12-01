import { isSuccess, isSystemError } from './utils';

export default class Response {
  constructor(jsonResponse) {
    const { header, body } = jsonResponse;
    const { responseCode, responseMessage } = header;
    this.header = header;
    this.body = body;

    this.code = responseCode;
    this.message = responseMessage;

    this.isSuccess = isSuccess(responseCode);
    this.isSystemError = isSystemError(responseCode);
    this.isBusinessError = !this.isSystemError;
  }
}

