import { Subjects } from './subjects';
export interface TicketCreated {
  subject: Subjects.ticketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
