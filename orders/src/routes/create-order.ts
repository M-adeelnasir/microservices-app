import express, { Request, Response } from 'express';
import {
  requireLogin,
  validateRequest,
  NotFoundError,
  ErrorMessage,
  OrderStatus,
} from '@adcommon/common';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import { Order } from '../model/orders';
import { Ticket } from '../model/tickets';

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
    const { ticketId } = req.body;

    //find the ticket the user trying to order
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    //make sure the ticket is not already reserved
    const order = await Order.findOne({
      ticketId: ticketId,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPaymnet,
          OrderStatus.Complete,
        ],
      },
    });

    if (!order) {
      throw new ErrorMessage('Ticket is already reserved');
    }

    const expiration = res.send({});
  }
);

export { router as ordersCreateRoute };
