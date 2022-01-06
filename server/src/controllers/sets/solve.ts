import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO, ISolveDTO } from '../../interface/ISets';
import { IUsersDTO } from '../../interface/IUsers';
import { SetService } from '../../service/sets';
import { solvedSets } from '../../database/entity/solvedSets';
import { v4 } from 'uuid';
import { emptyObjectCk } from '../../utils/custom';

const solve = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => 빈 객체 할당
  const userInfo: IUsersDTO = res.locals.userInfo ? res.locals.userInfo : {};

  // 로그인된 유저가 아닌 경우 임의의 id 설정
  if (emptyObjectCk(userInfo)) {
    userInfo.id = v4();
  }

  const solveDTO: ISolveDTO = req.body;
  // 데이터가 누락됐을 경우
  if (emptyObjectCk(solveDTO)) {
    errorGenerator({ statusCode: 400 });
  }
  console.log('solve', solveDTO);
  //   // 쿼리 값이 부적합할 경우
  //   if (!searchWord) {
  //     errorGenerator({ statusCode: 400 });
  //   }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  res.end();
};
export default solve;
