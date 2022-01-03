import express from 'express';
import { createConnection, Connection } from 'typeorm';
<<<<<<< HEAD
=======
import errorHandler from './error/errorHandler';

const port = 4000;
>>>>>>> 424479d3c629ef00be645e9f7c096f3fbb8b9f67

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
