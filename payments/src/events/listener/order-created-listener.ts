import {
  Lintener,
  OrderCreated,
  OrderStatus,
  Subjects,
} from '@adcommon/common';
import { Message } from 'node-nats-streaming';
import { QueueGroup } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderCreatedPaymentListener extends Lintener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = QueueGroup.queueGroupName;
  async OnMessage(data: OrderCreated['data'], msg: Message) {
    const order = await Order.create({
      orderId: data.id,
      price: data.ticketId.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });

    console.log('Order creating');

    if (!order) {
      throw new Error('payements order create failed');
    }

    msg.ack();
  }
}
