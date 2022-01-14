import { EntityRepository, Repository } from 'typeorm';
import { choices } from '../entity/choices';
import { convertRawObject } from '../../utils/custom';
import { problems } from '../entity/problems';

@EntityRepository(choices)
export class ChoicesRepository extends Repository<choices> {
  async getLastChoice(problemId: number) {
    return this.createQueryBuilder('choices')
      .select('MAX(choices.index)', 'max')
      .where(`problemId=${problemId}`)
      .getRawOne()
      .then((result) => {
        return convertRawObject(result)['max'];
      });
  }
}
