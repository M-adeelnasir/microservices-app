import express, { Request, Response } from 'express';
import { Tickets } from '../models/tickets';
import { requireLogin, ErrorMessage } from '@adcommon/common';

const router = express.Router();

router.get(
  '/api/tickets/:id',
  requireLogin,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const ticket = await Tickets.findById(id);

    if (!ticket) {
      throw new ErrorMessage('No tickets found');
    }

    res.status(200).send(ticket);
  }
);

export { router as getTicket };
