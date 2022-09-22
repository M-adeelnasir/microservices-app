import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketsDocument extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  orderId?: string;
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
    orderId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        // delete ret.__v;
      },
    },
  }
);

ticketsSchema.set('versionKey', 'version');
ticketsSchema.plugin(updateIfCurrentPlugin);

// ticketsSchema.pre('save', function (done) {
//   this.$where= {
//   this:this.get("version")-1
//   }
//   done()
// })

const Tickets = mongoose.model<TicketsDocument>('Tickets', ticketsSchema);

export { Tickets };
