import express, { Request, Response } from 'express';
import { Tickets } from '../models/tickets';
import { requireLogin, ErrorMessage } from '@adcommon/common';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireLogin,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const userId = req.user!.id;

    const ticket = await Tickets.findById(id);

    //   @ts-ignore
    console.log(userId, ticket.userId.toString());

    //   @ts-ignore
    if (userId !== ticket.userId.toString()) {
      throw new ErrorMessage('You are not authorized');
    }

    const updateTicket = await Tickets.findByIdAndUpdate(
      { _id: id },
      { title, price },
      { new: true }
    );

    if (!updateTicket) {
      throw new ErrorMessage('update ticket failed');
    }

    res.status(200).send(updateTicket);
  }
);

export { router as updateTicket };
