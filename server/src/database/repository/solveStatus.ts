import { EntityRepository, Repository } from 'typeorm';
import { solveStatus } from '../entity/solveStatus';
import { ISelect } from '../../interface/ISets';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(solveStatus)
export class solveStatusRepository extends Repository<solveStatus> {
  // 보기 선택 카운트
  async countByChoice(problemId: number): Promise<ISelect> {
    return await this.createQueryBuilder('status')
      .select('status.choice AS choice')
      .addSelect('COUNT(*) AS cnt')
      .where({ problemId })
      .groupBy('status.choice')
      .getRawMany()
      .then((reuslt) => {
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
  }

  async checkDuplicate(recordId: number, problemId: number): Promise<boolean> {
    return await this.createQueryBuilder('status')
      .innerJoinAndSelect('status.record', 'records')
      .where(`records.id = ${recordId}`)
      .andWhere(`status.problemId = ${problemId}`)
      .getCount()
      .then((result) => result > 0);
  }
}
