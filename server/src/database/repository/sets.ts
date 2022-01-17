import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';
import { convertRawObject } from '../../utils/custom';
import { collections } from '../entity/collections';
import { users } from '../entity/users';
import { solveRecords } from '../entity/solveRecords';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {
  // set id로 세트 검색
  async getSet(id: number) {
    return await this.createQueryBuilder('sets')
      .innerJoinAndSelect('sets.collection', 'collections')
      .leftJoinAndSelect('collections.creator', 'users')
      .innerJoinAndSelect('sets.problem', 'problems')
      .innerJoinAndSelect('problems.choice', 'choices')
      .where(`sets.id = ${id}`)
      .getOne();
  }

  // collection id로 세트 검색
  async getSetByCollectionId(collectionId: number) {
    return await this.createQueryBuilder('sets')
      .select([
        'sets.id as id',
        'users.username as editor',
        'sets.createdAt as updatedAt',
        'COUNT(problems.id) as problemCount',
      ])
      .leftJoin('sets.editor', 'users')
      .leftJoin('sets.problem', 'problems')
      .where(`sets.collectionId = ${collectionId}`)
      .groupBy('sets.id')
      .getRawMany();
  }

  // title으로 세트 검색
  async searchByTitle(title: string) {
    return await this.createQueryBuilder('sets')
      .select([
        'sets.id as id',
        'sets.collectionId as collectionId',
        'sets.title as title',
        'sets.description as description',
        'collections.createdAt as createdAt',
        'sets.createdAt as updatedAt',
        'users.username as creator',
      ])
      .innerJoin(
        (qb) =>
          qb
            .select('MAX(children.id) as max')
            .from(sets, 'children')
            .groupBy('children.collectionId'),
        'cs'
      )
      .leftJoin('sets.record', `solveRecords`)
      .innerJoin('sets.collection', 'collections')
      .leftJoin('collections.creator', 'users')
      .addSelect(
        `count(case when solveRecords.answerRate > -1 then 1 end) as solvedUserNumber`
      )
      .addSelect(
        `avg(case when solveRecords.answerRate > -1 then solveRecords.answerRate end) as  averageScore`
      )
      .groupBy(`sets.id`)
      .where('cs.max = sets.id')
      .andWhere('sets.title like :title', { title: `%${title}%` })
      .orderBy('sets.createdAt', 'DESC')
      .getRawMany()
      .then((result) => convertRawObject(result));
  }

  // collection의 생성 일자 검색
  async getCollectionCreatedAt(collectionId: number) {
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

  // 내가 만든 문제
  async findMyCollection(userId: number) {
    const dt = await this.createQueryBuilder('sets')
      .select([
        'sets.id as id',
        'users.username as username',
        'sets.title as title',
        'sets.description as descriptoin',
        'sets.createdAt as createdAt',
      ])
      .addSelect(
        `count(case when solveRecords.answerRate > -1 then 1 end) as solvedUserNumber`
      )
      .addSelect(
        `avg(case when solveRecords.answerRate > -1 then solveRecords.answerRate end) as  averageScore`
      )
      .innerJoin(users, 'users', 'sets.editorId = users.id')
      .innerJoin(solveRecords, 'solveRecords', `sets.id = solveRecords.setId`)
      .innerJoin(collections, 'collections', `sets.collectionId = collections.id`)
      .where(`collections.creatorId = :creatorId`, { creatorId: userId })
      .andWhere('sets.editorId = :editorId', { editorId: userId })
      .groupBy(`solveRecords.setId`)
      .getRawMany();
    return dt;
  }

  //내가 푼 문제
  async findSolveSet(userId: number) {
    const dt = await this.createQueryBuilder('sets')
      .select([
        'solveRecords.setId as id',
        'solveRecords.id as recordId',
        'users.username as username',
        'sets.title as title',
        'sets.description as descriptoin',
        'sets.createdAt as createdAt',
      ])
      .addSelect(
        `count(case when solveRecords.answerRate > -1 then 1 end) as solvedUserNumber`
      )
      .addSelect(
        `avg(case when solveRecords.answerRate > -1 then solveRecords.answerRate end) as  averageScore`
      )

      .innerJoin(solveRecords, 'solveRecords', `sets.id = solveRecords.setId`)
      .innerJoin(users, 'users', 'solveRecords.userId = users.id')
      .where('solveRecords.userId = :userId', { userId: userId })
      .groupBy(`solveRecords.setId`)
      .getRawMany();
    return dt;
  }
}
