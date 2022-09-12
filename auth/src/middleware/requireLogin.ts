import { Response, Request, NextFunction } from 'express';

export const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).send('require login');
  }
  next();
};
