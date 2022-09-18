import { TicketCreatedListener } from './events/ticket-created';
import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('auth', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to nats server');

  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
