import express from 'express';
import { createConnection, Connection } from 'typeorm';
import { users } from './entity/user';

const app = express();

createConnection({
  type: 'mysql',
  database: `${process.env.RDS_HOST}`,
  username: `${process.env.RDS_USERNAME}`,
  password: `${process.env.RDS_PASSWORD}`,
  host: `${process.env.RDS_HOST}`,
  entities: [users],
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen('8000', () => {
  console.log('hello');
});
