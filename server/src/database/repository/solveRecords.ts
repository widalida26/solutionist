import { EntityRepository, Repository } from 'typeorm';
import { solveRecords } from '../entity/solveRecords';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(solveRecords)
export class SolvedSetsRepository extends Repository<solveRecords> {
  async getAvgRate(setId: number) {
    return this.createQueryBuilder('solved')
      .select('AVG(solved.answerRate)', 'avg')
      .where(`solved.setId = ${setId}`)
      .getRawMany()
      .then((result) => convertRawObject(result)[0]['avg']);
  }
}
