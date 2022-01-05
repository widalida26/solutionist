import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {
  async findSetsByTitle(title: string) {
    const manager = getManager();
    return await manager
      .query(
        `SELECT s.*, u.username FROM sets AS s LEFT OUTER JOIN users AS u ON s.userId=u.id WHERE s.title LIKE '%${title}%';`
      )
      .then((sets) => {
        return sets.map((set) => {
          return JSON.parse(JSON.stringify(set));
        });
      });
  }
}
