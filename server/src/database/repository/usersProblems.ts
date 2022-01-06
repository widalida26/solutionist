import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { usersProblems } from '../entity/usersProblems';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(usersProblems)
export class uProblemsRepository extends Repository<usersProblems> {
  async countByChoice(problemId: number) {
    return this.createQueryBuilder('usersProblems')
      .select('usersProblems.choice AS choice')
      .addSelect('COUNT(*) AS choiceCnt')
      .where({ problemId })
      .groupBy('usersProblems.choice')
      .getRawMany()
      .then((result: Object[]) => {
        return result.map((el: Object) => convertRawObject(el));
      });
  }
}
