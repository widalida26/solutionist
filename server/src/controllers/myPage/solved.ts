import { Request, Response } from 'express';
import { IUsers } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import Container from 'typedi';

const solveRecords = async (req: Request, res: Response) => {
  const userInfo: IUsers = res.locals.userInfo;

  const setsServiceInstance: SetService = Container.get(SetService);

  const findSet = await setsServiceInstance.findSolveSetsId(userInfo.id);

  console.log(333, { findSet });
  res.json({ findSet });
};

export default solveRecords;
