import connectDB from './services/db';
import { app } from './services/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Tickets Server is listening at port ${PORT}!!`);
  await connectDB();
});
