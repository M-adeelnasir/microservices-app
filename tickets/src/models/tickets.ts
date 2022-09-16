import mongoose from 'mongoose';

interface TicketsDocument extends mongoose.Document {
  title: string;
  price: number;
}

const ticketsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Tickets = mongoose.model<TicketsDocument>('Tickets', ticketsSchema);

export { Tickets };
