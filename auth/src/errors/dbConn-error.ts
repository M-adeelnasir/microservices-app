export class DbConnectionError extends Error {
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
