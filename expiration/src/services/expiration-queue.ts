import Queue from 'bull';
import { natsWrapper } from './stanWrapper';
import { OrderExpiredPublisher } from '../publisher/order-expired-publisher';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST_NAME,
  },
});

expirationQueue.process(async (job) => {
  console.log(
    `${job.data.orderId} should be expired now because ute time is over now`
  );

  try {
    await new OrderExpiredPublisher(natsWrapper.client).publish({
      orderId: job.data.orderId,
    });
  } catch (err) {
    console.log('ROOOR====>', err);
  }
});

export { expirationQueue };
