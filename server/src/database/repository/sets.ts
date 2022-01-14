import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';
import { users } from '../entity/users';
import { convertRawObject } from '../../utils/custom';
import { solveRecords } from '../entity/solveRecords';
import { count } from 'console';

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
  // await this.createQueryBuilder('sets');
  // collection 아이디로 groupby한 다음 가장 최신의 set를 가져와야 함
  // return await this.createQueryBuilder('sets')
  //   .leftJoin('sets.creator', 'users')
  //   .select([
  //     'sets.id',

  //     'users.username',
  //   ])
  //   .where('sets.title like :title', { title: '%' + title + '%' })
  //   .getMany()
  //   .then((result) => {
  //     console.log('result', result);
  //     return result.map((el) => {
  //       //console.log(el);
  //       //el['username'] = el.creator ? el.creator.username : null;
  //       //delete el.creator;
  //       //return el;
  //     });
  //   });

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
      .groupBy(`solveRecords.setId`)
      .getRawMany();
    return dt;
  }
}
