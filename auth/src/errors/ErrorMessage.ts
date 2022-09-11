import { CustomError } from './custom-error';

export class ErrorMessage extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    this.message;

    Object.setPrototypeOf(this, ErrorMessage.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
