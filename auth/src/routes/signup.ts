import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError, ErrorMessage } from '@adcommon/common';
import User from '../models/user-model';
import jwt from 'jsonwebtoken';

const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      session?: any;
    }
  }
}

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password is required and must be atleast 6 chars'),
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const user = await User.findOne({ email: email });

    if (user) {
      throw new ErrorMessage('Email yes is taken');
    }

    const newUser = await User.create({ email, password });

    const jwtToken = jwt.sign(
      { email: newUser.email, id: newUser.id },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: jwtToken,
    };

    res.status(200).send(newUser);
  }
);

export { router as signupRouter };

// kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
