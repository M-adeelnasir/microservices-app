import express from 'express';
import fs from 'fs';

const app = express();
import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get('/api/health-check', (req, res) => {
  res.send('Health Check');
});

app.listen(PORT, () => {
  console.log('Server is listening at port 4000!!');
});
