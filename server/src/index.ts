import express from 'express';
import { createConnection, Connection } from 'typeorm';
import errorHandler from './error/errorHandler';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import usersRouter from './routes/users';
const swaggerDocument = YAML.load('./solutionist.yaml');

const port = 4000;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);

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
