import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/reqValidation-error';
import { DbConnectionError } from '../errors/dbConn-error';
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
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    throw new DbConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
