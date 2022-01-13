import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SolveStatusRepository } from '../database/repository/solveStatus';
import { SolveRecordsRepository } from '../database/repository/solveRecords';
import { ChoicesRepository } from '../database/repository/choices';
import { StatusRecordsRepository } from '../database/repository/statusRecords';
import { ISolve } from '../interface/ISets';
import { checkEmptyObjectValue, convertRawObject } from '../utils/custom';

@Service()
export class StatusService {
  constructor(
    @InjectRepository() private statusRepo: SolveStatusRepository,
    @InjectRepository() private recordRepo: SolveRecordsRepository,
    @InjectRepository() private choicesRepo: ChoicesRepository,
    @InjectRepository() private srRepo: StatusRecordsRepository
  ) {}

  async solveProblem(solveInfo: ISolve) {
    // 필요한 정보가 누락된 경우
    if (checkEmptyObjectValue(solveInfo)) {
      errorGenerator({ statusCode: 400 });
    }

    // 삽입할 데이터 검증
    await this.verifyStatusToSave(solveInfo.recordId, solveInfo.problemId);

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
    const selectionRate = await this.calcSelectionRate(maxIdx, solveInfo.problemId);

    // 선택 비율 저장
    selectionRate.map(async (rate) => {
      await this.srRepo.save({
        recordId: solveInfo.recordId,
        statusId: id,
        rate: rate,
      });
    });

    return {
      id,
      selectionRate,
    };
  }

  async verifyStatusToSave(recordId: number, problemId: number) {
    // solveRecords 테이블에 recrodId가 있는지 조회
    await this.recordRepo.findOne({ id: recordId }).then((result) => {
      // solveRecords 테이블에 recrodId가 해당하는 레코드가 없는 경우
      if (!result) {
        errorGenerator({ statusCode: 400 });
      }
    });

    // 같은 recordId와 problemId를 가진 데이터는 삽입할 수 없음
    await this.statusRepo.checkDuplicate(recordId, problemId).then((result) => {
      if (result) {
        errorGenerator({ statusCode: 400 });
      }
    });
  }

  async calcSelectionRate(maxIdx: number, problemId: number) {
    // problemId에 해당하는 solveStatus 레코드 카운트
    const counted = await this.statusRepo.countByChoice(problemId).then((reuslt) => {
      const cntInfo = { total: 0, info: {} };
      reuslt.forEach((el) => {
        let map = convertRawObject(el);
        // 문제 번호 : 숫자 형태의 Map으로 변환
        let cnt = Number(map['cnt']);
        cntInfo.info[map['choice']] = cnt;
        cntInfo.total += cnt;
      });
      return cntInfo;
    });

    // 퍼센트 계산
    const selectionRate = [];
    for (let i = 1; i <= maxIdx; i++) {
      let cnt = counted.info[i] ? counted.info[i] : 0;
      selectionRate.push((cnt / counted.total) * 100);
    }

    return selectionRate;
  }

  async getUserChoices(recordId: number) {
    return await this.statusRepo.getSelectionRateByRecord(recordId).then((result) => {
      // 문제 기록이 없을 때
      if (!result) {
        errorGenerator({ statusCode: 500 });
      }
      return result.map((el) => {
        // 선택 비율
        const selectionRate = el.sRec.map((e) => {
          return e.rate;
        });
        return {
          problemId: el.problemId,
          choice: el.choice,
          selectionRate,
        };
      });
    });
  }
}
