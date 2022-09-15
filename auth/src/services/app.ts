import express from 'express';
import 'express-async-errors';
import cookieSeesion from 'cookie-session';
import { currentUserRouter } from '../routes/currentUser';
import { signinRouter } from '../routes/signin';
import { signupRouter } from '../routes/signup';
import { signoutRouter } from '../routes/signout';
import { errorHandler, NotFoundError } from '@adcommon/common';

const app = express();
app.use(express.json());

app.set('trust proxy', true);

app.use(
  cookieSeesion({
    signed: false, //encrypt fales
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get('/api/health-check', (req, res) => {
  res.sendStatus(200);
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

//without express-async-errors
// app.all('*', async (req, res, next) => {
//   next(new NotFoundError());
// });

export { app };
