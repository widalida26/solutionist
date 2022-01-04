import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { createConnection } from 'typeorm';
import setsRouter from './routes/sets';
import errorHandler from './error/errorHandler';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import usersRouter from './routes/users';
//import errorGenerator, { ErrorWithStatusCode } from './error/errorGenerator';
const swaggerDocument = YAML.load('./solutionist.yaml');

const port = 4000;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db connection
app.use('/user', usersRouter);

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));

// basic routing
app.get('/', (req, res) => {
  res.send('hello');
});
app.get('/hello', (req, res) => {
  //errorGenerator({ statusCode: 500 });
});

// routing to controllers
app.use(setsRouter);

// error handler
//app.use(errorHandler);

app.use(errorHandler);
// app.use(function (
//   err: ErrorWithStatusCode,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log('에러발생');
//   // logic
// });

// server listening
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
