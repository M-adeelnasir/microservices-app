import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(err.message);
}

export default errorHandler;
