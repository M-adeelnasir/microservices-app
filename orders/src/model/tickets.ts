import mongoose from 'mongoose';
import { OrderStatus } from '@adcommon/common';
import { Order } from './orders';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { doesNotMatch } from 'assert';

export interface TicketDoc extends mongoose.Document {
  title: string;
  _id: string;
  price: number;
  version: number;
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
        delete ret.__v;
      },
    },
  }
);

ticketSchema.set('versionKey', 'version');

ticketSchema.plugin(updateIfCurrentPlugin);

//OR
// ticketSchema.pre('save', function (done) {
//   this.$where = {
//     version: this.get('version') - 1,
//   };
//   done();
// });

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
