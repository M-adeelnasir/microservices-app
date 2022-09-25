import { OrderStatus } from '@adcommon/common';
import mongoose from 'mongoose';

export interface OrderDocument extends mongoose.Document {
  userId: string;
  version: number;
  price: number;
  status: OrderStatus;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export { Order };
