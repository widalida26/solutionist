import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import errorGenerator from '../../error/errorGenerator';
import { getRepository, getConnection } from 'typeorm';

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('accessToken');
    return res.status(200).send('successfully logout');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default logout;
