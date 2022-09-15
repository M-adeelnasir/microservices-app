import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined');
    }
    if (!process.env.MONGO_URI) {
      throw new Error('Tickets MONGO_URI in not defined');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected');
  } catch (err) {
    console.log(err);

    console.log('DB CONNECTING ERROR');
  }
};

export default connectDB;
