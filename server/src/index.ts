import express from 'express';
import { createConnection, Connection } from 'typeorm';
import { users } from './entity/user';

const app = express();

createConnection({
  type: 'mysql',
  database: 'solutionist',
  username: 'admin',
  password: '20211229',
  host: 'codestates-project.c4i369t7q8dg.ap-northeast-2.rds.amazonaws.com',
  entities: [users],
}).catch((err) => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen('8000', () => {
  console.log('hello');
});
