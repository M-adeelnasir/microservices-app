import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

// interface ValidationInterface {
//   statusCode: number;
//   serializeError(): {
//     message: string;
//     fields?: string;
//   }[];
// }

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Validation Error Occured');

    //only bcz we exending build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
