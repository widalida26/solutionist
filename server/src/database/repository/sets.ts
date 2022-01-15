import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';
import { users } from '../entity/users';
import { convertRawObject } from '../../utils/custom';
import { solveRecords } from '../entity/solveRecords';
import { count } from 'console';
import { collections } from '../entity/collections';

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
  //삭제된 세트의 userId 반환
  // async getRemovedUser(id: number) {
  //   return await this.findOne(id).then(async (set) => {
  //     await this.delete(id);
  //     if (!set) {
  //       return null;
  //     } else {
  //       return set.creatorId;
  //     }
  //   });
  // }
  //내가 만든 문제
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

// .innerJoin('sets.editor','users')
// .innerJoin('sets.')
// .innerJoin(users, 'users', 'sets.editorId = users.id')
// .innerJoin(solveRecords, 'solveRecords', `sets.id = solveRecords.setId`)
// .where(`users.id = :id`, { id: userId })
// .andWhere('solveRecords.userId = :userId', { userId: userId })
// .groupBy(`solveRecords.setId`)
// .getRawMany();
