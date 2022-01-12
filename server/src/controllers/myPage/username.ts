import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';

const modifyUsername = async (req: Request, res: Response) => {
  try {
    const { id, username } = res.locals.userInfo;

    const { newUserName } = req.body;

    if (newUserName === username) {
      return res.status(409).send('duplicate information');
    }
    await getConnection()
      .createQueryBuilder()
      .update(users)
      .set({ username: newUserName })
      .where('id = :id', { id: id })
      .execute();

    return res
      .status(201)
      .json({ data: newUserName, message: 'successfully user name changed' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default modifyUsername;
