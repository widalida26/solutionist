import { Request, Response } from 'express';
import Container from 'typedi';
import { RecordsService } from '../../service/records';
import errorGenerator from '../../error/errorGenerator';

const submit = async (req: Request, res: Response) => {
  const recordId = Number(req.params['recordId']);
  const userRate = req.body['userRate'];

  // 데이터가 누락되거나 유효하지 않을 경우
  if (!recordId || !userRate) {
    errorGenerator({ statusCode: 400 });
  }

  // solveRecords 테이블 이용을 위한 recordsService 인스턴스
  const recordsServiceInstance: RecordsService = Container.get(RecordsService);

  // 전체 정답률 집계
  const submmitedId = await recordsServiceInstance.recordSubmitter(recordId, userRate);

  res.status(201).json({
    id: submmitedId,
  });
};
export default submit;
