import { EntityRepository, Repository } from 'typeorm';
import { collections } from '../entity/collections';
import { users } from '../entity/users';

@EntityRepository(collections)
export class CollectionsRepository extends Repository<collections> {
  async findMyCollection(title: string) {
    const dt = await this.createQueryBuilder('sets')
      .select([
        'sets.id as id',
        'sets.username as username',
        'sets.collectionId as collectionId',
        'sets.title as title',
        'sets.description as descriptoin',
        'sets.createdAt as createdAt',
      ])
      .addSelect('users.username as username')
      .leftJoin(users, 'users', 'sets.creatorId = users.id')
      .getRawMany();
    console.log(dt);
  }
}
