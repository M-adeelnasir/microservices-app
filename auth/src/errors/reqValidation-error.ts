import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(error: ValidationError[]) {
    super();

    //only bcz we exending build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
