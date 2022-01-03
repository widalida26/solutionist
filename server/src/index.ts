import express from 'express';
import { createConnection, Connection } from 'typeorm';
import errorGenerator from './error/errorGenerator';
import generalErrorHandler from './error/errorHandler';

const port = 4000;

const app = express();

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/login', (req, res) => {
  errorGenerator({ statusCode: 500 });
});

app.use(generalErrorHandler);
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
