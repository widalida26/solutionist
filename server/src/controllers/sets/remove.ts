import { Request, Response } from 'express';
import Container from 'typedi';

import { SetService } from '../../service/sets';
import errorGenerator from '../../error/errorGenerator';
import { checkEmptyObject } from '../../utils/custom';

const remove = async (req: Request, res: Response) => {
  const collectionId = req.query['collectionId'];

  // 쿼리 값이 부적합할 경우
  if (!collectionId) {
    errorGenerator({ statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);
  // collection
  setServiceInstance;

  res.status(201).json({ id: collectionId });
};
export default remove;
