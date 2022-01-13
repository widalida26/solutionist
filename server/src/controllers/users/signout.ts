import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import errorGenerator from '../../error/errorGenerator';
import { getRepository, getConnection } from 'typeorm';

const signout = async (req: Request, res: Response) => {
  try {
    const { id, email } = res.locals.userInfo;
    res.clearCookie('accessToken');
    const removeUser = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(users)
      .where('id = :id OR email = :email', { id: id, email: email })
      .execute();

    return res.status(200).send('successfully signed out');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default signout;
