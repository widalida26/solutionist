import { Request, Response } from 'express';
import Container from 'typedi';
import { RecordsService } from '../../service/records';
import errorGenerator from '../../error/errorGenerator';

const submit = async (req: Request, res: Response) => {
  console.log('submit');
  const recordId = Number(req.params['recordId']);
  const answerRate = req.body['answerRate'];

  // 데이터가 누락되거나 유효하지 않을 경우
  if (!recordId || answerRate == null) {
    console.log('aa');
    errorGenerator({ statusCode: 400 });
  }

  // 정답률을 집계할 수 없는 경우 => 모든 문제가 설문
  if (answerRate === -1) {
    res.status(204).json({ recordId });
  }

  // solveRecords 테이블 이용을 위한 recordsService 인스턴스
  const recordsServiceInstance: RecordsService = Container.get(RecordsService);

  // 전체 정답률 집계
  const submmitedId = await recordsServiceInstance.submitRecord(recordId, answerRate);

  res.status(201).json({
    id: submmitedId,
  });
};
export default submit;
