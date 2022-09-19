import { Publisher, Subjects, TicketCreatedPubCheck } from '@adcommon/common';

export class TicketCreatedEventPublisher extends Publisher<TicketCreatedPubCheck> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
}
