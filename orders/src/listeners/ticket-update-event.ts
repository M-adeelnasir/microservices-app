import { QueueGroups } from './queue-group-name';
import { Subjects, TicketUpdatedCheck, Lintener } from '@adcommon/common';
import { Ticket } from '../model/tickets';
import { Message } from 'node-nats-streaming';

export class TicketUpdateEvent extends Lintener<TicketUpdatedCheck> {
  subject: Subjects.ticketUpdated = Subjects.ticketUpdated;
  queueGroupName = QueueGroups.queueGroupName;
  async OnMessage(data: TicketUpdatedCheck['data'], msg: Message) {
    const { id, price, title } = data;

    const ticket = await Ticket.findByIdAndUpdate(
      { _id: id },
      { price, title },
      { new: true }
    );

    if (!ticket) {
      throw new Error('Invalid Ticket Id');
    }

    msg.ack();
  }
}
