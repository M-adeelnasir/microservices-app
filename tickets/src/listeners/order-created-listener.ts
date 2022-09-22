import { Lintener, OrderCreated, Subjects } from '@adcommon/common';
import { Message } from 'node-nats-streaming';
import { QueueGroup } from './quere-group-name';
import { Tickets } from '../models/tickets';
import { TicketUpdatedEventPublisher } from '../events/ticket-event';

export class OrderCreatedListener extends Lintener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = QueueGroup.queueGroupName;
  async OnMessage(data: OrderCreated['data'], msg: Message) {
    const ticket = await Tickets.findById({ _id: data.ticketId.id });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: data.id });

    ticket.save();

    const { id, price, title, userId, orderId, version } = ticket;

    await new TicketUpdatedEventPublisher(this.client).publish({
      id,
      title,
      version,
      price,
      userId,
      orderId: data.id,
    });

    msg.ack();
  }
}
