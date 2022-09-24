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

    if (!ticket) {
      throw new ErrorMessage('update ticket failed');
    }

    ticket.set({ title, price });

    await ticket.save();

    try {
      const ticket_1 = await new TicketUpdatedEventPublisher(
        natsWrapper.client
      ).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: userId,
        version: ticket.version as number,
      });
      console.log('ticket_1===>', ticket_1);
    } catch (err) {
      console.log(err);
    }

    console.log('updated ticket====>', ticket);

    res.status(200).send(ticket);
  }
);

export { router as updateTicket };
