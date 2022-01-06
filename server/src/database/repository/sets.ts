import { EntityRepository, Repository, Like } from 'typeorm';
import { sets } from '../entity/sets';
import { users } from '../entity/users';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {
  async findSetsByTitle(title: string) {}
}
