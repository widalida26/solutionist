import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';
import { convertRawObject } from '../../utils/custom';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {
  // setId로 세트 검색
  async getSet(id: number) {
    return await this.createQueryBuilder('sets')
      .innerJoinAndSelect('sets.collection', 'collections')
      .leftJoinAndSelect('collections.creator', 'users')
      .innerJoinAndSelect('sets.problem', 'problems')
      .innerJoinAndSelect('problems.choice', 'choices')
      .where(`sets.id = ${id}`)
      .getOne();
  }

  // title으로 세트 검색
  async searchByTitle(title: string) {
    return await this.createQueryBuilder('sets')
      .innerJoin(
        (qb) =>
          qb
            .select('MAX(children.id) as max')
            .from(sets, 'children')
            .groupBy('children.collectionId'),
        'cs'
      )
      .where('cs.max = sets.id')
      .andWhere('sets.title like :title', { title: `%${title}%` })
      .getRawMany()
      .then((result) => convertRawObject(result));
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
