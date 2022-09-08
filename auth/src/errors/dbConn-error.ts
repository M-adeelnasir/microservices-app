export class DbConnectionError extends Error {
  reason = 'db connection error';
  constructor() {
    super();
    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }
}
