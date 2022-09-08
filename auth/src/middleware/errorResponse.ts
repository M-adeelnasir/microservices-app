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
    const formatedErrors = err.errors.map((error) => {
      return { message: error.msg, fields: error.param };
    });
    res.status(400).send({ errors: formatedErrors });
  }
  if (err instanceof DbConnectionError) {
    res.status(500).send({ errors: [{ message: err.reason }] });
  }
  res.status(400).json({
    error: err.message,
  });
}

export default errorHandler;
