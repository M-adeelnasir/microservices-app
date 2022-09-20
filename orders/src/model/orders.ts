import mongoose from 'mongoose';
import { TicketDoc } from './tickets';
import { OrderStatus } from '@adcommon/common';

interface OrdersDocument extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticketId: TicketDoc;
}

const ordersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    ticketId: {
      type: mongoose.Types.ObjectId,
      ref: 'Ticket',
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

const Order = mongoose.model<OrdersDocument>('Orders', ordersSchema);

export { Order };
