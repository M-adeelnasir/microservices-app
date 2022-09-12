import { Password } from './../services/password';
import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userScehma = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userScehma.pre('save', async function (done) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return done();

  const hash = await Password.hashPassword(this.password);
  user.password = hash;
  return done();
});

const User = mongoose.model<UserDocument>('User', userScehma);

export default User;
