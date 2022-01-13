import { Request, Response } from 'express';
import { IUsers } from '../../interface/IUsers';
import { RecordsService } from '../../service/records';

const made = async (req: Request, res: Response) => {
  console.log('hello');
  const userInfo: IUsers = res.locals.userInfo;

  console.log(111, userInfo);
};

export default made;
