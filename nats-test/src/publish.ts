import nats from 'node-nats-streaming';
console.clear();

const stan = nats.connect('auth', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Pusblisher is connected with nats server');

  const data = {
    name: 'adeel',
    maried: false,
    age: 32,
  };

  stan.publish('ticket:created', JSON.stringify(data), () => {
    console.log('Event published');
  });
});
