import { EntityRepository, Repository } from 'typeorm';
import { choices } from '../entity/choices';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(choices)
export class ChoicesRepository extends Repository<choices> {
  async getLastChoice() {
    return this.createQueryBuilder('choices')
      .select('MAX(choices.index)', 'max')
      .getRawOne()
      .then((result) => convertRawObject(result)['max']);
    // const query = this.createQueryBuilder('choices');
    // query.select('MAX(choices.index)', 'max');
    // return await query.getRawOne().then((result) => convertRawObject(result)['max']);
  }
}
