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
  async AnswerRateCalculator(rateInfo: IRate, userId: number): Promise<IRate> {
    // 필요한 정보가 누락된 경우
    if (!rateInfo.setId || !rateInfo.userRate) {
      errorGenerator({ statusCode: 400 });
    }

    // userRate가 유효하지 않을 경우
    if (rateInfo.userRate < 0 || rateInfo.userRate > 100) {
      errorGenerator({ statusCode: 400 });
    }

    // id에 해당하는 세트가 있는지 확인
    const foundSet = await this.setsRepo.findOne(rateInfo.setId);
    // id에 해당하는 세트가 없는 경우
    if (!foundSet) {
      errorGenerator({ statusCode: 400 });
    }

    // id에 해당하는 세트가 있는지 확인
    await this.solvedRepo.save({
      setId: rateInfo.setId,
      userId,
      answerRate: rateInfo.userRate,
    });

    // 해당 세트의 평균 구하기
    rateInfo.totalRate = await this.solvedRepo.getAvgRate(rateInfo.setId);
    return rateInfo;
  }
}
