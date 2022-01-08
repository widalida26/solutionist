import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { SetService } from '../../service/sets';

const search = async (req: Request, res: Response) => {
  const searchWord = req.query['title'];

  // 쿼리 값이 부적합할 경우
  if (!searchWord) {
    errorGenerator({ statusCode: 400 });
  }

  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  await setServiceInstance.SetFinder(searchWord.toString());

  res.end();
};
export default search;
