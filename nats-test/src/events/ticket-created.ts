import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';

import { TicketCreated } from './eventTypes';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreated> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
  queueGroupName = 'event-created-queue';
  onMessage(data: TicketCreated['data'], msg: Message) {
    console.log('Event data', data);

    msg.ack();
  }
}
