import { Request, Response } from 'express';
import cryptos from '../../crypto';
import { users } from '../database/entity/users';
import errorGenerator from '../../error/errorGenerator';
import { getConnection } from 'typeorm';

const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).send('successfully signed in');
    }

    console.log(username, email, password);
    const dbpw = cryptos.encrypt(password);

    console.log(dbpw);
    const user = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(users)
      .values([{ username: username, email: email, password: dbpw }])
      .execute();
    return res.status(200).send('successfully signed in');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
    // return res.status(500).send('internal server error');
  }
};

export default signup;
