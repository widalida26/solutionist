import { Request, Response } from 'express';
import Container from 'typedi';
import { RecordsService } from '../../service/records';
import { StatusService } from '../../service/status';
import errorGenerator from '../../error/errorGenerator';
import { record } from '.';

const statics = async (req: Request, res: Response) => {
  const recordId = Number(req.params['recordId']);

  // 데이터가 누락되거나 유효하지 않을 경우
  if (!recordId) {
    errorGenerator({ statusCode: 400 });
  }

  // solveStatus 테이블 이용을 위한 statusService 인스턴스
  const statusServiceInstance: StatusService = Container.get(StatusService);
  // 유저들의 선택지 반환
  const userChoices = await statusServiceInstance.getUserChoices(recordId);

  // solveRecords 테이블 이용을 위한 solveRecords 인스턴스
  const recordsServiceInstance: RecordsService = Container.get(RecordsService);
  // 해당 세트의 전체 정답률 집계
  const totalRate = await recordsServiceInstance.getTotalAnswerRate(recordId);

  res.status(200).json({
    totalRate,
    userChoices,
  });
};
export default statics;
