import nats from 'node-nats-streaming';
import { TickerCreatedPublisher } from './events/ticket-created-pub';

console.clear();

const stan = nats.connect('auth', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Pusblisher is connected with nats server');

  const data = {
    name: 'adeel',
    maried: false,
    age: 32,
  };

  const publisher = new TickerCreatedPublisher(stan);
  try {
    await publisher.publish(data);
  } catch (err) {
    console.log(err);
  }
});
