import { currentUser } from './../middleware/current-user';
import express, { Request, Response } from 'express';
const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentuser: req.user || null });
  }
);

export { router as currentUserRouter };
