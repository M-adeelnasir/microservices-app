import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/reqValidation-error';
import { DbConnectionError } from '../errors/dbConn-error';
import User from '../models/user-model';
import { ErrorMessage } from '../errors/ErrorMessage';
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

    const jwtToken = jwt.sign({ email, password }, 'hellothis');

    req.session = {
      jwt: jwtToken,
    };

    res.status(200).send(newUser);
  }
);

export { router as signupRouter };
