import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SolvedSetsRepository } from '../database/repository/solvedSets';
import { SetsRepository } from '../database/repository/sets';

import { IRate } from '../interface/ISets';

@Service()
export class SolvedService {
  constructor(
    @InjectRepository() private solvedRepo: SolvedSetsRepository,
    @InjectRepository() private setsRepo: SetsRepository
  ) {}
  async AnswerRateCalculator(rateInfo: IRate) {
    // 필요한 정보가 누락된 경우
    if (!rateInfo.setId || !rateInfo.userRate) {
      errorGenerator({ statusCode: 400 });
    }

    const foundSet = await this.setsRepo.findOne(rateInfo.setId);

    // id에 해당하는 세트가 없는 경우
    if (!foundSet) {
      console.log(foundSet);
      errorGenerator({ statusCode: 400 });
    }
  }
}
