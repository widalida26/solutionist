import { Request, Response } from 'express';
import { users } from '../../database/entity/users';
import { getRepository, getConnection } from 'typeorm';
import 'dotenv/config';

const modifyPassword = async (req: Request, res: Response) => {
  try {
    const { email } = res.locals.userInfo;

    const info = getRepository(users);
    const findUser = await info.findOne({ where: { email: email } });

    const { newPassword } = req.body;

    if (newPassword === findUser.password) {
      return res.status(409).send('duplicate information');
    }
    await getConnection()
      .createQueryBuilder()
      .update(users)
      .set({ password: newPassword })
      .where('id = :id', { id: findUser.id })
      .execute();

    return res.status(201).send('successfully password changed');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default modifyPassword;
