import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO, ISolveDTO } from '../../interface/ISets';
import { IUsersDTO } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import { solvedSets } from 'src/database/entity/solvedSets';
import { v4 } from 'uuid';

const solve = async (req: Request, res: Response) => {
  const userInfo: IUsersDTO = res.locals.userInfo ? res.locals.userInfo : {};

  if (!userInfo) {
    console.log(v4());
    userInfo.id = v4();
  }
  console.log(userInfo.id);
  //const searchWord = req.query['title'];

  const solveDTO: ISolveDTO = req.body;
  console.log(solveDTO);
  //   // 쿼리 값이 부적합할 경우
  //   if (!searchWord) {
  //     errorGenerator({ statusCode: 400 });
  //   }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  res.end();
};
export default solve;
