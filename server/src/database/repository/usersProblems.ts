import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { usersProblems } from '../entity/usersProblems';

@EntityRepository(usersProblems)
export class uProblemsRepository extends Repository<usersProblems> {
  async countByChoice(problemId: number) {
    return this.createQueryBuilder('usersProblems')
      .select('usersProblems.choice AS choice')
      .addSelect('COUNT(*) AS choiceCnt')
      .where({ problemId })
      .groupBy('usersProblems.choice')
      .getRawMany();
  }
}
