import { Request, Response } from 'express';
import errorGenerator from 'src/error/errorGenerator';
import ErrorWithStatusCode from 'src/error/errorGenerator';
//import { ErrorWithStatusCode } from 'src/error/errorHandler';

import { ISets, IProblems, IChoices } from '../../../interface/ISets';

const add = (req: Request, res: Response) => {
  const set: ISets = req.body;
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
