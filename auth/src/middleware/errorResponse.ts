import { RequestValidationError } from './../errors/reqValidation-error';
import { DbConnectionError } from '../errors/dbConn-error';
import { Response, Request, NextFunction } from 'express';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof RequestValidationError) {
    res.status(err.statusCode).send({ errors: err.serializeError() });
  }
  if (err instanceof DbConnectionError) {
    res.status(err.statusCode).send({ errors: err.serializerErrors() });
  }
  // res.status(400).json({
  //   error: err.message,
  // });
}

export default errorHandler;
