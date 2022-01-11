import { EntityRepository, Repository } from 'typeorm';
import { solveRecords } from '../entity/solveRecords';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(solveRecords)
export class SolvedRecordsRepository extends Repository<solveRecords> {
  // 세트를 푼 사람들의 수 반환
  async getSolvedCount(setId: number) {
    return this.createQueryBuilder('solved')
      .select('COUNT(*)', 'cnt')
      .where(`solved.setId = ${setId}`)
      .andWhere('averageRate >: average')
      .getRawMany()
      .then((result) => convertRawObject(result)[0]['avg']);
  }
  // 세트 정답률 평균 반환
  async getAvgRate(setId: number) {
    return this.createQueryBuilder('solved')
      .select('AVG(solved.answerRate)', 'avg')
      .where(`solved.setId = ${setId}`)
      .getRawMany()
      .then((result) => convertRawObject(result)[0]['avg']);
  }
}
