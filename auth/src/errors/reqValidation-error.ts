import { ValidationError } from 'express-validator';

interface ValidationInterface {
  statusCode: number;
  serializeError(): {
    message: string;
    fields?: string;
  }[];
}

export class RequestValidationError
  extends Error
  implements ValidationInterface
{
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
