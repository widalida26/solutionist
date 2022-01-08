import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import axios from 'axios';
import jwtToken from '../../utils/tokenFunctions/index';

interface MulterRequest extends Request {
  file: any;
}

const image = async (req: Request, res: Response) => {
  const { id, email, profileImage } = res.locals.userInfo;
  try {
    const image = (req as MulterRequest).file.location;
    if (image === undefined) {
      return res.status(400).send('not exists image');
    }
    const info = getRepository(users);
    const findUser = await info.findOne({ where: { email: email } });
  } catch {}
};

export default image;
