import {
  Publisher,
  Subjects,
  TicketCreatedPubCheck,
  TicketUpdatedCheck,
} from '@adcommon/common';

export class TicketCreatedEventPublisher extends Publisher<TicketCreatedPubCheck> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
}

export class TicketUpdatedEventPublisher extends Publisher<TicketUpdatedCheck> {
  subject: Subjects.ticketUpdated = Subjects.ticketUpdated;
}
