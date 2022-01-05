import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwtToken from '../controllers/tokenFunctions';
import { getRepository } from 'typeorm';
import { users } from '../database/entity/users';

export const Token = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.cookies.accessToken;

  if (!auth) {
    return res.status(403).send('invalid user');
  }

  const authorized = jwtToken.isAuthorized(auth);

  if (!authorized) {
    return res.status(400).send('not authorization');
  }

  let dt = JSON.parse(authorized.data);
  const email = dt.email;

  const info = getRepository(users);
  const findUser = await info.findOne({ where: { email: email } });

  if (!findUser) {
    return res.status(401).send('userInfo does not exist');
  }

  res.locals.userInfo = findUser;
  next();
};
