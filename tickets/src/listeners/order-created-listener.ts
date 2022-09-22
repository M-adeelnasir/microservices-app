import { Lintener, OrderCreated, Subjects } from '@adcommon/common';
import { QueueGroup } from './quere-group-name';

export class OrderCreatedListener extends Lintener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = QueueGroup.queueGroupName;
}
