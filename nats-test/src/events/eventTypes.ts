import { Subjects } from './subjects';
export interface TicketCreated {
  subject: Subjects.ticketCreated;
  data: {
    name: string;
    maried: boolean;
    age: number;
  };
}
