import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { createConnection } from 'typeorm';
import setsRouter from './routes/sets';
import errorHandler from './error/errorHandler';
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

// db connection
app.use('/users', usersRouter);

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));

// basic routing
app.get('/', (req, res) => {
  res.send('hello');
});

// routing to controllers
app.use(setsRouter);

// error handler
app.use(errorHandler);

// server listening
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
