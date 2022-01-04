import { Request, Response } from 'express';
import { ISetsDTO, IProblems, IChoices } from '../../../interface/ISets';
import errorGenerator from '../../error/errorGenerator';

const add = (req: Request, res: Response) => {
  const set: ISetsDTO = req.body;
  const problems: IProblems[] = set['problems'];
  // const choices: IChoices[] = problems.map((problem) => {
  //   return {problem['choices']};
  // });

  // 누락된 데이터가 있을 경우 에러 리턴
  // if (!set || !problems || !choices) {
  //   errorGenerator({ statusCode: 400 });
  // }

  res.send();
};
export default add;
