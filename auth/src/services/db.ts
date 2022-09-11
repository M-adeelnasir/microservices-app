import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('DB Connected');
  } catch (err) {
    console.log(err);

    console.log('DB CONNECTING ERROR');
  }
};

export default connectDB;
