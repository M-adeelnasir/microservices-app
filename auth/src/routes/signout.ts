import { currentUser } from './../middleware/current-user';
import express, { Response, Request } from 'express';
import { requireLogin } from '../middleware/requireLogin';

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
