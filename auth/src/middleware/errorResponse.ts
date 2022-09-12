import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    console.log(err);
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
}

export default errorHandler;
