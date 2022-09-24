import express from 'express';
import 'express-async-errors';
import cookieSeesion from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@adcommon/common';
import { ordersCreateRoute } from '../routes/create-order';
import { orderGetRoute } from '../routes/get-order';
import { orderCancelRoute } from '../routes/cancel-order';
import { ordersGetRoute } from '../routes/get-orders';
import { Ticket } from '../model/tickets';
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

app.use(ordersCreateRoute);
app.use(orderCancelRoute);
// app.use(orderGetRoute);
// app.use(ordersGetRoute);

app.get('/api/orders/health-check', async (req, res) => {
  const ticktes = await Ticket.find({});

  res.send(ticktes);
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
