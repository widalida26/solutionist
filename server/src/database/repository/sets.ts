import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {
  async findSetsByTitle(title: string) {
    const manager = getManager();
    return await manager
      .query(
        `SELECT s.id, s.title, s.description, s.createdAt, u.username FROM sets AS s LEFT OUTER JOIN users AS u ON s.userId=u.id WHERE s.title LIKE '%${title}%';`
      )
      .then((sets: Object[]) => {
        return sets.map((set: Object) => {
          return convertRawObject(set);
        });
      });
  }
}
