import { Request, Response } from 'express';
const { encrypt } = require('./crypto');
import { users } from '../../../dist/src';

const signup = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(422).send('insufficient parameters supplied');
    }
    // encrypt(password); 다 만들고 나서 적용 시작
    const createUser = await users.create({
      username: userName,
      password: password,
      email: email,
    });
    return res.status(200).send('ok');
  } catch (err) {
    return res.status(400).send('internal server error');
  }
};

export default signup;
