import { UnAuthorizedMessage } from './../../../common/src/errors/unAuthorized';
import { ErrorMessage, NotFoundError } from '@adcommon/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';

const router = express.Router();

router.get('api/orders/:id', async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('ticketId');

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.user!.id) {
    throw new UnAuthorizedMessage();
  }

  res.send(order);
});

export { router as orderGetRoute };
