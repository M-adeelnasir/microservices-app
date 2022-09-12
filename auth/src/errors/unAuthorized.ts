import { CustomError } from './custom-error';

export class UnAuthorizedMessage extends CustomError {
  statusCode = 401;

  constructor() {
    super('No Authorized');

    Object.setPrototypeOf(this, UnAuthorizedMessage.prototype);
  }

  serializeErrors() {
    return [
      {
        message: 'Not Authorized',
      },
    ];
  }
}
