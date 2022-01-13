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

    // createConnection().then(async (connection) => {
    //   console.log(555);
    //   const removeUser = await connection.manager.findOne(users, {
    //     where: { id: id, email: email },
    //   });
    //   console.log(444);
    //   await connection.manager.remove(removeUser);
    // }).catch(error => console.log(error));

    return res.status(200).send('successfully signed out');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default signout;
