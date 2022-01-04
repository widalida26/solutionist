import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwtToken from '../controllers/tokenFunctions';

const accessToken = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.cookies;

  if (!auth) {
    return res.status(401).send('invalid user');
  }

  let token = auth.split(' ')[1];

  jwtToken.isAuthorized(token);
};
