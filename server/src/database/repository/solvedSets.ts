import { EntityRepository, Repository } from 'typeorm';
import { solvedSets } from '../entity/solvedSets';

@EntityRepository(solvedSets)
export class SolvedSetsRepository extends Repository<solvedSets> {
  async getAvgRate(setId: number) {
    return this.createQueryBuilder('solved')
      .select('AVG(solved.answerRate)::numeric(10, 1)', 'avgRate')
      .where(`solved.setId = ${setId}`)
      .getOne();
  }
}
