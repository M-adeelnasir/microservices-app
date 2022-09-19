import { natsWrapper } from './stanWrapper';

export const natsConnect = async () => {
  try {
    await natsWrapper.connect('auth', 'sjhdjhs', 'http://nats-srv:4222');
  } catch (err) {
    console.log(err);
  }
};
