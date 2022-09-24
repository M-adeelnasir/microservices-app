import { Publisher, OrderExpirationEvent, Subjects } from '@adcommon/common';

export class OrderExpiredPublisher extends Publisher<OrderExpirationEvent> {
  subject: Subjects.orderExpired = Subjects.orderExpired;
}
