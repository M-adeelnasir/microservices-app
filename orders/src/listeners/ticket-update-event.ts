import { QueueGroups } from './queue-group-name';
import { Subjects, TicketUpdatedCheck, Lintener } from '@adcommon/common';
import { Ticket } from '../model/tickets';
import { Message } from 'node-nats-streaming';

export class TicketUpdateEvent extends Lintener<TicketUpdatedCheck> {
  subject: Subjects.ticketUpdated = Subjects.ticketUpdated;
  queueGroupName = QueueGroups.queueGroupName;
  async OnMessage(data: TicketUpdatedCheck['data'], msg: Message) {
    console.log('DATA', data);

    const { id, price, title, version } = data;

    const ticket = await Ticket.findOne({ _id: id, version: version - 1 });

    // console.log('CHECK____>', ticket);

    if (!ticket) {
      throw new Error('Invalid Ticket Id');
    }

    ticket.set({ price, title });

    ticket.save();

    // console.log('UPADTED TICKET===>', ticket);

    msg.ack();
  }
}
