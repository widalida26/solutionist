import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';
import { users } from '../entity/users';
import { convertRawObject } from '../../utils/custom';
import e from 'express';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {
  // title로 세트 검색
  async findSetsByTitle(title: string) {
    const dt = await this.createQueryBuilder('sets')
      .select([
        'sets.id',
        'sets.collectionId',
        'sets.title',
        'sets.description',
        'sets.createdAt',
      ])
      .addSelect('users.username')
      .leftJoin(users, 'users', 'sets.creatorId = users.id')
      .getRawMany();
    console.log(dt);
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
  }

  //삭제된 세트의 userId 반환
  async getRemovedUser(id: number) {
    return await this.findOne(id).then(async (set) => {
      await this.delete(id);
      if (!set) {
        return null;
      } else {
        return set.creatorId;
      }
    });
  }
}
