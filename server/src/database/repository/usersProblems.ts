import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { usersProblems } from '../entity/usersProblems';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(usersProblems)
export class uProblemsRepository extends Repository<usersProblems> {
  async countByChoice(problemId: number) {
    return await this.createQueryBuilder('usersProblems')
      .select('usersProblems.choice AS choice')
      .addSelect('COUNT(*) AS cnt')
      .where({ problemId })
      .groupBy('usersProblems.choice')
      .getRawMany()
      .then((reuslt) => {
        const cntInfo = { total: 0, select: [] };
        reuslt.forEach((el) => {
          const obj = convertRawObject(el);
          cntInfo.select.push(obj);
          cntInfo.total += Number(obj['cnt']);
        });
        return cntInfo;
      });
  }
}
