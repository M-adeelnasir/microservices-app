import {
  Lintener,
  OrderCancelled,
  OrderStatus,
  Subjects,
} from '@adcommon/common';
import { Message } from 'node-nats-streaming';
import { QueueGroup } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderCancelPaymentsListener extends Lintener<OrderCancelled> {
  subject: Subjects.orderCancelled = Subjects.orderCancelled;
  queueGroupName = QueueGroup.queueGroupName;

  async OnMessage(data: OrderCancelled['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error('Invalid Order ID!');
    }

    order.set({ status: OrderStatus.Cancelled });

    order.save();

    msg.ack();
  }
}
