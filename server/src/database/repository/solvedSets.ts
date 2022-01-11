import { EntityRepository, Repository } from 'typeorm';
import { solvedSets } from '../entity/solvedSets';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(solvedSets)
export class SolvedSetsRepository extends Repository<solvedSets> {
  async getAvgRate(setId: number) {
    return this.createQueryBuilder('solved')
      .select('AVG(solved.answerRate)', 'avg')
      .where(`solved.setId = ${setId}`)
      .getRawMany()
      .then((result) => convertRawObject(result)[0]['avg']);
  }
}
