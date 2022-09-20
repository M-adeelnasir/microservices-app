import {
  NotFoundError,
  OrderStatus,
  UnAuthorizedMessage,
} from '@adcommon/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';
const router = express.Router();

router.delete('api/orders/:id', async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

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

  res.status(204).send(cancelledOrder);
});

export { router as orderCancelRoute };
