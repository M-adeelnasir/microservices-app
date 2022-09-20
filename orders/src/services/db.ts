import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined');
    }
    if (!process.env.MONGO_URI) {
      throw new Error('Orders MONGO_URI in not defined');
    }
    // await natsWrapper.connect('auth', 'sjhdjhs', 'http://nats-srv:4222');
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('Orders DB Connected');
  } catch (err) {
    console.log(err);

    console.log('ORDERS DB CONNECTING ERROR');
  }
};

export default connectDB;
