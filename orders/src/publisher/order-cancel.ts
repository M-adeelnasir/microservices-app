import { OrderCancelled, Publisher, Subjects } from '@adcommon/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelled> {
  subject: Subjects.orderCancelled = Subjects.orderCancelled;
}
