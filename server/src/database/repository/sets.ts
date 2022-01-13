import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';
import { users } from '../entity/users';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {
  // title으로 세트 검색
  async findSetsByTitle(title: string) {
    const dt = await this.createQueryBuilder('sets')
      .select([
        'sets.id as id',
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

  // setId로 세트 검색
  async findSet(id: number) {
    return await this.createQueryBuilder('sets')
      .innerJoinAndSelect('sets.collection', 'collections')
      .leftJoinAndSelect('collections.creator', 'users')
      .innerJoinAndSelect('sets.problem', 'problems')
      .innerJoinAndSelect('problems.choice', 'choices')
      .where(`sets.id = ${id}`)
      .getOne();
  }

  // collection의 생성 일자 검색
  async findCollectionCreatedAt(collectionId: number) {
    return await this.createQueryBuilder('sets')
      .select(['collections.createdAt as createdAt'])
      .innerJoin('sets.collection', 'collections')
      .where('sets.collectionId = :collectionId', { collectionId: collectionId })
      .getRawOne()
      .then((result) => {
        if (!result) return null;
        else return convertRawObject(result)['createdAt'];
      });
  }
}
