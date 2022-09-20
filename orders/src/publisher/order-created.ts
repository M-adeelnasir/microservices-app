import { OrderCreated, Publisher, Subjects } from '@adcommon/common';

export class OrderCreatedPublisher extends Publisher<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
}
