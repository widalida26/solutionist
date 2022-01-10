import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SolvedSetsRepository } from '../database/repository/solvedSets';
import { uProblemsRepository } from '../database/repository/usersProblems';
import { ProblemsRepository } from '../database/repository/problems';
import { ChoicesRepository } from '../database/repository/choices';
import { IRate } from '../interface/ISets';

@Service()
export class SolvedService {
  constructor(@InjectRepository() private solved: SolvedSetsRepository) {}
  async AnswerRateCalculator(rateInfo: IRate) {
    console.log('calc');
    // 필요한 정보가 누락된 경우
    if (!rateInfo.setId || !rateInfo.userRate) {
      errorGenerator({ statusCode: 400 });
    }
  }
}
