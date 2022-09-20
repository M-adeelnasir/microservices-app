import express, { Request, Response } from 'express';
import { requireLogin, validateRequest } from '@adcommon/common';
import mongoose from 'mongoose';
import { body } from 'express-validator';
const router = express.Router();

router.post(
  'api/orders/create',
  requireLogin,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Ticket Must be Provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //

    res.send({});
  }
);

export { router as ordersCreateRoute };
