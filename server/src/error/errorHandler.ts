import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ErrorWithStatusCode } from './errorGenerator';

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
