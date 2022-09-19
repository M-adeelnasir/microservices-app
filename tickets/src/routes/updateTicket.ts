import { TicketUpdatedEventPublisher } from './../events/ticket-event';
import express, { Request, Response } from 'express';
import { Tickets } from '../models/tickets';
import { requireLogin, ErrorMessage } from '@adcommon/common';
import { natsWrapper } from '../services/stanWrapper';

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

    try {
      await new TicketUpdatedEventPublisher(natsWrapper.client).publish({
        id: updateTicket.id,
        title: updateTicket.title,
        price: updateTicket.price,
        userId: userId,
      });
    } catch (err) {
      console.log(err);
    }

    res.status(200).send(updateTicket);
  }
);

export { router as updateTicket };
