import mongoose from 'mongoose';

interface OrdersDocument extends mongoose.Document {}

const ordersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
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
