import express, { Request, Response } from 'express';
const router = express.Router();

router.post('api/orders/create', async (req: Request, res: Response) => {
  res.send({});
});

export { router as ordersCreateRoute };
