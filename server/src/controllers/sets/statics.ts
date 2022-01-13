import { Request, Response } from 'express';
import Container from 'typedi';
import { StatusService } from '../../service/status';
import errorGenerator from '../../error/errorGenerator';

const statics = async (req: Request, res: Response) => {
  const recordId = Number(req.params['recordId']);
  const solver = req.body['solver'];

  // 데이터가 누락되거나 유효하지 않을 경우
  if (!recordId || !solver) {
    errorGenerator({ statusCode: 400 });
  }

  // solveStatus 테이블 이용을 위한 statusService 인스턴스
  const statusServiceInstance: StatusService = Container.get(StatusService);

  // 통계 집계
  await statusServiceInstance.getStatics(recordId, solver);

  res.send();
};
export default statics;
