import { Request, Response } from 'express';
import Container from 'typedi';
import { IRate } from '../../interface/ISets';
import { SetService } from '../../service/sets';
import errorGenerator from '../../error/errorGenerator';
import { emptyObjectCk } from '../../utils/custom';

const select = async (req: Request, res: Response) => {
  const { setId } = req.params;

  // setId가 유효하지 않을 경우
  if (!Number(setId)) {
    errorGenerator({ statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  await setServiceInstance.SetSelector(Number(setId));

  res.end();
};
export default select;
