import { Response, Request, NextFunction } from 'express';
import { UnAuthorizedMessage } from '../errors/unAuthorized';
export const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (!req.user) {
    throw new UnAuthorizedMessage();
  }

  next();
};
