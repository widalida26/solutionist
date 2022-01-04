import { Request, Response } from 'express';
import { ISetsDTO, IProblems, IChoices } from '../../interface/ISets';
import errorGenerator from '../../error/errorGenerator';

const add = (req: Request, res: Response) => {
  const set: ISetsDTO = req.body;
  const problems: IProblems[] = set['problems'];

  // 누락된 데이터가 있을 경우 에러 리턴
  if (!set || !problems) {
    errorGenerator({ statusCode: 400 });
  }

  let userId: number = 1;

  // const choices: IChoices[] = problems.map((problem) => {
  //   return {problem['choices']};c
  // });

  res.send();
};
export default add;
