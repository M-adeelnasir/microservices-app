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

    const isReserved = await ticket.isReserved();

    //make sure the ticket is not already reserved

    if (isReserved) {
      throw new ErrorMessage('Ticket is already reserved');
    }

    //set expiration time
    let expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 15 * 60);

    const newOrder = await Order.create({
      userId: req.user!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticketId,
    });
    console.log(newOrder);

    res.status(201).send(newOrder);
  }
);

export { router as ordersCreateRoute };
