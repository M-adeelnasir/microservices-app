import { natsConnect } from './services/natsConnect';
import { natsWrapper } from './services/stanWrapper';

const start = async function () {
  await natsConnect();

  natsWrapper.client.on('close', () => {
    console.log('Nats connection closed');
    process.exit();
  });

  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());
};

start();
