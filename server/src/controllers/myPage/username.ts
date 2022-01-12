import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';
import aws from 'aws-sdk';

const modifyUsername = async (req: Request, res: Response) => {
  try {
    const { email, username } = res.locals.userInfo;

    const info = getRepository(users);
    const findUser = await info.findOne({ where: { email: email } });

    const { newUserName } = req.body;

    if (newUserName === username) {
      return res.status(409).send('duplicate information');
    }
  } catch (err) {}
};

export default modifyUsername;
