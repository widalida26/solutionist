import { Request, Response } from 'express';
import cryptos from '../../utils/crypto';
import { users } from '../../database/entity/users';
import { getRepository } from 'typeorm';
import jwtToken from '../../utils/tokenFunctions/index';

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
    const saltBase = user.salt;
    const salt = Buffer.from(saltBase, 'base64');
    const dbpw = cryptos.encrypt(password, salt);

    const userpw = await info.findOne({ where: { email: email, password: dbpw } });
    if (!userpw) {
      return res.status(401).send('password mismatch');
    }

    delete userpw.password;
    delete userpw.salt;
    const userInfo = JSON.stringify(userpw);
    const accessToken = jwtToken.accessToken(userInfo);
    const payload = {
      id: userpw.id,
      username: userpw.username,
      email: userpw.email,
      profileImage: userpw.profileImage,
      type: userpw.type,
    };
    jwtToken.sendAccessToken(res, accessToken);
    console.log(111, accessToken);
    return res.status(200).json({ data: { payload }, message: 'ok' });
  } catch (err) {
    console.log(err);
    console.log(res.status);
    return res.status(500).send('internal server error');
    // return res.status(500).send('internal server error');
  }
};

export default login;
