import express, { Request, Response } from 'express';
import { Order } from '../model/orders';

const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.user!.id }).populate(
    'ticketId'
  );

  res.send(orders);
});

export { router as ordersGetRoute };
