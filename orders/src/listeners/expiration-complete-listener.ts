import {
  Lintener,
  Subjects,
  OrderExpirationEvent,
  OrderStatus,
} from '@adcommon/common';
import { Message } from 'node-nats-streaming';
import { QueueGroups } from './queue-group-name';
import { Order } from '../model/orders';
import { OrderCancelledPublisher } from '../publisher/order-cancel';
import { natsWrapper } from '../services/stanWrapper';

export class OrderExpirationCompleteListener extends Lintener<OrderExpirationEvent> {
  subject: Subjects.orderExpired = Subjects.orderExpired;
  queueGroupName = QueueGroups.queueGroupName;

  async OnMessage(data: OrderExpirationEvent['data'], msg: Message) {
    const order = await Order.findById({ _id: data.orderId }).populate(
      'ticketId'
    );

    if (!order) {
      throw new Error('Invalid Order Id');
    }

    order.set({ status: OrderStatus.Cancelled });

    order.save();

    console.log('ORDER IS ---->', order);

    try {
      await new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        ticketId: {
          id: order.ticketId.id,
        },
      });
    } catch (err) {
      console.log('Error===>', err);
    }

    msg.ack();
  }
}
