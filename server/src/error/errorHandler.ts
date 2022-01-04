import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ErrorWithStatusCode } from './errorGenerator';

const HTTP_STATUS_MESSAGES = {
  400: 'insufficient information',
  401: 'invalid user',
  409: 'duplicate information',
  500: 'internal Server Error',
  422: 'insufficient parameters supplied',
};

const errorHandler: ErrorRequestHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('에러발생');
  const { message, statusCode } = err;
  res.status(statusCode || 500).json({ message });
};

export default errorHandler;
