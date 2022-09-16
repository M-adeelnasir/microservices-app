import express, { Request, Response } from 'express';
import { Tickets } from '../models/tickets';
import { requireLogin, ErrorMessage } from '@adcommon/common';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/tickets',

  requireLogin,

  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = await Tickets.create({ title, price });
    if (!ticket) {
      throw new ErrorMessage('Ticket Create failed');
    }

    res.status(201).send(ticket);
  }
);

export { router as createTickets };
