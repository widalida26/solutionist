import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwtToken from '../controllers/tokenFunctions';
import { getRepository } from 'typeorm';
import { users } from '../database/entity/users';

const checktoken = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.cookies.accessToken;

  if (!auth) {
    return res.status(403).send('invalid user');
  }

  const authorized = jwtToken.isAuthorized(auth);

  if (!authorized) {
    return res.status(400).send('not authorization');
  }

  const Tokenverify = JSON.parse(authorized.data);

  res.locals.userInfo = Tokenverify;
  next();
};

export default checktoken;
