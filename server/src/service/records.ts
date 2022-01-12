import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SolveRecordsRepository } from '../database/repository/solveRecords';
import { SetsRepository } from '../database/repository/sets';
import { IRate } from '../interface/ISets';
import { IdentityStore } from 'aws-sdk';

@Service()
export class RecordsService {
  constructor(
    @InjectRepository() private recordRepo: SolveRecordsRepository,
    @InjectRepository() private setsRepo: SetsRepository
  ) {}

  async recordMaker(setId: number, userId: number): Promise<number> {
    // 해당하는 세트가 없는 경우
    await this.setsRepo.findOne(setId).then((result) => {
      if (!result) {
        errorGenerator({ statusCode: 400 });
      }
    });
    // solveRecords 테이블에 삽입
    const recordId = await this.recordRepo
      .save({ setId, userId })
      .then((result) => (result ? result.id : null));
    // solvedRecords 삽입에 실패한 경우
    if (!recordId) {
      errorGenerator({ statusCode: 500 });
    }
    return recordId;
  }

  async recordSubmitter(recordId: number, userRate: number) {
    // userRate가 유효하지 않을 경우
    if (userRate < 0 || userRate > 100 || !Number(userRate)) {
      errorGenerator({ statusCode: 400 });
    }

    // id에 해당하는 레코드 있는지 확인
    await this.recordRepo.save({ id: recordId, answerRate: userRate });

    return recordId;
  }
}
