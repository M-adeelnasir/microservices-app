import {
  NotFoundError,
  OrderStatus,
  UnAuthorizedMessage,
} from '@adcommon/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';

import { OrderCancelledPublisher } from '../publisher/order-cancel';
import { natsWrapper } from '../services/stanWrapper';

const router = express.Router();

router.delete('/api/orders/:id', async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('ticketId');

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.user!.id) {
    throw new UnAuthorizedMessage();
  }

  const cancelledOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { status: OrderStatus.Cancelled },
    { new: true, runValidators: true }
  );

  try {
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticketId: {
        id: order.ticketId.id,
      },
    });
  } catch (err) {}

  res.status(204).send(cancelledOrder);
});

export { router as orderCancelRoute };
