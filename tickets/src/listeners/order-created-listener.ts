import { Lintener, OrderCreated, Subjects } from '@adcommon/common';
import { Message } from 'node-nats-streaming';
import { QueueGroup } from './quere-group-name';
import { Tickets } from '../models/tickets';
import { TicketUpdatedEventPublisher } from '../events/ticket-event';

export class OrderCreatedListener extends Lintener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = QueueGroup.queueGroupName;
  async OnMessage(data: OrderCreated['data'], msg: Message) {
    // console.log('DATA_1=====>', data);

    const ticket = await Tickets.findById({ _id: data.ticketId.id });

    // console.log('DATA_2 TICKET FOUND', ticket);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: data.id });

    ticket.save();

    // console.log('CHECK THE TICKET', ticket);

    const { id, price, title, userId, version } = ticket;

    try {
      await new TicketUpdatedEventPublisher(this.client).publish({
        id,
        title,
        version: version + 1,
        price,
        userId,
        orderId: data.id,
      });
    } catch (err) {
      console.log(err);
    }

    msg.ack();
  }
}
