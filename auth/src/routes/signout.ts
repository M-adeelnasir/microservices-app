import { currentUser, requireLogin } from '@adcommon/common';
import express, { Response, Request } from 'express';

const router = express.Router();

router.delete(
  '/api/users/signout',
  currentUser,
  requireLogin,
  (req: Request, res: Response) => {
    //@ts-ignore
    req.session = null;
    res.send({});
  }
);

export { router as signoutRouter };
