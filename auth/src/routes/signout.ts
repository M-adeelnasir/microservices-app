import express, { Response, Request } from 'express';

const router = express.Router();

router.delete('/api/users/signout', (req: Request, res: Response) => {
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
