import { natsWrapper } from './stanWrapper';
import { OrderCancelledEventListener } from '../listeners/order-cancelled-listener';
import { OrderCreatedListener } from '../listeners/order-created-listener';

export const natsConnect = async () => {
  try {
    // await natsWrapper.connect('auth', 'sjhdjhs', 'http://nats-srv:4222');
    //  or

    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
    }
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledEventListener(natsWrapper.client).listen();

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  } catch (err) {
    console.log(err);
  }
};
