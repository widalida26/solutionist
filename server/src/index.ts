import express from 'express';
import { createConnection, Connection } from 'typeorm';

const app = express();

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen('8000', () => {
  console.log('hello');
});
