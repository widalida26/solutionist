import Container from 'typedi';
import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';
import { ISetsDTO, IProblems, IChoices } from '../../interface/ISets';
import { sets } from '../../database/entity/sets';
import { SetService } from '../../service/sets';

const add = (req: Request, res: Response) => {
  const setDTO: ISetsDTO = req.body;
  const problems: IProblems[] = setDTO['problems'];

  // 누락된 데이터가 있을 경우 에러 리턴
  if (!setDTO || !problems) {
    errorGenerator({ statusCode: 400 });
  }
  let userId: number = 1;
  // sets 테이블 이용을 위한 setService 인스턴스
  const setServiceInstance: SetService = Container.get(SetService);

  setServiceInstance.setMaker(userId, setDTO);

  // const choices: IChoices[] = problems.map((problem) => {
  //   return {problem['choices']};c
  // });

  res.send();
};
export default add;
