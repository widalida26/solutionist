import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { createConnection } from 'typeorm';
import setsRouter from './routes/sets';
import errorHandler from './error/errorHandler';

const port = 4000;

const app = express();

app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('hello');
});
app.use(setsRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
