import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import errorHandler from './middleware/errorResponse';
import { NotFoundError } from './errors/notFound-error';
import connectDB from './services/db';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

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

app.listen(PORT, async () => {
  console.log('Server is listening at port 4000!!');
  await connectDB();
});
