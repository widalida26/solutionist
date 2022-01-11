import { EntityRepository, Repository } from 'typeorm';
import { usersProblems } from '../entity/usersProblems';
import { ISelect } from '../../interface/ISets';
import { convertRawObject } from '../../utils/custom';

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
        console.log(reuslt);
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
}
