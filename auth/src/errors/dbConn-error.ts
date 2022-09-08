// interface DbInterface {
//   statusCode: number;
//   serializerErrors(): {
//     message: string;
//   }[];
// }

import { CustomError } from './custom-error';

export class DbConnectionError extends CustomError {
  statusCode = 500;
  reason = 'db connection error';
  constructor() {
    super();
    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
