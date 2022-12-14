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

    if (ticket!.orderId) {
      throw new ErrorMessage(
        'Ticket is reseverd you are not allowed to edit it for now!'
      );
    }

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
      await new TicketUpdatedEventPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: userId,
        version: ticket.version as number,
      });
    } catch (err) {
      console.log(err);
    }

    // console.log('updated ticket====>', ticket);

    res.status(200).send(ticket);
  }
);

export { router as updateTicket };
