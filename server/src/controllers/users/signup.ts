import { Request, Response } from 'express';
import cryptos from '../../utils/crypto';
import { users } from '../../database/entity/users';
import { getConnection } from 'typeorm';
import crypto from 'crypto';

const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).send('successfully signed in');
    }

    console.log(username, email, password);

    const saltBuffer = crypto.randomBytes(16);

    const dbpw = cryptos.encrypt(password, saltBuffer);
    const salt = saltBuffer.toString('base64');

    console.log(dbpw);
    const user = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(users)
      .values([{ username: username, email: email, password: dbpw, salt: salt }])
      .execute();
    return res.status(200).send('successfully signed in');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default signup;
