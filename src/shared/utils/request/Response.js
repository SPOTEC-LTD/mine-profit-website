import { isSuccess, isSystemError } from './utils';

export default class Response {
  constructor(jsonResponse) {
    const { header } = jsonResponse;
    const { code: responseCode, message, messageDetails } = header;

    this.code = responseCode;
    this.message = message;
    this.messageDetails = messageDetails;

    this.isSuccess = isSuccess(responseCode);
    this.isSystemError = isSystemError(responseCode);
    this.isBusinessError = !this.isSystemError;
  }
}
