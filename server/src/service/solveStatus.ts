import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { solveStatusRepository } from '../database/repository/solveStatus';
import { SolvedRecordsRepository } from '../database/repository/solveRecords';
import { ProblemsRepository } from '../database/repository/problems';
import { ChoicesRepository } from '../database/repository/choices';
import { ISolve } from '../interface/ISets';
import { emptyObjectValueCk } from 'src/utils/custom';

@Service()
export class StatusService {
  constructor(
    @InjectRepository() private statusRepo: solveStatusRepository,
    @InjectRepository() private recrodRepo: SolvedRecordsRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository,
    @InjectRepository() private choicesRepo: ChoicesRepository
  ) {}

  async ProblemSolver(solveInfo: ISolve) {
    // 필요한 정보가 누락된 경우
    if (emptyObjectValueCk(solveInfo)) {
      errorGenerator({ statusCode: 400 });
    }

    // problems 테이블에 problemId가 있는지 조회
    const setId = await this.problemsRepo.findOne(solveInfo.problemId).then((result) => {
      // problems 테이블에 problemId에 해당하는 레코드가 없는 경우
      if (!result) {
        errorGenerator({ statusCode: 400 });
      } else {
        return result.setId;
      }
    });

    // solveRecords 테이블에 recrodId가 있는지 조회
    await this.recrodRepo.findOne({ id: solveInfo.recordId, setId }).then((result) => {
      // solveRecords 테이블에 recrodId가 해당하는 레코드가 없는 경우
      if (!result) {
        errorGenerator({ statusCode: 400 });
      }
    });

    // choice가 유효한지 확인 => 0 이하거나 가장 마지막 index보다 크면 안됨
    const maxIdx = await this.choicesRepo.getLastChoice();
    if (solveInfo.choice <= 0 || solveInfo.choice > maxIdx) {
      errorGenerator({ statusCode: 400 });
    }

    // 풀이 정보 삽입
    const id = await this.statusRepo
      .save({
        ...solveInfo,
      })
      .then((result) => result.id);

    // 선택 비율 집계
    const counted = await this.statusRepo.countByChoice(solveInfo.problemId);

    // 퍼센트 계산
    const selectionRate = [];
    for (let i = 1; i <= maxIdx; i++) {
      let cnt = counted.info[i] ? counted.info[i] : 0;
      selectionRate.push((cnt / counted.total) * 100);
    }

    return {
      id,
      selectionRate,
    };
  }
}
