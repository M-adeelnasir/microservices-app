import express from 'express';
import 'express-async-errors';
import cookieSeesion from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@adcommon/common';
import { ordersCreateRoute } from '../routes/create-order';
import { orderGetRoute } from '../routes/get-order';
import { orderCancelRoute } from '../routes/cancel-order';
import { ordersGetRoute } from '../routes/get-orders';

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

app.use(orderCancelRoute);
app.use(orderGetRoute);
app.use(ordersCreateRoute);
app.use(ordersGetRoute);

app.get('/api/orders/health-check', (req, res) => {
  res.sendStatus(200);
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
