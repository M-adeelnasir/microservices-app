import connectDB from './services/db';
import { app } from './services/app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log('Server is listening at port 4000!!');
  await connectDB();
});
