import { Message } from 'node-nats-streaming';
import { Lintener, Subjects, TicketCreatedCheck } from '@adcommon/common';
import { Ticket } from '../model/tickets';
import { QueueGroups } from './queue-group-name';

export class TicketCreateEvent extends Lintener<TicketCreatedCheck> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
  queueGroupName = QueueGroups.queueGroupName;
  async OnMessage(data: TicketCreatedCheck['data'], msg: Message) {
    const { id, title, price } = data;
    await Ticket.create({ _id: id, title, price });

    msg.ack();
  }
}
