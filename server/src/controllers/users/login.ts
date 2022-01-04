import { Request, Response } from 'express';
import cryptos from '../../crypto';
import { users } from '../../database/entity/users';
//import errorGenerator from '../../error/errorGenerator';
import { getConnection, getRepository } from 'typeorm';
import jwtToken from '../tokenFunctions/index';

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).send('ok');
    }

    const dbpw = cryptos.encrypt(password);

    const user = await getRepository(users)
      .createQueryBuilder('user')
      .where('user.username = :username OR user.password = :password', {
        username: username,
        password: dbpw,
      })
      .getOneOrFail();

    console.log(user);
    if (!user) {
      return res.status(401).send('"invalid user"');
    }
    console.log(222);
    delete user.password;
    const userInfo = JSON.stringify(user);
    const accessToken = jwtToken.accessToken(userInfo);
    const refreshToken = jwtToken.refreshToken(userInfo);

    console.log(333);
    jwtToken.sendRefreshToken(res, refreshToken);
    jwtToken.sendAccessToken(res, accessToken);
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
    // return res.status(500).send('internal server error');
  }
};

export default login;
