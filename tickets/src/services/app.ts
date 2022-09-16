import express from 'express';
import 'express-async-errors';
import cookieSeesion from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@adcommon/common';
import { createTickets } from '../routes/createTickets';
import { getTicket } from '../routes/singleTickets';
import { updateTicket } from '../routes/updateTicket';

const app = express();
app.use(express.json());

app.set('trust proxy', true);

app.use(
  cookieSeesion({
    signed: false, //encrypt fales
    secure: true,
  })
);
app.use(currentUser);
app.use(updateTicket);
app.use(createTickets);
app.use(getTicket);

app.get('/api/tickets/health-check', (req, res) => {
  res.sendStatus(200);
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
