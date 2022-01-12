import { EntityRepository, Repository } from 'typeorm';
import { solveRecords } from '../entity/solveRecords';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(solveRecords)
export class SolveRecordsRepository extends Repository<solveRecords> {
  // 세트를 푼 사람들의 수 반환
  async getSolvedCount(setId: number) {
    return this.createQueryBuilder('records')
      .select('COUNT(*)', 'cnt')
      .where(`records.setId = ${setId}`)
      .andWhere('averageRate >: average')
      .getRawMany()
      .then((result) => convertRawObject(result)[0]['avg']);
  }

  // 세트 정답률 평균 반환
  async getAvgRate(id: number) {
    return this.createQueryBuilder('records')
      .select('AVG(records.answerRate)', 'avg')
      .where(`records.id = ${id}`)
      .getRawMany()
      .then((result) => convertRawObject(result)[0]['avg']);
  }
}
