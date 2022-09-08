import express, { Response, Request } from 'express';

const router = express.Router();

router.post('/api/users/signup', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    throw new Error('Email required');
  }
  if (!password || password.length < 6) {
    throw new Error('password is required with atleast 6 chars');
  }
});

export { router as signupRouter };
