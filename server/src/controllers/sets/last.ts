import { Request, Response } from 'express';
import Container from 'typedi';
import { IRate } from '../../interface/ISets';
import { IUsers } from '../../interface/IUsers';
import { SolvedService } from '../../service/solvedSets';
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

  // solvedSets 테이블 이용을 위한 solvedService 인스턴스
  const solvedServiceInstance: SolvedService = Container.get(SolvedService);

  //
  await solvedServiceInstance.AnswerRateCalculator(solveInfo);

  res.end();
};
export default last;
