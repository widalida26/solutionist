import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import errorHandler from './error/errorHandler';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import usersRouter from './routes/users';
import setsRouter from './routes/sets';

useContainer(Container);
// db connection
createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));

const port = 4000;
const app = express();

//const swaggerDocument = YAML.load('./solutionist.yaml');
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// basic routing
app.get('/', (req, res) => {
  res.send('hello');
});
app.use('/users', usersRouter);
// routing to controllers
app.use(setsRouter);

// error handler
app.use(errorHandler);

// server listening
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
