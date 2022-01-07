import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { usersProblems } from '../entity/usersProblems';
import { ISelect } from 'src/interface/ISets';
import { convertRawObject, convertRawMap } from '../../utils/custom';

@EntityRepository(usersProblems)
export class uProblemsRepository extends Repository<usersProblems> {
  // 보기 선택 카운트
  async countByChoice(problemId: number): Promise<ISelect> {
    return await this.createQueryBuilder('usersProblems')
      .select('usersProblems.choice AS choice')
      .addSelect('COUNT(*) AS cnt')
      .where({ problemId })
      .groupBy('usersProblems.choice')
      .getRawMany()
      .then((reuslt) => {
        const cntInfo = { total: 0, info: new Map<number, number>() };
        reuslt.forEach((el, idx) => {
          let map = convertRawMap(el);
          // 문제 번호 : 숫자 형태의 Map으로 변환
          let cnt = Number(map['cnt']);
          cntInfo.info[map['choice']] = cnt;
          cntInfo.total += cnt;
        });
        return cntInfo;
      });
  }
}
