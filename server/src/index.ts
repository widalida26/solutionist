import express from 'express';
import { createConnection, Connection } from 'typeorm';
import errorHandler from './error/errorHandler';

const port = 4000;

const app = express();

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('hello');
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
