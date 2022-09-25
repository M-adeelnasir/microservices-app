import { Lintener, OrderCancelled, Subjects } from '@adcommon/common';
import { Message } from 'node-nats-streaming';
import { QueueGroup } from './quere-group-name';
import { Tickets } from '../models/tickets';
import { TicketUpdatedEventPublisher } from '../events/ticket-event';

export class OrderCancelledEventListener extends Lintener<OrderCancelled> {
  subject: Subjects.orderCancelled = Subjects.orderCancelled;
  queueGroupName = QueueGroup.queueGroupName;
  async OnMessage(data: OrderCancelled['data'], msg: Message) {
    const ticket = await Tickets.findById({ _id: data.ticketId.id });

    if (!ticket) {
      throw new Error('Invalid Ticket id');
    }

    ticket.set({ orderId: undefined });
    ticket.save();

    console.log('TICKET IS----->', ticket);

    try {
      await new TicketUpdatedEventPublisher(this.client).publish({
        id: ticket.id,
        orderId: ticket.orderId,
        title: ticket.title,
        price: ticket.price,
        version: ticket.version + 1,
        userId: ticket.userId,
      });
    } catch (err) {
      console.log('ERROR Can====>');
    }

    msg.ack();
  }
}
