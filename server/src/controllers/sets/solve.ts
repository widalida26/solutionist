import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO, ISolveDTO } from '../../interface/ISets';
import { IUsersDTO } from '../../interface/IUsers';
import { uProblemsService } from '../../service/usersProblems';
import { solvedSets } from '../../database/entity/solvedSets';
import { emptyObjectCk } from '../../utils/custom';
import { usersProblems } from 'src/database/entity/usersProblems';

const solve = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => 빈 객체 할당
  const userInfo: IUsersDTO = res.locals.userInfo ? res.locals.userInfo : {};

  const solveDTO: ISolveDTO = req.body;
  // 데이터가 누락됐을 경우
  if (emptyObjectCk(solveDTO)) {
    errorGenerator({ statusCode: 400 });
  }

  // usersProblems 테이블 이용을 위한 usersProblems 인스턴스
  const upServiceInstance: uProblemsService = Container.get(uProblemsService);

  upServiceInstance.uProblemsMaker(solveDTO);

  res.end();
};
export default solve;
