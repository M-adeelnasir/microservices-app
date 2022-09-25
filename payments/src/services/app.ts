import express from 'express';
import 'express-async-errors';
import cookieSeesion from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@adcommon/common';

const app = express();
app.use(express.json());

app.set('trust proxy', true);

app.use(
  cookieSeesion({
    signed: false, //encrypt fales
    secure: true,
  })
);

app.get('/api/payments/health-check', async (req, res) => {
  res.sendStatus(200);
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
