import { natsWrapper } from './stanWrapper';

export const natsConnect = async () => {
  try {
    await natsWrapper.connect('auth', 'sjhdjhs', 'http://nats-srv:4222');

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
