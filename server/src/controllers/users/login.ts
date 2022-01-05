import { Request, Response } from 'express';
import cryptos from '../../crypto';
import { users } from '../../database/entity/users';
import errorGenerator from '../../error/errorGenerator';
import { getRepository } from 'typeorm';
import jwtToken from '../tokenFunctions/index';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send('ok');
    }

    const dbpw = cryptos.encrypt(password);
    const info = getRepository(users);
    const user = await info.findOne({ where: { email: email, password: dbpw } });
    console.log(user);
    if (!user) {
      return res.status(401).send('"invalid user"');
    }
    delete user.password;
    const userInfo = JSON.stringify(user);
    const accessToken = jwtToken.accessToken(userInfo);

    jwtToken.sendAccessToken(res, accessToken);
    console.log(accessToken);
    return res.status(200).send('ok');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
    // return res.status(500).send('internal server error');
  }
};

export default login;
