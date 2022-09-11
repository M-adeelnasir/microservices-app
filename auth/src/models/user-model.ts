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
  { timestamps: true }
);

const User = mongoose.model<UserDocument>('User', userScehma);

export default User;
