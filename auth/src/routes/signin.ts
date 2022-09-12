import { Password } from './../services/password';
import { RequestValidationError } from './../errors/reqValidation-error';
import { ErrorMessage } from './../errors/ErrorMessage';
import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user-model';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
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

    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorMessage('Invalid Credetials');
    }

    const passwordMatches = await Password.comparePassword(
      user.password,
      password
    );

    if (!passwordMatches) {
      throw new ErrorMessage('Invalid Credetials');
    }

    const jwtToken = jwt.sign({ email, password }, process.env.JWT_KEY!);

    req.session! = {
      jwt: jwtToken,
    };

    res.send(user);
  }
);

export { router as signinRouter };
