import express from 'express';

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/api/health-check', (req, res) => {
  res.send('Health Check');
});

app.listen(PORT, () => {
  console.log('Server is listening at port 4000!!');
});
