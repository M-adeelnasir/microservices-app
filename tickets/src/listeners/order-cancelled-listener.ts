import { Message } from 'node-nats-streaming';
import { QueueGroup } from './quere-group-name';
import { Lintener, OrderCancelled, Subjects } from '@adcommon/common';
import { Tickets } from '../models/tickets';
import { TicketUpdatedEventPublisher } from '../events/ticket-event';

export class TicketCancelledListener extends Lintener<OrderCancelled> {
  subject: Subjects.orderCancelled = Subjects.orderCancelled;
  queueGroupName = QueueGroup.queueGroupName;
  async OnMessage(data: OrderCancelled['data'], msg: Message) {
    const ticket = await Tickets.findById({ _id: data.ticketId.id });

    if (!ticket) {
      throw new Error('Invalid request');
    }

    ticket.set({ orderId: undefined });

    const { id, title, version, price, userId, orderId } = ticket;

    await ticket.save();
    await new TicketUpdatedEventPublisher(this.client).publish({
      id,
      title,
      version,
      price,
      userId,
      orderId,
    });

    msg.ack();
  }
}
