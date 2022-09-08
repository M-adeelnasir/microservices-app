import { RequestValidationError } from './../errors/reqValidation-error';
import { DbConnectionError } from '../errors/dbConn-error';
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof RequestValidationError) {
    console.log('Request validation errro');
  }
  if (err instanceof DbConnectionError) {
    console.log('DB Error');
  }
  res.status(400).json({
    error: err.message,
  });
}

export default errorHandler;
