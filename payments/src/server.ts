import connectDB from './services/db';
import { app } from './services/app';
import { natsConnect } from './services/natsConnect';
import { natsWrapper } from './services/stanWrapper';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Tickets Server is listening at port ${PORT}!!`);
  await connectDB();
  await natsConnect();

  natsWrapper.client.on('close', () => {
    console.log('Nats connection closed');
    process.exit();
  });

  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());
});
