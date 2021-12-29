import express from 'express';
import { createConnection } from 'typeorm';

const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen('8000', () => {
  console.log('hello');
});
