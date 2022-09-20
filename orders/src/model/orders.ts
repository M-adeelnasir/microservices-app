import mongoose from 'mongoose';
import { TicketDoc } from './tickets';

interface OrdersDocument extends mongoose.Document {
  userId: string;
  status: string;
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

const Orders = mongoose.model<OrdersDocument>('Orders', ordersSchema);

export { Orders };
