import { Request, Response } from 'express';
import Container from 'typedi';
import { IRate } from '../../interface/ISets';
import { RecordsService } from '../../service/solveRecords';
import errorGenerator from '../../error/errorGenerator';
import { emptyObjectCk } from '../../utils/custom';

const select = async (req: Request, res: Response) => {
  console.log('선택');
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => null 값 할당
  //   const userId: number = res.locals.userInfo ? res.locals.userInfo.id : null;
  //   const solveInfo: IRate = req.body;

  //   // 데이터가 누락됐을 경우
  //   if (emptyObjectCk(solveInfo)) {
  //     errorGenerator({ statusCode: 400 });
  //   }

  //   // solvedSets 테이블 이용을 위한 solvedService 인스턴스
  //   const solvedServiceInstance: RecordsService = Container.get(RecordsService);

  //   // solvedSets 테이블 이용을 위한 solvedService 인스턴스
  //   const rateInfo = await solvedServiceInstance.AnswerRateCalculator(solveInfo, userId);

  //   res.status(201).json({
  //     setId: rateInfo.setId,
  //     totalRate: rateInfo.totalRate,
  //   });
  res.end();
};
export default select;
