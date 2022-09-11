import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/reqValidation-error';
import { DbConnectionError } from '../errors/dbConn-error';
import User from '../models/user-model';
import { ErrorMessage } from '../errors/ErrorMessage';

const router = express.Router();

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
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const user = await User.findOne({ email });

      if (user) {
        throw new ErrorMessage('Email is already taken');
        return;
      }

      const newUser = await User.create({ email, password });

      res.status(200).send(newUser);
    } catch (err) {}
  }
);

export { router as signupRouter };
