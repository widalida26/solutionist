import { Request, Response } from 'express';
import cryptos from '../../utils/crypto';
import { users } from '../../database/entity/users';
import { getRepository } from 'typeorm';
import jwtToken from '../../utils/tokenFunctions/index';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send('ok');
    }

    const info = getRepository(users);
    const user = await info.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).send('Email not found');
    }
    // const saltBase = user.salt;
    // const salt = Buffer.from(saltBase, 'base64');
    // const dbpw = cryptos.encrypt(password, salt);

    const salt = user.password;

    // async/await 사용
    const dbpw = await bcrypt.compare(password, salt);

    console.log(333, dbpw);
    if (dbpw === false) {
      return res.status(401).send('password mismatch');
    }

    delete user.password;
    delete user.salt;
    const userInfo = JSON.stringify(user);
    const accessToken = jwtToken.accessToken(userInfo);
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      type: user.type,
    };
    jwtToken.sendAccessToken(res, accessToken);
    console.log(111, accessToken);
    return res.status(200).json({ data: { payload }, message: 'ok' });
  } catch (err) {
    console.log(res.status);
    return res.status(500).send('internal server error');
    // return res.status(500).send('internal server error');
  }
};

export default login;
