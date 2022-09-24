import { Lintener, OrderCreated, Subjects } from '@adcommon/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../services/expiration-queue';

import { QueueGroup } from './queue-group-name';

export class OrderCreatedListener extends Lintener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = QueueGroup.OrderQueueGroupName;

  OnMessage(data: OrderCreated['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    console.log('This job will be trigger after ====>', delay);

    expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
