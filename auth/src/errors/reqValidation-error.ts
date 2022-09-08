import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    //only bcz we exending build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
