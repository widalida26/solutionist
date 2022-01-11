import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { solveStatusRepository } from '../database/repository/solveStatus';
import { ProblemsRepository } from '../database/repository/problems';
import { ChoicesRepository } from '../database/repository/choices';
import { ISolve } from '../interface/ISets';
import { v4 } from 'uuid';

@Service()
export class StatusService {
  constructor(
    @InjectRepository() private statusRepo: solveStatusRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository,
    @InjectRepository() private choicesRepo: ChoicesRepository
  ) {}

  async SelectionRateCalculator(solveInfo: ISolve) {
    // 필요한 정보가 누락된 경우
    if (!solveInfo.problemId || !solveInfo.choice) {
      console.log('aaaa');
      errorGenerator({ statusCode: 400 });
    }

    // 로그인된 유저가 아닌 경우 임의의 id 설정
    if (!solveInfo.solver) {
      solveInfo.solver = v4();
    }

    // problems 테이블에 problemId가 있는지 조회
    const foundProblem = await this.problemsRepo.findOne({
      id: solveInfo.problemId,
    });
    // problems 테이블에 problemId에 해당하는 레코드가 없는 경우
    if (!foundProblem) {
      console.log('bbbb');
      errorGenerator({ statusCode: 400 });
    }

    // choice가 유효한지 확인 => 0 이하거나 가장 마지막 index보다 크면 안됨
    const maxIdx = await this.choicesRepo.getLastChoice();
    if (solveInfo.choice <= 0 || solveInfo.choice > maxIdx) {
      console.log('cccc');
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
