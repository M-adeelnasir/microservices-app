import mongoose from 'mongoose';
import { OrderStatus } from '@adcommon/common';
import { Order } from './orders';

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.methods.isReserved = async function () {
  const order = await Order.findOne({
    ticketId: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPaymnet,
        OrderStatus.Complete,
      ],
    },
  });
  return !!order;
};

const Ticket = mongoose.model<TicketDoc>('Ticket', ticketSchema);
export { Ticket };
