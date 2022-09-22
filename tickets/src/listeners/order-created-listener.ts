import { Lintener, OrderCreated, Subjects } from '@adcommon/common';
import { Message } from 'node-nats-streaming';
import { QueueGroup } from './quere-group-name';
import { Tickets } from '../models/tickets';

export class OrderCreatedListener extends Lintener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = QueueGroup.queueGroupName;
  async OnMessage(data: OrderCreated['data'], msg: Message) {
    const { id, status, version } = data;
    const ticket = await Tickets.findById({ _id: data.ticketId.id });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: id });

    ticket.save();

    msg.ack();
  }
}
