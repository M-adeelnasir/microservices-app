import express, { Request, Response } from 'express';
import { Tickets } from '../models/tickets';
import { requireLogin, ErrorMessage } from '@adcommon/common';
import { TicketCreatedEventPublisher } from '../events/ticket-event';
import { natsWrapper } from '../services/stanWrapper';

const router = express.Router();

router.post(
  '/api/tickets',

  requireLogin,

  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const userId = req.user!.id;

    const ticket = await Tickets.create({ title, price, userId });
    if (!ticket) {
      throw new ErrorMessage('Ticket Create failed');
    }

    //nats streaming
    try {
      await new TicketCreatedEventPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: userId,
        version: ticket.version as number,
      });
    } catch (err) {
      console.log(err);
    }

    console.log('created ticket ===>', ticket);

    res.status(201).json(ticket);
  }
);

export { router as createTickets };
