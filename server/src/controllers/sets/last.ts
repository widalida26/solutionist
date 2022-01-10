import { Request, Response } from 'express';
import Container from 'typedi';
import { IRate } from '../../interface/ISets';
import { IUsers } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import errorGenerator from '../../error/errorGenerator';
import { emptyObjectCk } from '../../utils/custom';

const last = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
  const userInfo: IUsers = res.locals.userInfo ? res.locals.userInfo : { username: null };
  const solveInfo: IRate = req.body;

  // 데이터가 누락됐을 경우
  if (emptyObjectCk(solveInfo)) {
    errorGenerator({ statusCode: 400 });
  }

  console.log(solveInfo);

  //   const searchWord = req.query['title'];

  //   // 쿼리 값이 부적합할 경우
  //   if (!searchWord) {
  //     errorGenerator({ statusCode: 400 });
  //   }

  //   // sets 테이블 이용을 위한 setService 인스턴스
  //   const setServiceInstance: SetService = Container.get(SetService);

  //   await setServiceInstance.SetFinder(searchWord.toString());

  res.end();
};
export default last;
