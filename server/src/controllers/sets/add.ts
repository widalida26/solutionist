import { Request, Response } from 'express';
import errorGenerator from '../../error/errorGenerator';

import { ISetsDTO, IProblems, IChoices } from '../../../interface/ISets';

const add = (req: Request, res: Response) => {
  const set: ISetsDTO = req.body;
  const problems: IProblems[] = set['problems'];
  const choices: IChoices[] = set['choices'];

  if (!set || !problems || !choices) {
    errorGenerator({ statusCode: 400 });
  }

  //console.log('problems', problems[0]);
  //console.log('choices', choices);
  res.send();
};
export default add;
