import Queue from 'bull';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST_NAME,
  },
});

expirationQueue.process(async (job, done) => {
  console.log(
    `${job.data.orderId} should be expired now because ute time is over now`
  );
});

export { expirationQueue };
