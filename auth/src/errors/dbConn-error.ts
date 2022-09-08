interface DbInterface {
  statusCode: number;
  serializerErrors(): {
    message: string;
  }[];
}
export class DbConnectionError extends Error implements DbInterface {
  statusCode = 500;
  reason = 'db connection error';
  constructor() {
    super();
    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }
  serializerErrors() {
    return [{ message: this.reason }];
  }
}
