import express from 'express';
import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import errorHandler from './middleware/errorResponse';
import { NotFoundError } from './errors/notFound-error';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);
app.get('/api/health-check', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log('Server is listening at port 4000!!');
});
